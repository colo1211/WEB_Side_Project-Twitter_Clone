import React, { useEffect, useState } from 'react'; 
import {dbService} from 'fbase.js'; 

const Home = ({userObj}) => {
    const [nwitter, setNwitter]= useState(''); // 사용자의 입력값을 받는 state 
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

    const onSubmit = async (e) => {
        // 일단 제출을 막는다. 
        e.preventDefault();
        // 사용자가 뭐라도 입력했다면, 제출
        if(nwitter){ 
            try {    
                // 비관계형 데이터베이스, collection (폴더) - document (문서) 로 구성
                await dbService.collection('nwitter').add({
                    text : nwitter, 
                    createdAt : Date.now(),
                    creatorId : userObj.uid
                });
                console.log('성공');
                setNwitter(''); // 서버로 제출 이후에 바로 칸을 빈 것으로 만든다. 
            }catch(error){
                console.log(error.message); 
            }
        }
    // 사용자가 아무것도 제출을 안해서 빈칸 제출을 막는 코드
        else{
            alert('빈 칸은 Twitt 할 수 없습니당');
        }
    };

    const onChange = (e) => {
        setNwitter(e.target.value);
    }; 

    return(
     <>
        <form>
            <input type='text' placeholder = 'How was your day?' onChange={onChange} value={nwitter} maxLength= {120}/>
            <input type='submit' onClick={onSubmit} value='Kwitt!' />  
        </form>

        <div>
            {
                nwitters.map((value,index)=>{
                    return <h5>{value.text}</h5>;
                })
            }
        </div>
     </>   
    )
};
export default Home;