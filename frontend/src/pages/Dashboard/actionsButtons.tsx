/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { useAuth } from '../../hooks/auth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // backgroundColor: 'whitesmoke',
      width: '10%',
      marginLeft: 'auto',
      marginRight: '20px',
      position: 'relative',
      top: '-33px',
      '& > *': {
        margin: theme.spacing(2),
      },
    },
  }),
);

export default function IconButtons() {
  const classes = useStyles();
  const { signOut } = useAuth();

  return (
    <div className={classes.root}>
      <IconButton
        style={{ color: '#fff' }}
        aria-label="delete"
        title="Sair"
        onClick={async () => {
          await signOut();
        }}
      >
        <ExitIcon />
      </IconButton>
    </div>
  );
}
