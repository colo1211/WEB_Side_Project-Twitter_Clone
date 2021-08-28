import { authService } from 'fbase';
import React from 'react'; 
import { useHistory } from 'react-router-dom';

export default ({isLogin ,setIsLogin}) => {

    let history = useHistory();
    const onLogOutClock =()=>{
        authService.signOut(); // 로그아웃을 하는 Firebase 함수 .signOut();
        // setIsLogin(false); 
        history.push('/'); 
    }
    return (
        <>
            <span>My Profile</span>
            <button onClick = {onLogOutClock}>Log Out</button> 
        </>
    )
}