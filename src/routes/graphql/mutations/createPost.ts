import { Post } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { Context } from '../context.js';
import { postType } from '../types/post.js';
import { postInputTypeExt } from '../types/postInput.js';

export const createPostMutation: GraphQLFieldConfig<
  unknown,
  Context,
  { dto: Omit<Post, 'id'> }
> = {
  type: postType,
  args: {
    dto: {
      type: new GraphQLNonNull(postInputTypeExt),
    },
  },
  resolve: async (_, { dto }, ctx: Context) => {
    return ctx.prisma.post.create({ data: dto });
  },
};
