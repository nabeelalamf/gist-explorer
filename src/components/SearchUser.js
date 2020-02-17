import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Grid, Button, Container } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class SearchUser extends Component {
  state = {
    user: ''
  };

  const 

  handleSearchInput = (e) => {
    console.log(e.target.value);
    this.setState({ user: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let user = this.state.user;
    console.log(user);
    if (user) {
      this.props.requestGists(user);
    }
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Container>
            <Typography variant="h6">
              Search gists
            </Typography>
            <br/>
            <form onSubmit={ this.handleSubmit }>
              <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}>
                <Grid item xs={12} sm={9}>
                  <TextField onChange={ this.handleSearchInput } style={{width: '100%'}}
                    label="Enter username" variant="outlined" />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SearchIcon />}
                    style={{width: '100%', height: '56px'}}>
                      Search
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </CardContent>
      </Card>
    );
  }
}

export default SearchUser