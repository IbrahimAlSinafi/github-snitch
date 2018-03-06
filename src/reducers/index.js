// Reducers - extract the Redux logic for the store into functions
// that handle actions and return pieces of the state.
import { combineReducers } from 'redux';

import {
  GITHUB_NAME,
  GITHUB_COMPANY,
  GITHUB_REPO,
  GITHUB_SUMMARY,
  GITHUB_CONTRIBUTOR,
  GITHUB_USER,
  GITHUB_FORK,
  GITHUB_COMMIT,
  GITHUB_SUBSCRIBER,
  GITHUB_SELECTED_REPO,
  GITHUB_PULL_REQUEST,
} from '../constants';

export const githubName = (state = '', { type, name }) => {
  switch (type) {
    case GITHUB_NAME:
      return name;
    default:
      return state;
  }
};

export const githubCompany = (state = '', { type, company }) => {
  switch (type) {
    case GITHUB_COMPANY:
      return company;
    default:
      return state;
  }
};

export const githubRepo = (state = '', { type, repo }) => {
  switch (type) {
    case GITHUB_REPO:
      return repo;
    default:
      return state;
  }
};

export const githubSummary = (state = '', { type, collect }) => {
  switch (type) {
    case GITHUB_SUMMARY:
      return collect;
    default:
      return state;
  }
};

export const githubContributor = (state = '', { type, contributor }) => {
  switch (type) {
    case GITHUB_CONTRIBUTOR:
      return contributor;
    default:
      return state;
  }
};

export const githubUser = (state = '', { type, user }) => {
  switch (type) {
    case GITHUB_USER:
      return user;
    default:
      return state;
  }
};

export const githubFork = (state = '', { type, fork }) => {
  switch (type) {
    case GITHUB_FORK:
      return fork;
    default:
      return state;
  }
};

export const githubCommit = (state = '', { type, commit }) => {
  switch (type) {
    case GITHUB_COMMIT:
      return commit;
    default:
      return state;
  }
};

export const githubSubscriber = (state = '', { type, subscriber }) => {
  switch (type) {
    case GITHUB_SUBSCRIBER:
      return subscriber;
    default:
      return state;
  }
};

export const githubSelectedRepo = (state = '', { type, selectedRepo }) => {
  switch (type) {
    case GITHUB_SELECTED_REPO:
      return selectedRepo;
    default:
      return state;
  }
};

export const githubPullRequest = (state = '', { type, pr }) => {
  switch (type) {
    case GITHUB_PULL_REQUEST:
      return pr;
    default:
      return state;
  }
};

export default combineReducers({
  githubName,
  githubCompany,
  githubRepo,
  githubSummary,
  githubContributor,
  githubUser,
  githubFork,
  githubCommit,
  githubSubscriber,
  githubSelectedRepo,
  githubPullRequest,
});
