import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const userByIdLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: ReadonlyArray<User['id']>) => {
    const users = await prisma.user.findMany({
      where: { id: { in: [...ids] } },
      include: {
        subscribedToUser: true,
        userSubscribedTo: true,
      },
    });

    return ids.map((id) => users.find((user) => id === user.id));
  });
};
