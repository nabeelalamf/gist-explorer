import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Gist from './Gist';
import { TEXT, PYTHON, XML } from '../config/constants/FileTypes';

class Gists extends Component {
  state = {
    message: 'Loading gists',
    gists: {}
  };
  
  componentDidMount() {
    // Load gists
    let userId = this.props.match.params.user_id;
    let url = 'https://api.github.com/users/' + userId + '/gists?page=0&per_page=10';

    fetch(url).then((res) => {
      // Check status
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      }
      this.setState({ message: 'No gists found' });
      return Promise.reject();
    }).then((data) => {
      // Load gist data
      let gists = {};

      // Create list of gists
      if (data.length > 0) {
        data.forEach(gist => {
          let files = [];
          // Create list of files for each gist
          Object.values(gist.files).forEach(file => {
            let type = 'Unknown';

            // Parse file type
            switch(file.type) {
              case TEXT:
                type = "Text";
                break;
              case PYTHON:
                type = "Python";
                break;
              case XML:
                type = "XML";
                break;
            }

            files.push({
              filename: file.filename,
              url: file.raw_url,
              type: type
            });
          });

          gists[gist.id] = {
            ...gist,
            username: gist.owner.login,
            files: files,
          }
        });
      } else {
        this.setState({ message: 'No gists found' });
      }
      console.log(gists);
      this.setState({ gists: gists });
      return Promise.resolve();
    })
    .catch((res) => {
      console.log(res);
    });
  }
  
  // UI functions //

  getGistList = () => {
    return Object.keys(this.state.gists).length > 0 ? (
      Object.values(this.state.gists).map((gist) => {
        return (
          <Gist gist={ gist } />
        );
      })
    ) : ( <p>{ this.state.message }</p> );
  }

  render() {
    return (
      <Container >
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