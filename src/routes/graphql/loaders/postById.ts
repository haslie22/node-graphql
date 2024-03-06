import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const postByIdLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: ReadonlyArray<User['id']>) => {
    const posts = await prisma.post.findMany({
      where: { id: { in: [...ids] } },
    });
    const post = ids.map((id) => posts.find((post) => id === post.id));

    return post;
  });
};
