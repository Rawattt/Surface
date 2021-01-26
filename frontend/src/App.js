import './App.css';
import Login from './component/publicComponent/Login';
import Signup from './component/publicComponent/Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StateProvider } from './component/StateProvider';
import AllPosts from './component/publicComponent/AllPosts';
import Private from './utils/Private';
import Dashboard from './component/privateComponent/Dashboard';
import Public from './utils/Public';
import Error from './utils/Error';
import Spinner from './utils/Spinner';
import MainNav from './component/MainNav';
import Profile from './component/privateComponent/Profile';
import FullPost from './component/privateComponent/FullPost';
import NotFound from './component/publicComponent/NotFound';
import Home from './component/privateComponent/Home';

function App() {
    return (
        <div className='container'>
            <Router>
                <StateProvider>
                    <Error />
                    <Spinner />
                    <MainNav />
                    <Switch>
                        <Public path='/login' component={Login} exact={true} />
                        <Public
                            path='/signup'
                            component={Signup}
                            exact={true}
                        />
                        <Public path='/' component={AllPosts} exact={true} />
                        <Public
                            path='/:page'
                            component={AllPosts}
                            exact={true}
                        />

                        <Private
                            path='/dashboard/:page'
                            component={Dashboard}
                            exact={true}
                        />
                        <Private
                            path='/profile/:id'
                            component={Profile}
                            exact={true}
                        />
                        <Private
                            path='/post/:postId'
                            component={FullPost}
                            exact={true}
                        />
                        <Route path='/*' component={NotFound} />
                    </Switch>
                </StateProvider>
            </Router>
        </div>
    );
}

export default App;
