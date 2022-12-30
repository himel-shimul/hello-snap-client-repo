import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            console.log(currentUser);
        });
        return () => unsubscribe();
    }, [])
    const logOut = () =>{
        return signOut(auth);
    }
    const googleLogIn = (googleProvider) =>{
        // setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = (profile) =>{
        return updateProfile(auth.currentUser, profile)
    }

    const url = `https://hello-server-steel.vercel.app/allUsers/${user?.email}`;
      
    const {data: currentUser, isLoading, refetch } = useQuery({
        queryKey:['allUsers', user?.email],
        queryFn: async () =>{
            const res = await fetch(url);
            const data = await res.data;
            return data;
        }
      })


    const authInfo = {
        createUser,
        signIn,
        user,
        logOut,
        updateUserProfile,
        googleLogIn,
        currentUser,
        refetch
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;