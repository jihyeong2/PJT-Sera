import httpDjango from '../http-django';

function getHelpfulProducts(user_id,success,fail){
  httpDjango.get(`v1/items/correct/helpful/${user_id}`)
  .then(success)
  .catch(fail)
}
function getCautionProducts(user_id,success,fail){
  httpDjango.get(`v1/items/correct/caution${user_id}`)
  .then(success)
  .catch(fail)
}

function setLike(user_id,item_id,success,fail){
  httpDjango.put(`v1/items/dibs/${user_id}/${item_id}`)
  .then(success)
  .catch(fail)
}
function setHate(user_id,item_id,success,fail){
  httpDjango.delete(`v1/items/dibs/${user_id}/${item_id}`)
  .then(success)
  .catch(fail)
}
function getLikeList(user_id,success,fail){
  httpDjango.get(`v1/items/dibs/${user_id}`)
  .then(success)
  .catch(fail)
}
export {getHelpfulProducts, getCautionProducts, setLike, setHate, getLikeList};