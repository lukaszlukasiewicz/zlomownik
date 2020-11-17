import React from "react";
import UserInfo from "components/UserInfo/UserInfo";
import { Switch, Route } from "react-router-dom";
import PlaceList from "components/PlaceList/PlaceList";
import Searchbar from "components/Searchbar/Searchbar";
import LoginForm from "components/LoginForm/LoginForm";
import Page404 from "components/Page404/Page404";
import Map from "components/Map/Map";
import Sidebar from "components/Sidebar/Sidebar";
import Styles from "./scss/app.module.scss";
import useMediaQuery from "hooks/useMediaQuery";

function App() {
  const [isMobile, MobileView, DesktopView] = useMediaQuery("(max-width:40em)");
  return (
    <div className="App">
      <Switch>
        <Route path={["/", "/place/:id", "/add", "/login"]} exact>
          <div
            className={`${Styles.mainView} ${
              isMobile ? Styles.mobileView : Styles.desktopView
            }`}
          >
            <MobileView>
              <Searchbar />
            </MobileView>
            <Map>
              <UserInfo
                style={{
                  position: "absolute",
                  right: ".7em",
                  top: ".5em",
                  zIndex: 2,
                }}
              />
            </Map>

            <DesktopView>
              <Sidebar>
                <Route path={["/"]} exact>
                  <Searchbar />
                  <PlaceList />
                </Route>
                <Route path={["/login"]} exact>
                  <LoginForm />
                </Route>
              </Sidebar>
            </DesktopView>

            <MobileView>
              <PlaceList />
            </MobileView>
          </div>
        </Route>
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default App;
