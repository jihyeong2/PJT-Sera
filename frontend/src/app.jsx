import styles from './app.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './router/Home/Home';
import Login from './router/Login/Login';
import SignUp1 from './router/SignUp/SignUp1';
import SignUp2 from './router/SignUp/SignUp2';
import FindPW1 from './router/FindPW/FindPW1';
import FindPW2 from './router/FindPW/FindPW2';
import MyPage from './router/MyPage/MyPage';
import MyPick from './router/MyPick/MyPick';
import CosmeticList from './router/CosmeticList/CosmeticList';
import CosmeticDetail from './router/CosmeticDetail/CosmeticDetail';
import SkinType from './router/SkinType/SkinType';
import PersonalColor from './router/PersonalColor/PersonalColor';
import SearchResult from './router/SearchResult/SearchResult'
function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup1" component={SignUp1}/>
          <Route path="/signup2" component={SignUp2}/>
          <Route path="/findpw1" component={FindPW1}/>
          <Route path="/findpw2" component={FindPW2}/>
          <Route path="/mypage" component={MyPage}/>
          <Route path="/mypick" component={MyPick}/>
          <Route path="/list" component={CosmeticList}/>
          <Route path="/detail/:id" component={CosmeticDetail}/>
          <Route path="/skintype" component={SkinType}/>
          <Route path="/personal_color" component={PersonalColor}/>
          <Route path="/search/:name" component={SearchResult}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
