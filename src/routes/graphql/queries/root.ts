import { GraphQLObjectType } from 'graphql';
import { memberTypeQuery } from './memberType.js';
import { memberTypesQuery } from './memberTypes.js';
import { postQuery } from './post.js';
import { postsQuery } from './posts.js';
import { userQuery } from './user.js';
import { usersQuery } from './users.js';
import { profileQuery } from './profile.js';
import { profilesQuery } from './profiles.js';

export const rootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    memberType: memberTypeQuery,
    memberTypes: memberTypesQuery,

    post: postQuery,
    posts: postsQuery,

    user: userQuery,
    users: usersQuery,

    profile: profileQuery,
    profiles: profilesQuery,
  },
});
