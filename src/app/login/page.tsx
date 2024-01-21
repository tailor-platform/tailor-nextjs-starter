"use client";

import { Container } from "@tailor-platform/styled-system/jsx";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect} from "react";
import {FirebaseError} from "@firebase/util";
import {UserAction, useUser} from "@tailor-platform/client";
import FirebaseLoginUI from '@/libs/google-firebase-client/auth/login';
import { useOverlay } from "@/hooks/useOverlay";
import {Session} from "@/libs/google-firebase-client/types";

const Login = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")
  const { tenant: tenantId } = useParams<{ tenant: string }>()
  const { dispatchUser, user } = useUser();
  const { showToast } = useOverlay();
  const onLoginSuccess = useCallback((session: Session) => {
    dispatchUser({
      type: "update",
      payload: {
        id: session.user_id,
      },
      token: session.access_token
    } as UserAction);
    router.push(redirect || "/")
  }, [dispatchUser, router, redirect])
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
        console.log(err);
        showToast({title:"Failed to Login", description:"Failed to login"})
        break
    }
  }, [showToast])

  useEffect(() => {
    if (user && user.id !== "") {
      router.push("/")
    }
  }, [router, user])

  return (
    <Container w="400px" p={10}>
      <FirebaseLoginUI
        tenantId={tenantId}
        title={"Teams login"}
        header={<div>header</div>}
        footer={<div>footer</div>}
        identityProvider={"saml.okta"}
        identityProviderName={"Login with Okta"}
        onLoginFailure={onLoginFailure}
        onLoginSuccess={onLoginSuccess}
      />
    </Container>
  );
};

export default Login;