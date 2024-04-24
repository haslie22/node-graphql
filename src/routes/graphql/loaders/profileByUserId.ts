import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const profileByUserIdLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: ReadonlyArray<User['id']>) => {
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: [...ids] } },
    });

    return ids.map((id) => profiles.find((profile) => id === profile.userId));
  });
};
