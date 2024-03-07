import { GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { Context } from '../context.js';
import { profileType } from '../types/profile.js';

export const profileQuery = {
  type: profileType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  async resolve(_root, { id }: { id: string }, ctx: Context) {
    return ctx.profileById.load(id);
  },
};
