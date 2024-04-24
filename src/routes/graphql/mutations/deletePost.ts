import { Post } from '@prisma/client';
import { GraphQLBoolean, GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { Context } from '../context.js';
import { UUIDType } from '../types/uuid.js';

export const deletePostMutation: GraphQLFieldConfig<
  unknown,
  Context,
  Pick<Post, 'id'>
> = {
  type: GraphQLBoolean,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  async resolve(_root, { id }, ctx: Context) {
    try {
      await ctx.prisma.post.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  },
};
