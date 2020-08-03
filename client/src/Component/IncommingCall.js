import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CallEndIcon from '@material-ui/icons/CallEnd';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import { Card } from '@material-ui/core';
import './style.css'

import  {useRecoilState} from 'recoil'
import {callReciveModal} from '../recoilState'
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function IncommingCALL({id,acceptFunction}) {
  
  const classes = useStyles();
  const [getCallReciveModal, setCallReciveModal] = useRecoilState(callReciveModal);

  const handleModal = () => {
    setCallReciveModal(!getCallReciveModal);
  };


  return (
    <div>
      <div style={{display:'none'}} onClick={()=>handleModal()}>
        <VideoCallIcon/>
      </div>
      <Dialog fullScreen open={getCallReciveModal} onClose={()=>handleModal()} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={()=>handleModal()} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <strong>Incomming Call From : </strong> {id}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
            <div className="col-md-3 offset-md-4 mt-5" >
                <Card  style={{marginTop:'100px'}}>    
                    <div className="anim">
                        <div className="call-animation">
                            <img className="img-circle" src="https://placeimg.com/400/400/people" alt="" width="135"/>
                        </div>
                    </div>
                    <ListItem >
                        <strong> Incomming Call  ... </strong> <div onClick={()=>{acceptFunction()}} style={{width:'40px',height:'40px',borderRadius:'50%',cursor:'pointer',backgroundColor:'green',textAlign:'center',marginLeft:'30px',position:'relative'}}> <CallEndIcon style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%, -50%)'}}/></div>
                    </ListItem>
                </Card>
            </div>
        </List>
      </Dialog>
    </div>
  );
}
