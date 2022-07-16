import React, { useState, createContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


export const GlobalContext = createContext();

export default function GlobalState(props) {
  
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();

  const [userState, setUserState] = useState({
      userEmail: null,
      userLevel: 0,
      userDistance: 0,
      userGamesPlayed: 0,
    },
  );
      useEffect(()=>{
        if(user!==undefined)
          fetchExistingUserOrCreate();
      },[user])

  async function fetchExistingUserOrCreate() {
    try {
      const userData = await axios.post(
        "https://wander-earth.herokuapp.com/users/fetch-user",
        { email: user.email }
      );
      setUserState({
        userEmail: userData.data.email,
        userLevel: userData.data.stats.level,
        userDistance: userData.data.stats.distanceTravelled,
        userGamesPlayed: userData.data.stats.gamesPlayed,
      });
    } catch (err) {
      console.log(err);
    }
  }




  return (
    <GlobalContext.Provider value={{userState, setUserState}}>
      {props.children}
    </GlobalContext.Provider>
  );
}


