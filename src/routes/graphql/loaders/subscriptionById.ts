import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const subscriptionByIdLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: ReadonlyArray<User['id']>) => {
    const usersWithSubscriptions = await prisma.user.findMany({
      where: { id: { in: [...ids] } },
      include: { subscribedToUser: { select: { subscriber: true } } },
    });

    const groupedSubscriptions: Record<User['id'], User[]> =
      usersWithSubscriptions.reduce(
        (acc, user) => {
          const key = user.id;
          acc[key] = acc[key] ? [...acc[key], user] : [user];
          return acc;
        },
        {} as Record<User['id'], User[]>,
      );

    const subscription = ids.map((userId) => groupedSubscriptions[userId] || []);

    return subscription;
  });
};
