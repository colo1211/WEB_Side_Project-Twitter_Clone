import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router.js';
import {authService} from 'fbase.js';

function App() {
  const [init, setInit] = useState(false); // 아직 초기화되지 않은 상태, firebase가 프로그램을 초기화하기를 기다려야함
  // 만약 init 이 false 라면 로딩중이라는 글씨를 띄울 것

  const [isLogin, setIsLogin] = useState(false); // 로그인이 되어 있는지 체크하는 state 
  // console.log(authService.currentUser);

  const [userObj, setUserObj] = useState(null); 
  // 글쓴이의 user id에 대해서 전달하기 위한 state, props 로 전달할 것임. 

  useEffect(()=>{
    
    setInit (true); 
    
    // 로그인/로그아웃 상태 변경 관찰자, onAuthStateChanged() 변경이 감지되면 
    authService.onAuthStateChanged((user)=> {
      if (user){ // 뭐라도 찍혀있다면, 
        setIsLogin(true); 
        setUserObj({
          uid : user.uid,
          displayName : user.displayName, 
          updateProfile : (args) => user.updateProfile(args) 
        }); // userObj에 onAuthStateChanged의 내부 콜백 인자로 들어가 있는 user를 복사하였음
      }else {
        setIsLogin(false); 
      }
    }); // user는 로그인 되어있다면 콘솔창에 찍혀있을 것이고 아니라면 콘솔창에 null 이 찍힐 것이다.  
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser; // 새로 업데이트 된 객체 
    setUserObj({
      uid : user.uid,
          displayName : user.displayName, 
          updateProfile : (args) => user.updateProfile(args) 
    });  // userObj 에 새로 업데이트 된 객체를 넣어준다. 
  }

  return (
    <>
      { init ?<AppRouter refreshUser = {refreshUser} isLogin={isLogin} setIsLogin={setIsLogin} userObj={userObj}/> : 'Loading...'}
    </>
  );
}

export default App;
