import React from "react";
import { Route, Switch } from "react-router-dom";
import User from "./components/user";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
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
