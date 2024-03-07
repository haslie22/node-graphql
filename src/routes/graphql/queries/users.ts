import { GraphQLList, GraphQLNonNull } from 'graphql';
import { userType } from '../types/user.js';
import { Context } from '../context.js';

export const usersQuery = {
  type: new GraphQLNonNull(new GraphQLList(userType)),
  async resolve(_root, _args, ctx: Context) {
    const users = await ctx.prisma.user.findMany({
      include: {
        subscribedToUser: true,
        userSubscribedTo: true,
      },
    });

    users.forEach((user) => {
      ctx.userById.prime(user.id, user);
    });

    return users;
  },
};
