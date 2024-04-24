import { PrismaClient } from '@prisma/client';
import { memberTypeByIdLoader } from './loaders/memberTypeById.js';
import { postByIdLoader } from './loaders/postById.js';
import { profileByIdLoader } from './loaders/profileById.js';
import { profileByUserIdLoader } from './loaders/profileByUserId.js';
import { userByIdLoader } from './loaders/userById.js';
import { postsByAuthorIdLoader } from './loaders/postsByAuthorId.js';

export const createLoaders = (prisma: PrismaClient) => {
  return {
    memberTypeById: memberTypeByIdLoader(prisma),
    postsByAuthorId: postsByAuthorIdLoader(prisma),
    postById: postByIdLoader(prisma),
    profileById: profileByIdLoader(prisma),
    profileByUserId: profileByUserIdLoader(prisma),
    userById: userByIdLoader(prisma),
  };
};
