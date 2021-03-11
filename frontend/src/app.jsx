import './app.css';
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
          <Route>
            <Home exact path="/"/>
          </Route>
          <Route>
            <Login path="/login"/>
          </Route>
          <Route>
            <SignUp path="/signup"/>
          </Route>
          <Route>
            <FindPW path="/findpw"/>
          </Route>
          <Route>
            <MyPage path="/mypage"/>
          </Route>
          <Route>
            <MyPick path="/mypick"/>
          </Route>
          <Route>
            <CosmeticList path="/list"/>
          </Route>
          <Route>
            <CosmeticDetail path="/detail/:id"/>
          </Route>
          <Route>
            <SkinType path="/skintype"/>
          </Route>
          <Route>
            <PersonalColor path="/personal_color"/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
