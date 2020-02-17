import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import SearchUser from './SearchUser';

class Home extends Component {
  requestGists = (user) => {
    console.log("Requesting: ", user);
    this.props.history.push('/gists/' + user);
  }

  render() {
    const styles = {
      root: {
        padding: '0 20%'
      }
    }

    return (
      <div className="home" style={styles.root}>
        <Container>
          <SearchUser requestGists={ this.requestGists } />
        </Container>
      </div>
    );
  }
}

export default Home;