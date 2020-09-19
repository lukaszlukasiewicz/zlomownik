import React from 'react';
import UserInfo from 'components/UserInfo/UserInfo'
import { Switch, Route} from "react-router-dom";
import PlaceList from 'components/PlaceList/PlaceList'
import Searchbar from 'components/Searchbar/Searchbar'
import LoginForm from "components/LoginForm/LoginForm"
import Page404 from "components/Page404/Page404"
import Map from "components/Map/Map";
import Sidebar from "components/Sidebar/Sidebar"
import Styles from './scss/app.module.scss'


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginForm/>
        </Route>
        <Route path={['/','/place/:id','/add']} exact>
          <div className={Styles.mainView}>
            <Map>
              <UserInfo/>
            </Map>
            <Sidebar>
              <Searchbar/>
              <PlaceList/>
            </Sidebar>
          </div>
          
        </Route>
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
    