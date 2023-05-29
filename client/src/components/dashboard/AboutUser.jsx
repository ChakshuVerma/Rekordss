import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import DefaultImage from '../../resources/default-user-image.jpeg';

const AboutUser = ({user}) => {

    const [userImg, setUserImg] = useState(null);

    useEffect(() => {
        if(!user.profilePic)
            setUserImg(DefaultImage);
        else
            setUserImg(user.profilePic);
    }, [user.profilePic]);

    let regDate = user.registeredOn;
    const year = regDate.substring(0, 4);
    const month = regDate.substring(5, 7);
    const day = regDate.substring(8, 10);
    regDate = `${day} - ${month} - ${year}`;

    return(
        <>
            <div className="user-img-container">
                <img src={userImg} alt="User-Pic" />
            </div>
            <ul>
                <li id="user-name"><Link to="/myprofile">{user.username}</Link></li>
                <li id="user-registration-date"><span>Registered: </span>{regDate}</li>
            </ul>
        </>
    );
}

export default AboutUser;