import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from 'graphql';
import { UUIDType } from './uuid.js';
import { memberTypeIdType } from './memberTypeId.js';

const profileInputBasic = {
  isMale: {
    type: GraphQLBoolean,
  },
  yearOfBirth: {
    type: GraphQLInt,
  },
};

export const profileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: profileInputBasic,
});

export const profileInputTypeExt = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    ...profileInputBasic,
    memberTypeId: {
      type: memberTypeIdType,
    },
    userId: {
      type: UUIDType,
    },
  },
});
