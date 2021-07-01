import { AuthProvider } from "./contexts/firebase_context";
import Drop from "./pages/Drop";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <Route path="/login" component={Login}/>
          <PrivateRoute exact path="/" component={Drop}/>
        </AuthProvider>
      </Switch>
    </Router>
  );
}

export default App;
