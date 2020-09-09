import React, {useState} from 'react';

export const AuthContext = React.createContext();

const AuthProvider = ({children}) => {

  const [user,setUser] = useState({loggedIn: false});

  const login = () => {
    setUser({
      loggedIn: true,
      image: 'https://avatars1.githubusercontent.com/u/4199014',
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


