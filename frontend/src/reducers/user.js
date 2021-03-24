const initialState = {
  user: null,
}
const user = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case 'LOGIN':
      console.log(action.user);
      return {user: action.user}
    case 'LOGOUT':
      return {user: null}
    case 'UPDATE':
      let tmp = {...state.user};
      Object.keys(tmp).map(key=>{
        tmp[key]=tmp[key]===action.user[key] ? tmp[key] : action.user[key];
      });
      return {user:tmp};
    default :
      return state;
  }
}

export default user