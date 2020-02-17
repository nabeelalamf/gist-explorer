import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Chip } from '@material-ui/core';

const File = ({ file }) => {
  return (
    <Grid container
      direction="row"
      spacing={1}>
      <Grid item>
        <Typography variant="body2">
          <a target="_blank" href={ file.url }>{ file.filename }</a>
        </Typography>
      </Grid>
      <Grid item>
        <Chip size="small" label={ file.type } />
      </Grid>
    </Grid>
  );
};

export default File;