import React from 'react';
import UserInfo from 'components/UserInfo/UserInfo'
import PlaceList from 'components/PlaceList/PlaceList'
import { Switch, Route} from "react-router-dom";
import LoginForm from "components/LoginForm/LoginForm"
import Page404 from "components/Page404/Page404"
import Map from "components/Map/Map";
import 'scss/app.scss'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginForm/>
        </Route>
        <Route path={['/','/place/:id','/add']} exact>
          <Map/>
          <h1>Złomownik</h1>
          <UserInfo/>
          <PlaceList/>
        </Route>
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
    