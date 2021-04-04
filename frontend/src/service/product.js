import httpDjango from '../http-django';

function getCorrectProducts(user_id, category_large,success,fail){
  httpDjango.get(`v1/items/correct/${user_id}/${category_large}`)
  .then(success)
  .catch(fail)
}

export {getCorrectProducts};