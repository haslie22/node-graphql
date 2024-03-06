import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { Context } from '../context.js';
import { userType } from '../types/user.js';

export const userQuery = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  type: userType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  async resolve(_root, { id }: { id: string }, ctx: Context) {
    return ctx.prisma.user.findUnique({ where: { id } });
  },
};
