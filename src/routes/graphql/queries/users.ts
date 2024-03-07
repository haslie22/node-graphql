import { ResolveTree, parse, simplify } from 'graphql-parse-resolve-info';
import { GraphQLList, GraphQLNonNull, GraphQLResolveInfo } from 'graphql';
import { userType } from '../types/user.js';
import { Context } from '../context.js';

export const usersQuery = {
  type: new GraphQLNonNull(new GraphQLList(userType)),
  async resolve(_root, _args, ctx: Context, resolveInfo: GraphQLResolveInfo) {
    const parsedInfo = parse(resolveInfo);
    const { fields } = simplify(parsedInfo as ResolveTree, new GraphQLList(userType));

    const users = await ctx.prisma.user.findMany({
      include: {
        subscribedToUser: 'subscribedToUser' in fields,
        userSubscribedTo: 'userSubscribedTo' in fields,
      },
    });

    users.forEach((user) => {
      ctx.userById.prime(user.id, user);
    });

    return users;
  },
};
