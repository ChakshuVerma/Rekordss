import React, { useEffect, useState } from 'react';
import Dashboard from './dashboard/Dashboard';
import HomePage from './homepage/HomePage';
import Loader from './common/LoaderContainer';

const SiteLandingPage = () => {

  const [dataFetched, setDataFetched] = useState(false);
  const [rootUser, setRootUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    async function siteLandingPage() {
      try {
        const res = await fetch(`https://rekordss.onrender.com/home`, {
          method: "GET",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();
        console.log(data);

        if (data) {
          setDataFetched(true);
          console.log('1');
          if (res.status === 201) {
            console.log('2');
            setRootUser(data.user);
            setUserLoggedIn(true);
          }
          else if (res.status === 401) {
            setUserLoggedIn(false);
            // console.clear();
          }
        }
        else{
            console.log("Data not fetched");
          }
      }
      catch (error) {
        console.log('SiteLandingPage error: ' + error);
      }
    }
    siteLandingPage();
    // console.clear();
  }, [userLoggedIn, dataFetched]);

  return (
    <>
      {!dataFetched ? <Loader/> : userLoggedIn ? <Dashboard user={rootUser} /> : <HomePage />}
    </>
  );
}

export default SiteLandingPage;
