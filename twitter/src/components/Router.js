import React from 'react'; 
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation.js';

const AppRouter = ({isLogin})=>{
    return (
        <Router>
            {/* 로그인이 되었을 때, Nav 바를 렌더링 해줌 */}
            {isLogin ?<Navigation/> : null}
            <Switch>
                {
                    isLogin === true 
                    ?
                    // 로그인이 되어 있다면 홈으로 이동, 여기는 많은 Route를 추가할 것이기 때문에 부모요소로써 fragment로 감싸주었음
                    <> 
                    <Route exact path='/'>  
                        <Home/>
                      </Route>
                    <Route exact path='/profile'>  
                        <Profile/>
                    </Route>
                    </>
                    // 로그인이 되어 있지 않다면 Auth 로 이동
                    : <Route exact path='/'>
                        <Auth/>
                      </Route>
                }
                <Redirect from='*' to='/'/>
            </Switch>
        </Router>
    )
}

export default AppRouter; 