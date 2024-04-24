import { Profile } from '@prisma/client';
import { GraphQLBoolean, GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { Context } from '../context.js';

export const deleteProfileMutation: GraphQLFieldConfig<
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
      await ctx.prisma.profile.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  },
};
