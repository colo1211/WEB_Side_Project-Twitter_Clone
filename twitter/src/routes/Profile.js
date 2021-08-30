import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react'; 
import { useHistory } from 'react-router-dom';

export default ({isLogin ,setIsLogin}) => {

    // // console.log(userObj.uid); 

    // let temp; 

    // const getMynweet = async() =>{
    //     temp = await dbService.collection('nwitter')
    //     .where("creatorId", "==", userObj.uid)
    //     .orderBy('createdAt','asc')
    //     .get();
    //     console.log(temp.docs); 
    //     // temp.docs.map((doc)=> console.log(doc.data())); 
    // }

    // useEffect(()=>{
    //     getMynweet(); 
        
    // },[]);
    
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