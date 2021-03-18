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
import Footer from './components/common/Footer/Footer';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route  path="/login">
            <Login/>
          </Route>
          <Route path="/signup1">
            <SignUp1 />
          </Route>
          <Route path="/signup2">
            <SignUp2 />
          </Route>
          <Route path="/findpw1">
            <FindPW1 />
          </Route>
          <Route path="/findpw2">
            <FindPW2 />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
          <Route path="/mypick">
            <MyPick />
          </Route>
          <Route path="/list">
            <CosmeticList />
          </Route>
          <Route path="/detail/:id">
            <CosmeticDetail />
          </Route>
          <Route path="/skintype">
            <SkinType />
          </Route>
          <Route path="/personal_color">
            <PersonalColor />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
