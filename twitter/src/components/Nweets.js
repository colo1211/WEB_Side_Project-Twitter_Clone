import React, { useState } from 'react';
import { dbService } from 'fbase';

// itsMe 는 true/false 로 결과값을 받는 props
const Nweets = ({nweetObj, itsMe}) => {

    // Toggle 의 상태로 수정 Form 상태를 관리
    const [editToggle, setEditToggle] = useState(false);
    // newNweet 는 수정할 내용을 띄우고 수정된 내용을 저장하는 state 
    const [newNweet, setEditNewNweet] = useState(nweetObj.text);  

    // Delete
    const onDeleteClick = async() => { 
        const ok = window.confirm('삭제하시겠습니까?');
        console.log(ok); 
        if (ok === true) { // 삭제 
            // console.log(nweetObj.id); // 해당 게시물의 id를 준다.            
             const temp = await dbService.doc(`/nwitter/${nweetObj.id}`).delete(); // dbService.doc(파일 경로) -> 파일을 반환 
        }
    }

    const onChange = (event) => {
        setEditNewNweet(event.target.value);  
        console.log(newNweet); 
    }

    // Update
    const onSubmit = async(event) => {
        // console.log('수정 제출'); 
        event.preventDefault();
        await dbService.doc(`/nwitter/${nweetObj.id}`).update({text : newNweet});
        setEditToggle((prev)=>!prev); 
    }

    const changeToggle = () => {
        setEditToggle((prev)=>!prev); 
    } 

    return (
        <div>
        {editToggle //Toggle 이 true 라면 수정 Form 을 띄워주고 기존의 텍스트를 없애줌
        ?
            (
                <>
                    <form>
                        <input type='text' value={newNweet} onChange={onChange}/> 
                        <input type='submit' onClick={onSubmit} value='Edit Complete!'/>
                    </form>
                    <button onClick={changeToggle}>Cancel</button>
                </>
            )
        : // Toggle 이 false 라면 수정 Form이 아닌 기존의 텍스트를 보여줌
                <><h5>{ nweetObj.text }</h5></>
        }
        { itsMe && ( // itsMe가 True이고 editToggle이 false(수정X)면 삭제버튼과 수정버튼을 보여줌
            editToggle 
            ? null 
            :
                <>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button onClick={changeToggle}>Edit</button>
                </>
        )}
        </div> 
    )
}

export default Nweets; 