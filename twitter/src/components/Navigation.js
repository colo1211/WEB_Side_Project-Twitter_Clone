import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import React from 'react'; 
import {Link} from 'react-router-dom'; 

const Navigation = ({userObj}) => {
    // console.log(userObj.displayName);  
    return(
    <div>
        <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <Link to="/" style={{ marginRight: 10 }}>
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
        </Link>
            {/* <li><Link to='/profile'> { userObj.displayName == null? '닉네임을 설정하세요' : userObj.displayName+'의 Profile'  }  </Link></li> */}
            
            <Link
                to="/profile"
                style={{
                marginLeft: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontSize: 12,
            }}
            >
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <span style={{ marginTop: 10 }}>
            {/* {userObj.displayName
              ? userObj.displayName
              : "Profile"} */}
              나의 Profile
          </span>
        </Link>
        </ul>
    </div>
    )
}

export default Navigation;