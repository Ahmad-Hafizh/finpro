import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../../../packages/database/src/client';
import ResponseHandler from '../utils/responseHandler';
import { hashPassword } from '../utils/hashPassword';
import { compareSync } from 'bcrypt';
import { transporter } from '../config/nodemailer';
import { sign } from 'jsonwebtoken';
import { findUser } from '../utils/findUser';
import { signUpSchema } from '../../../schemas/authSchema';
import { uploadImage } from '../utils/cloudinary';

export class AccountController {
  async signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, name } = signUpSchema.parse(req.body);

      const exist = await findUser(email);
      if (exist) {
        return ResponseHandler.error(res, 404, 'user is already exist');
      }

      const createUserFlow = await prisma.$transaction(async (tx: any) => {
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
  async getUserById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.body.id,
        },
        include: {
          accounts: true,
        },
      });

      if (!user) {
        return ResponseHandler.error(res, 404, 'User not found');
      }
      return ResponseHandler.success(res, 200, 'Sign in is success', user);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }

  async createProfileReferral(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { name, id } = req.body;
      const existProfile = await prisma.profile.findUnique({ where: { user_id: id } });

      if (existProfile) {
        return ResponseHandler.success(res, 200, 'profile is already exist');
      }

      await prisma.$transaction(async (tx: any) => {
        const referralCode: string = `${name?.slice(0, 4).toUpperCase() ?? 'USER'}${Math.round(Math.random() * 10000).toString()}`;
        const profile = await tx.profile.create({
          data: {
            user_id: id,
          },
        });

        await tx.referral.create({
          data: {
            profile_id: profile.profile_id,
            referral_code: referralCode,
          },
        });
      });
      return ResponseHandler.success(res, 200, 'create profile and referral success');
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

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, name, phone } = req.body;

      const exist = await findUser(email);
      if (!exist) {
        return ResponseHandler.error(res, 404, 'user not found');
      }

      await prisma.$transaction(async (tx: any) => {
        await tx.user.update({
          where: { id: exist.id },
          data: { name },
        });

        if (phone) {
          await tx.profile.update({
            where: { user_id: exist.id },
            data: { phone },
          });
        }
      });

      return ResponseHandler.success(res, 200, 'update success');
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }

  async updatePfp(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.body;
      const user = await findUser(email);

      if (!user?.email) {
        return ResponseHandler.error(res, 400, 'User not found');
      }
      if (!req.file?.path) {
        return ResponseHandler.error(res, 400, 'file not found');
      }

      const image: any = await uploadImage(req.file?.path, 'profile_image');

      await prisma.user.update({
        where: { email: user.email },
        data: {
          image: image.result.secure_url,
        },
      });

      return ResponseHandler.success(res, 200, 'Update profile picture success');
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }
}
