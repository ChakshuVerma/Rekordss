import React, {useEffect, useState} from 'react';
import './Profile.css';
import {useHistory} from 'react-router-dom'
import UserNotFound from './UserNotFound';
import UserProfile from './UserProfile';
import Loader from '../../common/LoaderContainer';


const Profile = () => {
    const [rootUser, setRootUser] = useState(null);
    const [userProgress, setUserProgress] = useState(null);
    const history = useHistory();
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        async function callProfile(){
            try {
                const res = await fetch(`/myprofile`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                       "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
    
                const data = await res.json();
                
                if(data){
                    setDataFetched(true);
                    if(res.status === 201){
                        setUserProgress(data.userProgress);
                        setRootUser(data.user);
                    }
                }
                else{ 
                    history.push('/login');
                }
            } catch (error) {
                console.log('Profile error: '+error);
                history.push('/login');
            }
        } 
        callProfile();
    }, [history])


    return(
        <>
            <section className="profile">
                {
                    !dataFetched?<Loader/>:rootUser ? <UserProfile user={rootUser} userProgress={userProgress} />:<UserNotFound/>
                }
            </section> 
        </>
    );
}

export default Profile;