import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import store from "./store";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profiles/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";
import CreatePost from "./components/posts/CreatePost";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => store.dispatch(loadUser()), []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="alert-container">
          <Alert />
        </div>

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/create-profile" component={CreateProfile} />
          <Route exact path="/edit-profile" component={EditProfile} />
          <Route exact path="/add-experience" component={AddExperience} />
          <Route exact path="/add-education" component={AddEducation} />
          <Route exact path="/developers" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={Post} />
          <Route exact path ='/create-post' component={CreatePost}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
