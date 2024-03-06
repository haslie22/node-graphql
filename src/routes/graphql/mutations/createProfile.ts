import { Profile } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { profileType } from '../types/profile.js';
import { profileInputTypeExt } from '../types/profileInput.js';
import { Context } from '../context.js';

export const createProfileMutation: GraphQLFieldConfig<
  null,
  Context,
  { dto: Omit<Profile, 'id'> }
> = {
  type: profileType,
  args: {
    dto: {
      type: new GraphQLNonNull(profileInputTypeExt),
    },
  },
  async resolve(_root, { dto }, ctx: Context) {
    return ctx.prisma.profile.create({ data: dto });
  },
};
