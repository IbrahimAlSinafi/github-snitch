// Action Creators - methods that create and return actions for reducers to manipulate the redux store.
// Actions - the plain JavaScript object that Action Creators return. Must include a type parameter with a Redux constant and a certain data payload.
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

export const githubName = name => ({
  type: GITHUB_NAME,
  name,
});

export const githubCompany = company => ({
  type: GITHUB_COMPANY,
  company,
});

export const githubRepo = repo => ({
  type: GITHUB_REPO,
  repo,
});

export const githubSummary = collect => ({
  type: GITHUB_SUMMARY,
  collect,
});

export const githubContributor = contributor => ({
  type: GITHUB_CONTRIBUTOR,
  contributor,
});

export const githubUser = user => ({
  type: GITHUB_USER,
  user,
});

export const githubFork = fork => ({
  type: GITHUB_FORK,
  fork,
});

export const githubCommit = commit => ({
  type: GITHUB_COMMIT,
  commit,
});

export const githubSubscriber = subscriber => ({
  type: GITHUB_SUBSCRIBER,
  subscriber,
});

export const githubSelectedRepo = selectedRepo => ({
  type: GITHUB_SELECTED_REPO,
  selectedRepo,
});

export const githubPullRequest = pr => ({
  type: GITHUB_PULL_REQUEST,
  pr,
});
