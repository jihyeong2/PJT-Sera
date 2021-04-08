import http from '../http-common';
import httpDjango from '../http-django';

function setColor(userLoginId,persolnalColor,success,fail){
  http.put(`v1/users/personalColor/${userLoginId}/${persolnalColor}`)
  .then(success)
  .catch(fail)
};
function colorTest(formData,success,fail){
  httpDjango.post(`v1/personal/`,formData)
  .then(success)
  .catch(fail)
};
export {setColor,colorTest};