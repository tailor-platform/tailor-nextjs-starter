"use client";

import { Container, Box } from "@tailor-platform/styled-system/jsx";
import { skeletonLoader } from "@tailor-platform/styled-system/recipes";
import { useParams, useRouter } from "next/navigation";
import {useCallback, useEffect} from "react";
import {FirebaseError} from "@firebase/util";
import FirebaseLoginUI from '@/libs/google-firebase-client/auth/login';
import { useAuthUser } from "@/libs/google-firebase-client/firebase";
import {useOverlay} from "@/hooks/useOverlay";


const Login = () => {
  const { tenant: tenantId } = useParams<{ tenant: string }>()
  const { showToast } = useOverlay();
  const onLoginSuccess = useCallback(() => {
    // TODO: login process
  }, [])
  const onLoginFailure = useCallback((err: FirebaseError) => {
    switch (err) {
      case "auth/user-not-found":
      case "auth/invalid-email":
      case "auth/wrong-password":
        showToast({title:"Failed to Login", description:"username or password is invalid"})
        break
      case "auth/too-many-requests":
        showToast({title:"Failed to Login", description:"too many login request"})
        break
      default:
        console.error(err)
        showToast({title:"Failed to Login", description:"Failed to login"})
        break
    }
  }, [showToast])

  const router = useRouter()
  const {user, loading} = useAuthUser();
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [router, user])

  if (loading) {
    return (
      <Container w="400px" p={10}>
        <Box className={skeletonLoader()}>
          loading...
        </Box>
      </Container>
    );
  }

  return (
    <Container w="400px" p={10}>
      <FirebaseLoginUI
        tenantId={tenantId}
        onLoginFailure={onLoginFailure}
        onLoginSuccess={onLoginSuccess}
      />
    </Container>
  );
};

export default Login;