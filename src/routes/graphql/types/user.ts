import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { profileType } from './profile.js';
import { Context } from '../context.js';
import { postType } from './post.js';

interface userSubsInfo {
  id: string;
  subscribedToUser: { subscriberId: string }[];
  userSubscribedTo: { authorId: string }[];
}

export const userType = new GraphQLObjectType<userSubsInfo, Context>({
  name: 'UserType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    name: {
      type: GraphQLString,
    },
    balance: {
      type: GraphQLFloat,
    },
    profile: {
      type: profileType,
      resolve: async ({ id }, _args, ctx) => {
        return ctx.profileByUserId.load(id);
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async ({ id }, _args, ctx) => {
        return ctx.postsByAuthorId.load(id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async ({ userSubscribedTo }, _args, ctx) => {
        return userSubscribedTo.map((sub) => ctx.userById.load(sub.authorId));
      },
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async ({ subscribedToUser }, _args, ctx) => {
        return subscribedToUser.map((sub) => ctx.userById.load(sub.subscriberId));
      },
    },
  }),
});
