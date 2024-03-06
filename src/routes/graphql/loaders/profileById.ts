import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const profileByIdLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: ReadonlyArray<User['id']>) => {
    const profiles = await prisma.profile.findMany({
      where: { id: { in: [...ids] } },
    });
    const profile = ids.map((id) => profiles.find((profile) => id === profile.id));

    return profile;
  });
};
