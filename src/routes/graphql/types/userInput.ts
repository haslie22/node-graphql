import { GraphQLFloat, GraphQLInputObjectType, GraphQLString } from 'graphql';

const userInputBase = {
  name: {
    type: GraphQLString,
  },
  balance: {
    type: GraphQLFloat,
  },
};

export const createUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: userInputBase,
});

export const changeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: userInputBase,
});

export const userInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: userInputBase,
});
