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
import useMediaQuery from 'hooks/useMediaQuery';


function App() {
  const [isMobile,MediaQueryWraper] = useMediaQuery('(max-width:40em)');
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <LoginForm/>
        </Route>
        <Route path={['/','/place/:id','/add']} exact>
          <div className={Styles.mainView}>
            <MediaQueryWraper match={!isMobile}>
              <Map>
                <UserInfo/>
              </Map>
              <Sidebar>
                <Searchbar/>
                <PlaceList/>
              </Sidebar>
            </MediaQueryWraper>

            <MediaQueryWraper match={isMobile}>
                <Searchbar/>
                <PlaceList/>
            </MediaQueryWraper>

          </div>
          
        </Route>
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
    