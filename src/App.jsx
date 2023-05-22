import React from "react";
import { Route, Switch } from "react-router-dom";
import User from "./layouts/user";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/navBar";
import Users from "./components/users";

const App = () => {
    return (
        <div>
            <NavBar />

            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId">
                    <User />
                </Route>
                <Route path="/users" component={Users} />
            </Switch>
        </div>
    );
};
export default App;
