import { GraphQLList, GraphQLNonNull } from 'graphql';
import { profileType } from '../types/profile.js';
import { Context } from '../context.js';

export const profilesQuery = {
  type: new GraphQLNonNull(new GraphQLList(profileType)),
  async resolve(_root, _args, ctx: Context) {
    const profiles = await ctx.prisma.profile.findMany();
    profiles.forEach((profile) => {
      ctx.profileById.prime(profile.id, profile);
    });

    return profiles;
  },
};
