import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const userByIdLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: ReadonlyArray<User['id']>) => {
    const users = await prisma.user.findMany({
      where: { id: { in: [...ids] } },
    });
    const user = ids.map((id) => users.find((user) => id === user.id));

    return user;
  });
};
