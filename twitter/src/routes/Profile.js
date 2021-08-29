import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react'; 
import { useHistory } from 'react-router-dom';

export default ({isLogin ,setIsLogin, userObj}) => {

    let myNweet = ''; 
    let history = useHistory();

    const onLogOutClock =()=>{
        authService.signOut(); // 로그아웃을 하는 Firebase 함수 .signOut();
        // setIsLogin(false); 
        history.push('/'); 
    }

    const getMynweet = async() =>{
         myNweet = await dbService.collection('nwitter')
        .where("creatorId","==",userObj.uid)
        .orderBy('createdAt','asc')
        .get();
        myNweet.docs.map((doc)=>{console.log(doc.data())}); // 데이터를 가져오는 방법
    }

    useEffect(()=>{
        getMynweet(); 
    },[]);

    return (
        <>       
            <span>My Profile</span>
            <button onClick = {onLogOutClock}>Log Out</button> 
        </>
    )
}