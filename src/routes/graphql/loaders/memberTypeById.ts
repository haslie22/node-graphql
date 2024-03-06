import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const memberTypeByIdLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: ReadonlyArray<string>) => {
    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: [...ids] } },
    });
    const memberType = ids.map((id) => memberTypes.find((type) => id === type.id));

    return memberType;
  });
};
