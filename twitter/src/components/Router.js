import React, { useState } from 'react'; 
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

const AppRouter = ()=>{
    const [isLogin, setIsLogin] = useState(true); // 로그인이 되어 있는지 체크하는 state 
    return (
        <Router>
            <Switch>
                {
                    isLogin === true 
                    ?
                    // 로그인이 되어 있다면 홈으로 이동, 여기는 많은 Route를 추가할 것이기 때문에 부모요소로써 fragment로 감싸주었음
                    <> 
                    <Route exact path='/'>  
                        <Home/>
                      </Route>
                    </>
                    // 로그인이 되어 있지 않다면 Auth 로 이동
                    : <Route exact path='/'>
                        <Auth/>
                      </Route>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter; 