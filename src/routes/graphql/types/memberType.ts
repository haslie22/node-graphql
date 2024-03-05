import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { memberTypeIdType } from './memberTypeId.js';

export const memberTypeType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: {
      type: new GraphQLNonNull(memberTypeIdType),
    },
    discount: {
      type: GraphQLFloat,
    },
    postsLimitPerMonth: {
      type: GraphQLInt,
    },
  },
});
