import { prisma } from '../../../../packages/database/src/client';

export const findAccount = async (email: string) => {
  const account = await prisma.account.findUnique({
    where: {
      email,
    },
  });

  return account;
};
