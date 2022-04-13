import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import BookView from "./containers/BookView";
import HomeView from "./containers/HomeView";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomeView />
            </Route>
            <Route path="/books/:id">
              <BookView />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
