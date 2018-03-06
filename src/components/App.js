import { connect } from 'react-redux';
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Alert from 'react-s-alert'; // Alert messages
import 'react-s-alert/dist/s-alert-default.css'; // CSS for Alert messages

import '../App.css';

import {
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
} from '../actions';
import MenuGenerator from './MenuGenerator';
import DropdownMenu from './DropdownMenu';
import inputValidation from './validation/inputValidation.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.initial = this.initial.bind(this);
    this.subscription = this.subscription.bind(this);
    this.contributor = this.contributor.bind(this);
    this.fork = this.fork.bind(this);
    this.commit = this.commit.bind(this);
    this.subscriber = this.subscriber.bind(this);
    this.pullRequest = this.pullRequest.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.inputSubmit = this.inputSubmit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  // get all doc id's per selected bucket
  async initial() {
    const { storeData } = this.props;
    const user = storeData.githubUser;
    const url = `https://api.github.com/users/${user}`;

    const res = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();

    // validate github user to preceed
    const isFound = inputValidation(json.message);
    if (isFound) {
      this.props.githubName(json.name);
      if (json.company != null) {
        this.props.githubCompany(json.company);
      } else {
        this.props.githubCompany('personal github');
      }
      await this.subscription();
    }
  }

  // collection regarding number of forks, stars, ...
  async subscription() {
    const { storeData } = this.props;
    const user = storeData.githubUser;
    const url = `https://api.github.com/users/${user}/subscriptions`;
    const res = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();

    const obj = {};
    const repos = json.map(ele => ele.full_name);
    this.props.githubRepo(repos);
    json.map((ele, index) => {
      obj[index] = {
        repo: ele.full_name,
        language: ele.language,
        fork: ele.forks_count,
        star: ele.stargazers_count,
      };
      return true;
    });
    this.props.githubSummary(obj);
  }

  // users that contribute and commit
  async contributor() {
    const { storeData } = this.props;
    const fullName = storeData.githubSelectedRepo;
    const url = `https://api.github.com/repos/${fullName}/contributors`;
    const res = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();

    const obj = {};
    json.map((ele, index) => {
      obj[index] = { contributor: ele.login, commits: ele.contributions };
      return true;
    });
    this.props.githubContributor(obj);
  }

  // list of users who fork the a specific project
  async fork() {
    const { storeData } = this.props;
    const fullName = storeData.githubSelectedRepo;
    const url = `https://api.github.com/repos/${fullName}/forks`;
    const res = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    const forks = json.map(ele => ele.owner.login);
    this.props.githubFork(forks);
  }

  // list of users who made commits
  async commit() {
    const { storeData } = this.props;
    const fullName = storeData.githubSelectedRepo;
    const url = `https://api.github.com/repos/${fullName}/commits`;
    const res = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    // blarffles
    const obj = {};
    json.map((ele, index) => {
      if (ele.author && ele.commit && ele.commit.committer) {
        obj[index] = {
          user: ele.author.login,
          sha: ele.sha,
          message: ele.commit.message,
          date: ele.commit.committer.date,
        };
      }
      return true;
    });

    this.props.githubCommit(obj);
  }

  // user who subscribes to a repo
  async subscriber() {
    const { storeData } = this.props;
    const fullName = storeData.githubSelectedRepo;
    const url = `https://api.github.com/repos/${fullName}/subscribers`;
    const res = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    const subscribers = json.map(ele => ele.login);
    this.props.githubSubscriber(subscribers);
  }

  async pullRequest() {
    const { storeData } = this.props;
    const fullName = storeData.githubSelectedRepo;
    const url = `https://api.github.com/repos/${fullName}/pulls?state=all`;
    const res = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();

    const obj = {};
    json.map((ele, index) => {
      if (ele.user) {
        obj[index] = {
          user: ele.user.login,
          state: ele.state,
          message: ele.title,
          created_at: ele.created_at,
          updated_at: ele.updated_at,
          closed_at: ele.closed_at,
          merged_at: ele.merged_at,
        };
      }
      return true;
    });

    this.props.githubPullRequest(obj);
  }

  // store whatever user types 'onChange event'
  async inputChange(event) {
    const inputValue = event.target.value.trim(); // truncate spaces
    await this.props.githubUser(inputValue);
  }

  // click sumbit
  async inputSubmit() {
    const { storeData } = this.props;
    if (storeData.githubUser) {
      // clear store incase if there is an exist data
      this.props.githubName('');
      this.props.githubCompany('');
      this.props.githubRepo('');
      this.props.githubSummary('');
      this.props.githubContributor('');
      this.props.githubFork('');
      this.props.githubCommit('');
      this.props.githubSubscriber('');
      this.props.githubSelectedRepo('');
      this.props.githubPullRequest('');

      // update data for new user input
      await this.initial();
    }
  }

  // repo dropmenu
  // need to be Promise.all
  async handleChecked(event) {
    await this.props.githubSelectedRepo(event.target.textContent);
    await this.contributor(); // users who contributor and commit to a repo
    await this.fork(); // users who fork a repo
    await this.subscriber(); // users who subscribe to a repo
    await this.commit(); // users who made commits
    await this.pullRequest(); // users who make pr
  }

  render() {
    const { storeData } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <h1> Github Snitch </h1>
          <MenuGenerator
            inputChange={this.inputChange}
            inputSubmit={this.inputSubmit}
          />
          <div>
            {/* display dropdown menu if there is user input */}
            {storeData.githubRepo ? (
              <DropdownMenu
                handleChecked={this.handleChecked}
                selectedRepo={storeData.githubSelectedRepo}
                githubRepo={storeData.githubRepo}
              />
            ) : null}
            <Alert />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

// allows reducers in the redux store to become accessible within React Components through this.props.
function mapStateToProps(state) {
  return {
    storeData: state,
  };
}

export default connect(mapStateToProps, {
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
})(App);
