import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { createMuiTheme,makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, orange } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const loaderTheme = createMuiTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
  },
});

const Loader = ({open}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
    >
      <DialogContent>
        <div style={{display:'center', justifyContent:'center',alignItems:'center'}}>
          <div className={classes.root}>
            <CircularProgress color="secondary" theme={loaderTheme}/>
          </div>
          <div style={{padding: '0.5em'}}>결과를 불러오는 중입니다.</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Loader;