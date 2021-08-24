import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router.js';
import {authService} from 'fbase.js';

function App() {
  const [init, setInit] = useState(false); // 아직 초기화되지 않은 상태, firebase가 프로그램을 초기화하기를 기다려야함
  // 만약 init 이 false 라면 로딩중이라는 글씨를 띄울 것

  const [isLogin, setIsLogin] = useState(false); // 로그인이 되어 있는지 체크하는 state 
  // console.log(authService.currentUser);

  useEffect(()=>{
    
    setInit (true); 
    
    // 로그인 상태 변경 관찰자, onAuthStateChanged() 변경이 감지되면 
    authService.onAuthStateChanged((user)=> {
      if (user){ // 뭐라도 찍혀있다면, 
        setIsLogin(true); 
      }else {
        setIsLogin(false); 
      }
    }); // user는 로그인 되어있다면 콘솔창에 찍혀있을 것이고 아니라면 콘솔창에 null 이 찍힐 것이다.  
    
  }, []);

  return (
    <>
      { init ?<AppRouter isLogin={isLogin}/> : 'Loading...'}
      <footer>&copy; {new Date().getFullYear()} Twitter </footer>
    </>
  );
}

export default App;
