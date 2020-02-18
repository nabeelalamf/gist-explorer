import React, { Component } from 'react';
import _ from 'lodash';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Gist from './Gist';
import fileMap from '../constants/fileMap';
import { getUserGistsUrl } from '../config/api';

class Gists extends Component {
  state = {
    emptyMessage: 'Loading gists',
    gists: []
  };
  
  componentDidMount() {
    // Load gists
    this.fetchGistData();
  }

  fetchGistData() {
    let userId = _.get(this.props, 'match.params.user_id');
    let url = getUserGistsUrl(userId, 0, 10);
    
    fetch(url)
      .then(res => {
        // Check status
        if (res.status >= 200 && res.status < 300) {
          return res.json();
        }
        this.setState({ emptyMessage: 'Invalid username' });
        return Promise.reject();
      })
      .then(data => {
        if (data === undefined) {
          console.log('Returned data is undefined');
          return Promise.reject();
        }

        // Create a parsed list of gists
        let gists = _.map(data, gist => {
          // Create a new list of truncated file data for each gist
          let files = _.map(gist.files, file => {
            let type = _.get(fileMap, file.type, 'Unknown'); // Parsing file type
            return { filename: file.filename, url: file.raw_url, type}; // Returning updated file object
          });

          // Returning updated gist data
          return { ...gist, username: _.get(gist, 'owner.login', 'N/A'), forks: [], files };
        });
        console.log(gists);

        this.setState(gists.length > 0 ? { gists } : { emptyMessage: 'No gists found' });

        this.fetchForksData();

        return Promise.resolve();
      });
  }

  fetchForksData() {
    let gists = [...this.state.gists];
    _.forEach(gists, (gist, i) => {
      fetch(gist.forks_url).then(res => res.json())
        .then(data => {
          gists[i].forks = data;
          this.setState({ gists });
          return Promise.resolve();
        });
    });
  }
  
  // UI functions //

  getGistList = () => {
    return _.size(this.state.gists) > 0 ? (
      this.state.gists.map(gist => {
        return (
          <Gist gist={ gist } key={ gist.id } />
        );
      })
    ) : ( <p>{ this.state.emptyMessage }</p> );
  }

  render() {
    return (
      <Container>
        <Grid container
          direction='column'
          spacing={3}
          style={{margin: 'auto', width: '50%'}}>
          { this.getGistList() }
        </Grid>
      </Container>
    );
  }
}

export default Gists;