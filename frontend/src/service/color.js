import http from '../http-common';

function setColor(userLoginId,persolnalColor,success,fail){
  http.put(`v1/users/personalColor/${userLoginId}/${persolnalColor}`)
  .then(success)
  .catch(fail)
};

export default setColor;