import { prisma } from '../../../../packages/database/src/client';

export const findUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};
