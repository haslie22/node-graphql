import { GraphQLNonNull } from 'graphql';
import { memberTypeType } from '../types/member.js';
import { memberTypeIdType } from '../types/memberTypeId.js';
import { Context } from '../context.js';

export const memberTypeQuery = {
  type: memberTypeType,
  args: {
    id: { type: new GraphQLNonNull(memberTypeIdType) },
  },
  async resolve(_root, { id }: { id: string }, ctx: Context) {
    return ctx.memberTypeById.load(id);
  },
};
