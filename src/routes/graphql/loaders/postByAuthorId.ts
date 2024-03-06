import { Post, PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const postByAuthorIdLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: ReadonlyArray<User['id']>) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: [...ids] } },
    });

    const groupedPosts: Record<User['id'], Post[]> = posts.reduce(
      (acc, post) => {
        const key = post.authorId;
        acc[key] = acc[key] ? [...acc[key], post] : [post];
        return acc;
      },
      {} as Record<User['id'], Post[]>,
    );

    const post = ids.map((id) => groupedPosts[id] || []);

    return post;
  });
};
