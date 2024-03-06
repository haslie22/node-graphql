import { Profile } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { profileType } from '../types/profile.js';
import { profileInputType } from '../types/profileInput.js';
import { Context } from '../context.js';
import { UUIDType } from '../types/uuid.js';

export const changeProfileMutation: GraphQLFieldConfig<
  unknown,
  Context,
  {
    id: Profile['id'];
    dto: Partial<Pick<Profile, 'memberTypeId' | 'isMale' | 'yearOfBirth'>>;
  }
> = {
  type: profileType,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    dto: {
      type: new GraphQLNonNull(profileInputType),
    },
  },
  async resolve(_root, { id, dto }, ctx: Context) {
    return ctx.prisma.profile.update({ where: { id }, data: dto });
  },
};
