import Login from './components/login-register/Login';
import Register from './components/login-register/Register';
import PageNotFound from './components/common/PageNotFound';
import Logout from './components/common/Logout';
import SiteLandingPage from './components/SiteLandingPage';
import Vocabulary from './components/private/options/vocabulary/Vocabulary';
import Programming from './components/private/options/programming/Programming';
import ProfilePage from  './components/private/profile/Profile';
import {Route, Switch} from 'react-router-dom';
import ComingSoon from './components/common/ComingSoon';
// import VocabularyOverview  from './components/overviews/VocabularyOverview';
// import { ProgrammingOverview } from './components/overviews/ProgrammingOverview';

const App = () => {
  return ( 
    <>
      <Switch>
        <Route exact path ="/" component={SiteLandingPage}/>
        <Route exact path ="/login" component={Login}/>
        <Route exact path ="/register" component={Register}/>
        <Route exact path ="/vocabulary" component={Vocabulary}/>
        <Route exact path ="/programming" component={ComingSoon}/>
        <Route exact path ="/programming" component={Programming}/>
        <Route exact path ="/logout" component={Logout}/>
        <Route exact path ="/myprofile" component={ProfilePage}/>
        <Route exact path ="/vocabularyOverview" component={ComingSoon}/>
        <Route exact path ="/programmingOverview" component={ComingSoon}/>
        <Route path="*" component={PageNotFound}/>
      </Switch>
    </>
  );
}

export default App;
