import React from 'react'; 
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation.js';

const AppRouter = ({isLogin ,setIsLogin, userObj, refreshUser})=>{
    return (
        <Router>
            {/* 로그인이 되었을 때, Nav 바를 렌더링 해줌 */}
            {isLogin ?<Navigation userObj={userObj}/> : null}
            <Switch>
            
                {    
                    isLogin === true 
                    ?
                    // 로그인이 되어 있다면 홈으로 이동, 여기는 많은 Route를 추가할 것이기 때문에 부모요소로써 fragment로 감싸주었음
                    <div
                        style={{
                        maxWidth: 890,
                        width: "100%",
                        margin: "0 auto",
                        marginTop: 80,
                        display: "flex",
                        justifyContent: "center",
                        }}>
                        <Route exact path='/'>  
                            <Home userObj={userObj}/>
                        </Route>

                        <Route exact path='/profile'>  
                            <Profile refreshUser = {refreshUser} isLogin={isLogin} setIsLogin={setIsLogin} userObj={userObj}/>
                        </Route>
                    </div>
                    // 로그인이 되어 있지 않다면 Auth 로 이동
                    : 
                    <>
                        <Route exact path='/'>
                            <Auth/>
                        </Route>
                    </>
                }
            </Switch>
        </Router>
    )
}

export default AppRouter; 