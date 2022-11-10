import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);


const UserContexts = ({children}) => {
    const [user, setUser] = useState(null);
// User Create 
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

// Sign In 
    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }
// Log Out 
    const logOut = () =>{
        return signOut(auth);
    }

    useEffect(() =>{
        const unSubscrive = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
        });
        return () => unSubscrive();
    }, [])

    const authInfo = {user, createUser, signIn, logOut};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContexts;