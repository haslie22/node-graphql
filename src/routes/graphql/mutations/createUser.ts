import { User } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { Context } from '../context.js';
import { userType } from '../types/user.js';
import { createUserInput } from '../types/userInput.js';

export const createUserMutation: GraphQLFieldConfig<
  unknown,
  Context,
  { dto: Omit<User, 'id'> }
> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  type: userType,
  args: {
    dto: {
      type: new GraphQLNonNull(createUserInput),
    },
  },
  resolve: async (_root, { dto }, ctx: Context) => {
    return ctx.prisma.user.create({ data: dto });
  },
};
