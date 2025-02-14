import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../../../packages/database/src/client';
import ResponseHandler from '../utils/responseHandler';
import { hashPassword } from '../utils/hashPassword';
import { compareSync } from 'bcrypt';
import { transporter } from '../config/nodemailer';
import { sign } from 'jsonwebtoken';
import { findUser } from '../utils/findUser';
import { signUpSchema, signInSchema } from '../../../schemas/authSchema';

export class AccountController {
  async signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, name } = signUpSchema.parse(req.body);

      const exist = await findUser(email);
      if (exist) {
        return ResponseHandler.error(res, 404, 'user is already exist');
      }

      const createUserFlow = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email: email.toLowerCase(),
            name,
          },
        });

        const referralCode: string = `${user.name?.slice(0, 4).toUpperCase() ?? 'USER'}${Math.round(Math.random() * 10000).toString()}`;

        const authToken = sign({ email: user.email }, process.env.TOKEN_KEY || 'secretkey', { expiresIn: '1h' });

        const profile = await tx.profile.create({
          data: {
            user_id: user.id,
          },
        });

        await tx.referral.create({
          data: {
            profile_id: profile.profile_id,
            referral_code: referralCode,
          },
        });

        return { user, authToken };
      });

      await transporter.sendMail({
        from: 'grocery',
        to: createUserFlow.user.email ?? '',
        subject: 'email verification and set password',
        html: `<div>
                <h1>Thank you ${createUserFlow.user.name}, for registrater your account</h1>
                <p>klik link below to verify your account</p>
                <a href='http://localhost:3000/verify?a_t=${createUserFlow.authToken}'>Verify Account</a>
                </div>`,
      });

      return ResponseHandler.success(res, 200, 'sign up success');
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }

  async verifyEmailsetPassword(req: Request, res: Response): Promise<any> {
    try {
      const user = res.locals.user;

      const newAccount = await prisma.user.update({
        where: { email: user.email },
        data: {
          emailVerified: new Date().toISOString(),
          password: await hashPassword(req.body.password),
        },
      });

      return ResponseHandler.success(res, 200, 'verify success', newAccount);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }
  async signIn(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // const validateData = signInSchema.parse(req.body);
      // const { email, password } = validateData;
      const { email, password } = req.body;
      const userExist = await findUser(email);

      if (!userExist) {
        return ResponseHandler.error(res, 404, 'user not found');
      }

      if (!userExist.password) {
        return ResponseHandler.error(res, 404, 'Password is not set');
      }

      const compare = compareSync(password, userExist.password);

      if (!compare) {
        return ResponseHandler.error(res, 404, 'Password is incorrect');
      }

      return ResponseHandler.success(res, 200, 'Sign in is success', userExist);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email } = req.body;
      const userExist = await findUser(email);

      if (!userExist) {
        return ResponseHandler.error(res, 404, 'Account not found');
      }

      const authToken = sign({ email: userExist.email }, process.env.TOKEN_KEY || 'secretkey', { expiresIn: '1h' });

      await transporter.sendMail({
        from: 'grocery',
        to: userExist.email ?? '',
        subject: 'forgot password',
        html: `<div>
        <h1>Hey ${userExist.name}, it seems you forgot your password</h1>
        <p>klik link below to recover your password</p>
        <a href='${process.env.FE_URL}/forgot-password/${authToken}'>Forgot password</a>
        </div>`,
      });

      return ResponseHandler.success(res, 200, 'recover your password email is sent');
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const user = res.locals.user;

      await prisma.user.update({
        where: { email: user.email },
        data: { password: await hashPassword(req.body.password) },
      });

      return ResponseHandler.success(res, 201, 'Reset password is success');
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }
}
