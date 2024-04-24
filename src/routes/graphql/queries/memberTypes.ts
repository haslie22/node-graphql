import { GraphQLList, GraphQLNonNull } from 'graphql';
import { memberTypeType } from '../types/member.js';
import { Context } from '../context.js';

export const memberTypesQuery = {
  type: new GraphQLNonNull(new GraphQLList(memberTypeType)),
  async resolve(_root, _args, ctx: Context) {
    const memberTypes = await ctx.prisma.memberType.findMany();
    memberTypes.forEach((memberType) =>
      ctx.memberTypeById.prime(memberType.id, memberType),
    );

    return memberTypes;
  },
};
