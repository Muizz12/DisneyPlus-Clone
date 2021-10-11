import './App.css';
import Login from './components/Login';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Detail from './components/Detail';
function App() {
  return (
    <div className="App">
     <Router>
     <Header/>
       <Switch>
         <Route exact path="/">
           <Login/>
         </Route>
         <Route exact path="/home">
           <Home/>
         </Route>
         <Route exact path="/detail/:id">
           <Detail/>
         </Route>
       </Switch>
     </Router>
    </div>
  );
}

export default App;

