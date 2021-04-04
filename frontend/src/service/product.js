import httpDjango from '../http-django';

function getCorrectProducts(user_id, category_large,success,fail){
  httpDjango.get(`v1/items/correct/${user_id}/${category_large}`)
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
  httpDjango.delete(`v1/items/dibs/${user_id}`)
  .then(success)
  .catch(fail)
}
export {getCorrectProducts, setLike, setHate, getLikeList};