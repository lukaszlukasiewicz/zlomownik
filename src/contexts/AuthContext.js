import React, {useState} from 'react';

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {

  const [user,setUser] = useState({loggedIn: false});

  const login = () => {
    setUser({
      loggedIn: true,
      name : 'Lukasz',
      email:'lukasz.lukasiewicz@gmail.com',
      id: 1,
    })
  }

  const logout = () => {   
    setUser({
      loggedIn: false,
    })
  }

  return <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>
}

export default AuthProvider;


