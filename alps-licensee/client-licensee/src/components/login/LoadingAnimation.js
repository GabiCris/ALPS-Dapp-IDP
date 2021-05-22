/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LoadingAnimation({details}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        {/* <Grid container>
            <Grid item> */}
            <LinearProgress />
            {details}
            {/* </Grid>

        </Grid> */}


    </div>
  );
}