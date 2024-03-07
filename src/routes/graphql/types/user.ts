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

export const userType = new GraphQLObjectType({
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
      resolve: async (
        {
          id,
        }: {
          id: string;
          subscribedToUser: { subscriberId: string }[];
          userSubscribedTo: { authorId: string }[];
        },
        _args,
        ctx: Context,
      ) => {
        return ctx.profileByUserId.load(id);
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: async (
        {
          id,
        }: {
          id: string;
          subscribedToUser: { subscriberId: string }[];
          userSubscribedTo: { authorId: string }[];
        },
        _args,
        ctx: Context,
      ) => {
        return ctx.postsByAuthorId.load(id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async (
        {
          userSubscribedTo,
        }: {
          id: string;
          subscribedToUser: { subscriberId: string }[];
          userSubscribedTo: { authorId: string }[];
        },
        _args,
        ctx: Context,
      ) => {
        return userSubscribedTo.map((sub) => ctx.userById.load(sub.authorId));
        //   return ctx.prisma.user.findMany({
        //     where: {
        //       subscribedToUser: { some: { subscriberId: id } },
        //     },
        //   });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async (
        {
          subscribedToUser,
        }: {
          id: string;
          subscribedToUser: { subscriberId: string }[];
          userSubscribedTo: { authorId: string }[];
        },
        _args,
        ctx: Context,
      ) => {
        return subscribedToUser.map((sub) => ctx.userById.load(sub.subscriberId));
        //   return ctx.prisma.user.findMany({
        //     where: {
        //       userSubscribedTo: { some: { authorId: id } },
        //     },
        //   });
      },
    },
  }),
});
