import React, {useEffect} from 'react';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";

const Auth0ProviderWithHistory = ({ children }) => {

    
        const {user} = useAuth0();
    const history = createBrowserHistory({ window });

    const onRedirectCallback = (appState) => {
        
        history.push(appState?.returnTo || window.location.pathname);
    };
    return (
        <Auth0Provider
        domain={process.env.AUTH0_DOMAIN}
        clientId={process.env.AUTH0_CLIENTID}
        redirectUri="http://127.0.0.1:3000/home"
        onRedirectCallback={onRedirectCallback}
        >
          {children}  
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;