import React, { useState } from 'react'; 
import { storageService, dbService } from 'fbase';
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({userObj }) => {
    const [nwitter, setNwitter]= useState(''); // 사용자의 입력값을 받는 state 
    const [attachment, setAttachment] = useState(''); // 사진 미리보기를 위한 URL을 담을 state
  
    const onSubmit = async (e) => {
        if (nwitter === "") {
            return;
          }
        // 일단 제출을 막는다. 
        e.preventDefault();

        let attachmentURL = ''; // 객체에 firestorage에 저장되어 있는 URL을 담기 위한 변수
        
        // 만약 미리 띄운 사진의 URL을 담는 state가 빈칸이 아니라면?
        if (attachment !== ''){
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`); // 파이어 스토리지에 올릴 ref 만들기(storageService.ref().child(`폴더명(userid)/파일명(uuid를 통한 랜덤 생성)`))
            // console.log(fileRef); 
            const response = await fileRef.putString(attachment, 'data_url'); // 파이어 스토리지에 putString을 통해 올리기 ( 이미지 URL , format 형식)
            // console.log(response); 
            attachmentURL = await response.ref.getDownloadURL();    
        }
        await dbService.collection('nwitter').add({
                text : nwitter, 
                createdAt : Date.now(),
                creatorId : userObj.uid,
                attachmentURL
        });
        // console.log(attachmentURL); 
        setNwitter(''); // 서버로 제출 이후에 바로 칸을 빈 것으로 만든다. 
        setAttachment('');
    };

    const onChange = (e) => {
        setNwitter(e.target.value);
    }; 

    const onFileChange = (e) =>{

        // Browser API : FileReader(); 
        const reader = new FileReader();
        // 목표 : Img 의 URL을 가져와서 setAttachment에 넣어주는 것
        // But, Text input 값은 e.target.value 로 가져올 수 있지만 , e.target.files 를 통한 img 파일은 Fake Path 를 반환해준다. 
        // 따라서, FileReader API를 활용하여 URL을 가져온다. 
        reader.readAsDataURL(e.target.files[0]);  // e.target.files는 파일을 여러개 선택을 대비하기 위한 API 사용 방법이므로 나는 하나만 할거니까 [0] 으로 선택 
        reader.onloadend = (finished) => { // reader는 생명주기함수처럼 다룬다. 파일 로드가 끝나면 Attachment state에 img 의 주소를 담으라는 뜻
            setAttachment(finished.target.result); // 이건 attachment에 URL을 담으라는 뜻, 만약 Img 미리보기를 취소하려면 attachment를 비워주면 된다. 
        }
    };


    const clearSetAttachment = () => {
        setAttachment('');
    }
    return (
        <>
            <form className="factoryForm">
                <div className="factoryInput__container">
                    <input
                    className="factoryInput__input"
                    value={nwitter}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                    />
                    <input type="submit" onClick={onSubmit} value="&rarr;" className="factoryInput__arrow" />
                </div>
                <label for="attach-file" className="factoryInput__label">
                    <span>Add photos</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <input id="attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{
                    opacity: 0,
                    }}/>
                {/* <input type='submit' onClick={onSubmit} value='Kwitt!' />   */}
                { attachment && 
                    (
                        <div className="factoryForm__attachment">
                        <img src={attachment} style={{ backgroundImage: attachment}}/>
                            <div className="factoryForm__clear" onClick={clearSetAttachment}>
                                <span>Remove</span>
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                        </div>
                    )
                } 
            </form>
        </>
    )
}

export default NweetFactory;