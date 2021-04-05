import httpDjango from '../http-django';

function getSearchAll(user_id,keyword,success,fail){
  httpDjango.get(`v1/search/${user_id}/${keyword}`)
  .then(success)
  .catch(fail)
}
function getSearchCategory(user_id,category,keyword,success,fail){
  httpDjango.get(`v1/search/${user_id}/${category}/${keyword}`)
  .then(success)
  .catch(fail)
}

export {getSearchAll,getSearchCategory}