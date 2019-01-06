/**
 * App selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');
const selectRoute = (state) => state.get('route');
const selectAuth = (state) => state.get('auth');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);
const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);
const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);
const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);
const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);
const makeSelectStatusLogout = () => createSelector(
  selectAuth,
  (auth) => auth.get('revoke')
);
export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectStatusLogout,
};
