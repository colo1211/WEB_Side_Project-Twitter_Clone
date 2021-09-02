import React, { useState } from 'react'; 
import { authService} from 'fbase';

const AuthForm = () => {
    const [email,setEmail] = useState(); 
    const [password,setPassword] = useState(); 
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState(); 

     // state 변경함수 : 콜백 인자로 현재 state의 상태에 대해서 가져 올 수 있다. 
     const toggleAccount = ()=> setNewAccount((prev)=>{ return !prev});

     const onChange = (e) =>{
         if (e.target.name === 'email'){
             setEmail(e.target.value); // name input이 변경될 때 마다, 그 value를 setEmail 변경함수를 통해서 변경하고 그 값을 input의 value 로 넣음
            //  console.log('email state',email); 
         } else{ // pw 일때
             setPassword(e.target.value); // 위와 동일한 Logic
            //  console.log('password state',password); 
         }
     }
 
     const onSubmit = async(e) =>{
         e.preventDefault(); 
         // 원래는 form 제출 버튼을 누르면 바로 제출되어 버림
         // Submit 버튼을 눌렀을 때, 제출 방지 JS에게 내가 컨트롤 할거야! 라고 명령 
         // 기본행위가 실행될 수 있는 것을 방지해줘라.
 
         // 일단 이거 시도해보고 
         try{
             let result; 
             // true 일때는 회원가입 
             if (newAccount === true) {
                 result = await authService.createUserWithEmailAndPassword(email, password); 
 
             }else{ // false 일때는 로그인
                 result = await authService.signInWithEmailAndPassword(email, password); 
             }
            //  console.log(result); 
         }
         
         // 아니면 catch 문장을 띄워라
         catch(error){
             setError(error.message);
         }
     }
 
    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input className="authInput" name='email' type='email' placeholder='Email' onChange = {onChange}  required />
                <input className="authInput" name='password' type='password' placeholder='Password' onChange = {onChange}  required />
                <input className="authInput authSubmit" type='submit' value =
                { newAccount // true 일때는 회원가입, false 일때는 로그인 버튼을 내보낸다. 
                ? "Create Account"  
                : "Sign In" }></input>
                {error && <span className="authError">{error}</span>}
            </form>
            <span className="authSwitch" onClick = {toggleAccount}> {newAccount ? 'Sign In' : 'Create new Account'} (으)로 전환</span>
        </>
    )
}

export default AuthForm; 