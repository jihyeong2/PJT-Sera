import {combineReducers} from 'redux';
import user from './user';
import skin from './skin';
import color from './color';

export default combineReducers({
  user,skin,color
})