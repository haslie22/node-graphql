// import { PrismaClient, User } from '@prisma/client';
// import DataLoader from 'dataloader';

// export const subscribedToByIDLoader = (prisma: PrismaClient) => {
//   return new DataLoader(async (ids: ReadonlyArray<User['id']>) => {
//     const usersWithSubscriptions = await prisma.user.findMany({
//       where: { id: { in: [...ids] } },
//       include: { subscribedToUser: { select: { subscriber: true } } },
//     });

//     const groupedSubscriptions = usersWithSubscriptions.reduce(
//       (acc, user) => {
//         const key = user.id;
//         acc[key] = acc[key] ? [...acc[key], user] : [user];
//         return acc;
//       },
//       {} as Record<User['id'], User[]>,
//     );

//     const subscriptions = ids.map((userId) => {
//       const subscriptionsForUser = groupedSubscriptions[userId];
//       const targetSUbscriptions =
//         subscriptionsForUser.flatMap((record) =>
//           record.subscribedToUser.map((sub) => sub.subscriber),
//         ) || [];
//     });

//     return subscriptions;
//   });
// };
