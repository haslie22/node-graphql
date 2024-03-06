import { Profile } from '@prisma/client';
import { GraphQLBoolean, GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { Context } from '../context.js';
import { UUIDType } from '../types/uuid.js';

export const deleteUserMutation: GraphQLFieldConfig<
  unknown,
  Context,
  { id: Profile['id'] }
> = {
  type: GraphQLBoolean,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
  async resolve(_root, { id }, ctx: Context) {
    try {
      await ctx.prisma.user.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  },
};
