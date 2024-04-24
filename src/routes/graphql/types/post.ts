import { Post } from '@prisma/client';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { userType } from './user.js';
import { Context } from '../context.js';

export const postType = new GraphQLObjectType<Post, Context>({
  name: 'PostType',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    title: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    author: {
      type: new GraphQLNonNull(userType),
    },
  },
});
