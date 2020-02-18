import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DescriptionIcon from '@material-ui/icons/Description';
import CommentIcon from '@material-ui/icons/Comment';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import File from './File';

const Gist = ({ gist }) => {
  const styles = {
    iconLabel: {
      verticalAlign: 'middle',
      display: 'inline-flex'
    }
  }

  return (
    <Grid item>
      <Card>
        <CardContent>
          <Grid container
            direction="row"
            spacing={2}>
            <Grid item >
              <Typography variant="subtitle1" style={styles.iconLabel}>
                <DescriptionIcon />
                &nbsp;Files: { gist.files.length }
              </Typography>
            </Grid>
            <Grid item >
              <Typography variant="subtitle1" style={styles.iconLabel}>
                <CallSplitIcon />
                &nbsp;Forks: { gist.forks.length }
              </Typography>
            </Grid>
            <Grid item >
              <Typography variant="subtitle1" style={styles.iconLabel}>
                <CommentIcon />
                &nbsp;Comments: { gist.comments }
              </Typography>
            </Grid>
          </Grid>

          <ul>
            { gist.files.map(file => {
              return (
                <li key={ file.url }><File file={ file } /></li>
              )
            }) }
          </ul>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Gist;