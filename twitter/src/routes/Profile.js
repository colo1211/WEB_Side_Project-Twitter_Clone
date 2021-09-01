import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react'; 
import { useHistory } from 'react-router-dom';

export default ({isLogin ,setIsLogin, userObj, refreshUser}) => {

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
    const [ newDisplayName, setNewDisplayName ] = useState(userObj.displayName); 
    
    const onLogOutClock =()=>{
        authService.signOut(); // 로그아웃을 하는 Firebase 함수 .signOut();
        // setIsLogin(false); 
        history.push('/'); 
    }

    const onChange = (e) => {
        setNewDisplayName(e.target.value);
    }

    const onSubmit = async (e) =>{ // update displayName
        
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) { // 기존의 displayName과 newDisplayName 과 다를때만
            await userObj.updateProfile({ // 인자 1. displaName 2. Photo URL
                displayName : newDisplayName
            }); 
            refreshUser(); 
            // console.log(userObj.displayName);
        }
    }

    return (
        <>       
            <form> 
                <input onChange={onChange} type='text' placeholder='Display Name' value={newDisplayName}/>
                <input onClick={onSubmit}type='submit' value='Change Profile Name'/>
            </form>
            <button onClick = {onLogOutClock}>Log Out</button> 
                  
        </>
    )
}