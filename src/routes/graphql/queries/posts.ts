import { GraphQLList, GraphQLNonNull } from 'graphql';
import { postType } from '../types/postType.js';
import { Context } from '../context.js';

export const postsQuery = {
  type: new GraphQLNonNull(new GraphQLList(postType)),
  async resolve(_root, _args, ctx: Context) {
    return ctx.prisma.post.findMany();
  },
};
