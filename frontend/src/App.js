import './App.css';
import Login from './component/publicComponent/Login';
import Signup from './component/publicComponent/Signup';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { StateProvider } from './component/StateProvider';
import AllPosts from './component/publicComponent/AllPosts';
import Private from './utils/Private';
import Dashboard from './component/privateComponent/Dashboard';
import Public from './utils/Public';
import Error from './utils/Error';
import Spinner from './utils/Spinner';
import MainNav from './component/MainNav';

function App() {
    return (
        <Router>
            <StateProvider>
                <Error />
                <Spinner />
                <MainNav />
                <Switch>
                    <Public path='/login' component={Login} exact={true} />
                    <Public path='/signup' component={Signup} exact={true} />
                    <Public path='/' component={AllPosts} exact={true} />
                    <Private path='/dashboard' component={Dashboard} />
                    <Private path='/profile' component={Dashboard} />
                </Switch>
            </StateProvider>
        </Router>
    );
}

export default App;
