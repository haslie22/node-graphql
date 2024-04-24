import { GraphQLList, GraphQLNonNull } from 'graphql';
import { postType } from '../types/post.js';
import { Context } from '../context.js';

export const postsQuery = {
  type: new GraphQLNonNull(new GraphQLList(postType)),
  async resolve(_root, _args, ctx: Context) {
    const posts = await ctx.prisma.post.findMany();
    posts.forEach((post) => {
      ctx.postById.prime(post.id, post);
    });

    return posts;
  },
};
