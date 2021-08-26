import React from 'react';

// itsMe 는 true/false 로 결과값을 받는 props
const Nweets = ({nweetObj, itsMe}) => {
    return (
        <>
        <h5>{ nweetObj.text }</h5>
        {itsMe && (
        <>
            <button>Delete</button>
            <button>Edit</button>
        </>
        )}

        </> 
    )
}

export default Nweets; 