import http from '../http-common';

function setSkin((userId,skinType,success,fail)=>{
  http.post(`v1/users/skin/${userId}/${skinType}`)
  .then(success)
  .catch(fail)
});