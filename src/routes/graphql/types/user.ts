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
      resolve: async ({ id }: { id: string }, _args, ctx: Context) => {
        return ctx.prisma.profile.findUnique({ where: { userId: id } });
      },
    },
    posts: {
      type: new GraphQLList(profileType),
      resolve: async ({ id }: { id: string }, _args, ctx: Context) => {
        return ctx.prisma.post.findMany({ where: { authorId: id } });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async ({ id }: { id: string }, _args, ctx: Context) => {
        return ctx.prisma.user.findMany({
          where: {
            subscribedToUser: { some: { subscriberId: id } },
          },
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async ({ id }: { id: string }, _args, ctx: Context) => {
        return ctx.prisma.user.findMany({
          where: {
            userSubscribedTo: { some: { authorId: id } },
          },
        });
      },
    },
  }),
});
