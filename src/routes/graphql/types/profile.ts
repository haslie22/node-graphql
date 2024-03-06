import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { memberTypeType } from './member.js';
import { Context } from '../context.js';

export const profileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: GraphQLBoolean,
    },
    yearOfBirth: {
      type: GraphQLInt,
    },
    memberType: {
      type: memberTypeType,
      resolve: async (
        { memberTypeId }: { memberTypeId: string },
        _args,
        ctx: Context,
      ) => {
        return ctx.prisma.memberType.findUnique({ where: { id: memberTypeId } });
      },
    },
  },
});
