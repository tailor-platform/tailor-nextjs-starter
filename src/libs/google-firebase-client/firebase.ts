"use client";
import { onAuthStateChanged,User } from "firebase/auth";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { useTailorFirebase } from "@/libs/google-firebase-client/provider";

export {
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  SAMLAuthProvider,
} from "firebase/auth";

export const useAuthUser = () => {
  const { auth } = useTailorFirebase();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setLoading(true)
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [auth, setUser, setLoading]);
  const signOutFn = async () => {
    await signOut(auth);
  }
  return {user, loading, signOut: signOutFn};
}
