import http from '../http-common';

function updateUser(user,success,fail) {
  http.put(`v1/users/${user.userLoginId}`,JSON.stringify(user))
  .then(success)
  .catch(fail)
};

function checkName(NickName,success,fail){
  http.get(`v1/users/duplicate/nickname/${NickName}`)
  .then(success)
  .catch(fail)
};

function deleteUser(userLoginId,success,fail){
  http.delete(`v1/users/${userLoginId}`)
  .then(success)
  .catch(fail)
};

function requestCertify(phone,success,fail) {
  http.post(`v1/auth?phoneNumber=${phone}`)
  .then(success)
  .catch(fail)
};

function getCertify(certificateNum,success,fail){
  http.get(`v1/auth/${certificateNum}`)
  .then(success)
  .catch(fail)
}


export {updateUser,checkName,deleteUser,requestCertify,getCertify};