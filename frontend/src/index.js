import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import './FontAwesome';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { login} from './actions';
const store = createStore(rootReducer);


// // 초기 상태를 기록합니다.
// console.log(store.getState());

// // 상태가 바뀔때마다 기록합니다.
// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );
let user = {
  userId : 0,
  userLoginId: 'unni2',
  userNickname: '다우니', 
  userPassword : '12345678',
  userAge : 26,
  userPhone : '010-1111-1111',
  userGender : '여',
  skinId: '',
  skinType: '',
}
// // 액션들을 보냅니다.
store.dispatch(login(user));
// store.dispatch(update({...user,phone:'010-2222-2222'}));
// store.dispatch(logout());

// 상태 변경을 더 이상 받아보지 않습니다.
// unsubscribe();
// console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
