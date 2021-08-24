import React, { useState } from 'react';
import AppRouter from 'components/Router.js';
import {authService} from 'fbase.js';

function App() {
  
  console.log(authService); 
  const [isLogin, setIsLogin] = useState(false); // 로그인이 되어 있는지 체크하는 state 
  
  return (
    <>
      <AppRouter isLogin={isLogin}/>
      <footer>&copy; {new Date().getFullYear()} Twitter </footer>
    </>
  );
}

export default App;
