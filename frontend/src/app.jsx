import './app.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './router/Home/Home';
import Login from './router/Login/Login';
import SignUp from './router/SignUp/SignUp';
import FindPW from './router/FindPW/FindPW';
import MyPage from './router/MyPage/MyPage';
import MyPick from './router/MyPick/MyPick';
import CosmeticList from './router/CosmeticList/CosmeticList';
import CosmeticDetail from './router/CosmeticDetail/CosmeticDetail';
import SkinType from './router/SkinType/SkinType';
import PersonalColor from './router/PersonalColor/PersonalColor';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route  path="/login">
            <Login/>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/findpw">
            <FindPW />
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
    </div>
  );
}

export default App;
