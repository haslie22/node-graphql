import { User } from '@prisma/client';
import { GraphQLBoolean, GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { Context } from '../context.js';
import { UUIDType } from '../types/uuid.js';

export const unsubscribeMutation: GraphQLFieldConfig<
  unknown,
  Context,
  { userId: User['id']; authorId: User['id'] }
> = {
  type: GraphQLBoolean,
  args: {
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  resolve: async (_root, { userId, authorId }, ctx: Context) => {
    try {
      await ctx.prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: userId,
            authorId: authorId,
          },
        },
      });
      return true;
    } catch {
      return false;
    }
  },
};
