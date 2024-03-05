import { GraphQLList, GraphQLNonNull } from 'graphql';
import { profileType } from '../types/profileType.js';
import { Context } from '../context.js';

export const profilesQuery = {
  type: new GraphQLNonNull(new GraphQLList(profileType)),
  async resolve(_root, _args, ctx: Context) {
    return ctx.prisma.profile.findMany();
  },
};
