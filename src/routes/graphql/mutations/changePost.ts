import { Post } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { Context } from '../context.js';
import { postType } from '../types/post.js';
import { UUIDType } from '../types/uuid.js';
import { postInputType } from '../types/postInput.js';

export const changePostMutation: GraphQLFieldConfig<
  unknown,
  Context,
  { id: Post['id']; dto: Partial<Pick<Post, 'title' | 'content' | 'authorId' | 'id'>> }
> = {
  type: postType,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    dto: {
      type: new GraphQLNonNull(postInputType),
    },
  },
  async resolve(_root, { id, dto }, ctx: Context) {
    return ctx.prisma.post.update({ where: { id }, data: dto });
  },
};
