import { GraphQLList, GraphQLNonNull } from 'graphql';
import { userType } from '../types/userType.js';
import { Context } from '../context.js';

export const usersQuery = {
  type: new GraphQLNonNull(new GraphQLList(userType)),
  async resolve(_root, _args, ctx: Context) {
    return ctx.prisma.user.findMany();
  },
};
