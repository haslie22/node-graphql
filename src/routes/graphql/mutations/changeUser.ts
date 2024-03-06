import { User } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { Context } from '../context.js';
import { userType } from '../types/user.js';
import { changeUserInput } from '../types/userInput.js';
import { UUIDType } from '../types/uuid.js';

export const changeUserMutation: GraphQLFieldConfig<
  unknown,
  Context,
  {
    id: User['id'];
    dto: Partial<Pick<User, 'name' | 'balance'>>;
  }
> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  type: userType,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    dto: {
      type: new GraphQLNonNull(changeUserInput),
    },
  },
  async resolve(_root, { id, dto }, ctx: Context) {
    return ctx.prisma.user.update({ where: { id }, data: dto });
  },
};
