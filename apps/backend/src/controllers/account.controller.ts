import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../../../packages/database/src/client';
import ResponseHandler from '../utils/responseHandler';
import { hashPassword } from '../utils/hashPassword';
import { compareSync } from 'bcrypt';
import { transporter } from '../config/nodemailer';
import { sign } from 'jsonwebtoken';
import { findAccount } from '../utils/findAccount';

export class AccountController {
  async signUp(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, name } = req.body;

      const isAccountExist = await findAccount(email);
      if (isAccountExist) {
        return ResponseHandler.error(res, 404, 'Account already exist');
      }

      const createAccountFlow = await prisma.$transaction(async (tx) => {
        const account = await tx.account.create({
          data: {
            email,
            name,
            password: await hashPassword(`${Math.round(Math.random() * 100000000)}`),
          },
        });

        return account;
      });

      const referralCode: string = `${createAccountFlow.name.slice(0, 4).toUpperCase()}${Math.round(Math.random() * 10000).toString()}`;
      const authToken = sign({ email: createAccountFlow.email }, process.env.TOKEN_KEY || 'secretkey', { expiresIn: '1h' });

      await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            account_id: createAccountFlow.account_id,
            phone: '122',
            pfp_url: 'url',
          },
        });

        await tx.referral.create({
          data: {
            user_id: user.user_id,
            referral_code: referralCode,
          },
        });
      });

      await transporter.sendMail({
        from: 'grocery',
        to: createAccountFlow.email,
        subject: 'email verification and set password',
        html: `<div>
                <h1>Thank you ${createAccountFlow.name}, for registrater your account</h1>
                <p>klik link below to verify your account</p>
                <a href='http://localhost:3000/verify?a_t=${authToken}'>Verify Account</a>
                </div>`,
      });
      console.log('selesai kirim mail');

      return ResponseHandler.success(res, 200, 'sign up berhasil');
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }
  async verifyEmailsetPassword(req: Request, res: Response): Promise<any> {
    try {
      const account = res.locals.account;

      const newAccount = await prisma.account.update({
        where: { email: account.email },
        data: {
          isVerified: true,
          password: req.body.password,
        },
      });

      return ResponseHandler.success(res, 200, 'verify success', newAccount);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }
  async signIn(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body;

      const account = await findAccount(email);

      if (!account) {
        return ResponseHandler.error(res, 404, 'Account not found');
      }

      const compare = compareSync(password, account.password);

      if (!compare) {
        return ResponseHandler.error(res, 404, 'Password is incorrect');
      }

      return ResponseHandler.success(res, 200, 'Sign in is success', account);
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email } = req.body;
      const isAccExist = await findAccount(email);

      if (!isAccExist) {
        return ResponseHandler.error(res, 404, 'Account not found');
      }

      const authToken = sign({ email: isAccExist.email }, process.env.TOKEN_KEY || 'secretkey', { expiresIn: '1h' });

      await transporter.sendMail({
        from: 'grocery',
        to: isAccExist.email,
        subject: 'forgot password',
        html: `<div>
        <h1>Hey ${isAccExist.name}, it seems you forgot your password</h1>
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
      const account = res.locals.account;

      await prisma.account.update({
        where: { email: account.email },
        data: { password: await hashPassword(req.body.password) },
      });

      return ResponseHandler.success(res, 201, 'Reset password is success');
    } catch (error) {
      return ResponseHandler.error(res, 500, 'Internal Server Error', error);
    }
  }
}
