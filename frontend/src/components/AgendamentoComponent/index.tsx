import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Agendamentos</Title>
      <Typography component="p" variant="h4">
        20
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        em maio de 2021
      </Typography>
    </React.Fragment>
  );
}