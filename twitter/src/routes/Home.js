import React, { useState } from 'react'; 
import {dbService} from 'fbase.js'; 

const Home = () => {

    let [nwitter, setNwitter]= useState(''); 
    const onSubmit = async (e) => {
        // 일단 제출을 막는다. 
        e.preventDefault();
    
    // 사용자가 뭐라도 입력했다면, 제출
    if(nwitter){ 
        try {    
            // 비관계형 데이터베이스, collection (폴더) - document (문서) 로 구성
            let result = await dbService.collection('nwitter').add({
                message : nwitter, 
                date : Date.now()
            });
            console.log('성공');
            setNwitter(''); // 서버로 제출 이후에 바로 칸을 빈 것으로 만든다. 
        }
        catch(error){
        console.log(error.message); 
      }
    }
    
    // 사용자가 아무것도 제출을 안해서 빈칸 제출을 막는 코드
    else{
        alert('Write Your feel today');
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
     </>   
    )
};
export default Home;