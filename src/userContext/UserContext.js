import { createContext, useEffect, useState } from "react";

import React from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import { app } from "../firebase/firebase.config";




export const AuthContext = createContext()
const auth = getAuth(app)

const UserContext = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // user sign up 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // user log in
    const login = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // log out user 
    const logOut = ()=>{
       
        setLoading(true)
        return signOut(auth)
    }

    //update Profile
    const userUpdate = (profile)=>{
        setLoading(true);
        return updateProfile(auth.currentUser , profile)
        
    }

    // login with social site like google
    const socialLogin = (socialProvider)=>{
        setLoading(true);
        return signInWithPopup(auth,socialProvider)

    }



    // observer
    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
           
            setUser(currentUser);
            setLoading(false);
        });

       
        return () =>{
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user, 
        loading,
        setLoading,
        createUser, 
        login,
        socialLogin,
        userUpdate,
        logOut
    }


    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;