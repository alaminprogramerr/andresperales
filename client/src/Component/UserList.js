import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FaceIcon from '@material-ui/icons/Face';
import CallModel from './CallModal';

import {useRecoilValue} from 'recoil'
import {allUser,myID} from '../recoilState'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function UserList({callFunction,stream,myVideo}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const getAllUser=useRecoilValue(allUser)
  const getMyID=useRecoilValue(myID)


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {Object.keys(getAllUser).map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <div>
              {
                value===getMyID?'':
              <Card>
                    <CardContent>
                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <FaceIcon/>
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`ID : ${value + 1}`} />
                            <ListItemSecondaryAction>
                            <IconButton onClick={()=>callFunction(value)} edge="end" aria-label="comments">
                                <CallModel />
                            </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </CardContent>
                </Card>}
          </div>
        );
      })}
    </List>
  );
}
