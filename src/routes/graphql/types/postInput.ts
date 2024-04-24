import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';

const profileInputBasic = {
  title: {
    type: GraphQLString,
  },
  content: {
    type: GraphQLString,
  },
};

export const postInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: profileInputBasic,
});

export const postInputTypeExt = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: {
    ...profileInputBasic,
    authorId: {
      type: new GraphQLNonNull(UUIDType),
    },
  },
});
