import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, gqlSchema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { createLoaders } from './createLoaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const { prisma } = fastify;

      const depthErrors = validate(gqlSchema, parse(query), [depthLimit(5)]);
      if (depthErrors.length) {
        return { data: null, errors: depthErrors };
      }

      return graphql({
        schema: gqlSchema,
        source: query,
        variableValues: variables,
        contextValue: { prisma, ...createLoaders(prisma) },
      });
    },
  });
};

export default plugin;
