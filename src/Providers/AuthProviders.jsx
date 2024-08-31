import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from '../Firebase/Firebase.config'
export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
      }

    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const githubLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    useEffect(()=>{
        const unsubscirbe = onAuthStateChanged(auth, currentUser=>{
            console.log('ON Auth state changed', currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return()=>{
            unsubscirbe()
        }
    }, [])


    const authInfo = {
        createUser,
        login,
        logOut,
        user,
        setUser,
        loading,
        googleLogin,
        githubLogin,
        updateUserProfile

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;