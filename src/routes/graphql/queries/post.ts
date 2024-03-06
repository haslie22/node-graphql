import { GraphQLNonNull } from 'graphql';
import { Context } from '../context.js';
import { postType } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';

export const postQuery = {
  type: postType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  async resolve(_root, { id }: { id: string }, ctx: Context) {
    return ctx.prisma.post.findUnique({ where: { id } });
  },
};
