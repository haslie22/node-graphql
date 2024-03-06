import { PrismaClient } from '@prisma/client';
import { createLoaders } from './createLoaders.js';

export type Context = { prisma: PrismaClient } & ReturnType<typeof createLoaders>;
