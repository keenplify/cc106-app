import { Route } from "react-router-dom";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./App.css";

import { BasicContainer } from "./components/containers/BasicContainer";

import AuthLogin from "./pages/Auth/Login";
import AuthRegister from "./pages/Auth/Register";
import Home from "./pages/Home";
import { Fabs } from "./components/Extras/Fabs";
import { useAuthStore } from "./stores/auth";
import Products from "./pages/Products";

setupIonicReact();

const App: React.FC = () => {
  const { authUser } = useAuthStore();

  return (
    <IonApp>
      <IonReactRouter>
        <BasicContainer>
          <Route path="/auth/login" exact component={AuthLogin} />
          <Route path="/auth/register" exact component={AuthRegister} />
          <Route path="/" exact component={Home} />
          <Route path="/products" exact component={Products} />
          {authUser && <Fabs />}
        </BasicContainer>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
