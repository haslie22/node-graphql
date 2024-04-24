import { User } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { Context } from '../context.js';
import { userType } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';

export const subscribeToMutation: GraphQLFieldConfig<
  unknown,
  Context,
  { userId: User['id']; authorId: User['id'] }
> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  type: userType,
  args: {
    userId: {
      type: new GraphQLNonNull(UUIDType),
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  resolve: async (_root, { userId, authorId }, ctx: Context) =>
    ctx.prisma.user.update({
      where: { id: userId },
      data: { userSubscribedTo: { create: { authorId } } },
    }),
};
