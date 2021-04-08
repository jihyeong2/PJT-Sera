import http from '../http-common';

function setSkin(userLoginId,skinType,success,fail){
  http.put(`v1/users/skin/${userLoginId}/${skinType}`)
  .then(success)
  .catch(fail)
};

export default setSkin;