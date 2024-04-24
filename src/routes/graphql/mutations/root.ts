import { GraphQLObjectType } from 'graphql';
import { createProfileMutation } from './createProfile.js';
import { changeProfileMutation } from './changeProfile.js';
import { deleteProfileMutation } from './deleteProfile.js';
import { createUserMutation } from './createUser.js';
import { changeUserMutation } from './changeUser.js';
import { deleteUserMutation } from './deleteUser.js';
import { createPostMutation } from './createPost.js';
import { changePostMutation } from './changePost.js';
import { deletePostMutation } from './deletePost.js';
import { subscribeToMutation } from './subscribeTo.js';
import { unsubscribeMutation } from './unsubscribe.js';

export const rootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    createUser: createUserMutation,
    changeUser: changeUserMutation,
    deleteUser: deleteUserMutation,

    createProfile: createProfileMutation,
    changeProfile: changeProfileMutation,
    deleteProfile: deleteProfileMutation,

    createPost: createPostMutation,
    changePost: changePostMutation,
    deletePost: deletePostMutation,

    subscribeTo: subscribeToMutation,
    unsubscribeFrom: unsubscribeMutation,
  },
});
