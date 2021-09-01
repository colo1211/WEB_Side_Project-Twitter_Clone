import React, { useEffect, useState } from 'react'; 
import {dbService} from 'fbase.js'; 
import Nweets from 'components/Nweets.js'; 
import NweetFactory from 'components/NweetFactory'; 

const Home = ({userObj}) => {
    const [nwitters, setNwitters] = useState([]); // 기존에 db에 있던 값들을 저장하기 위한 state
    // const getNwitters = async() => {
    //     // DB에 올라온 내용들을 가져오기 위한 .get()
    //     // 하지만 dbNweets에는 FireStore SnapShot 이 찍히기 때문에 forEach로 콜백인자에 있는 .data()를 가져와야 함.
    //     const dbNweets = await dbService.collection('nwitter').get();
    //     dbNweets.forEach((document)=>{
    //         // console.log(document.data()); // text, createdAt, creatorId 
    //         const nweetObject = { 
    //             ...document.data(), // text, createdAt, creatorId 풀어서 객체로 저장 
    //             id: document.id
    //         }; 
    //         // console.log(nweetObject);  // date, message, id
    //         setNwitters((prev)=> [nweetObject, ...prev]); // 이전 데이터들과 현재 작성된 데이터를 합치는 작업
    //     });
    // }

    useEffect(()=>{
        // getNwitters();
        dbService.collection('nwitter').orderBy("createdAt","desc").onSnapshot((snapshot)=> {
            const temp = snapshot.docs.map((doc)=>{
                return ({
                    ...doc.data(),
                    id : doc.id
                });
            });
            setNwitters(temp);
        })
    }, []);

    

    return(
     <>
        <NweetFactory userObj={userObj}/>
        <div>
            {
                nwitters.map((value,index)=>{
                    return <Nweets nweetObj = {value} itsMe = {userObj.uid === value.creatorId}/> // itsMe 는 true 혹은 false 를 전달
                    // return <h5>{value.text}</h5>;
                })
            }
        </div>
     </>   
    )
};
export default Home;