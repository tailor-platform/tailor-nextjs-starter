"use client";

import { Button, Input } from "@tailor-platform/design-systems";
import { VStack } from "@tailor-platform/styled-system/jsx";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@tailor-platform/design-systems/client";
import {ReactNode, useCallback, useEffect} from "react";
import { FirebaseError } from '@firebase/util'
import { UserCredential } from "firebase/auth";
import {
  SAMLAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from '@/libs/google-firebase-client/firebase';
import {useTailorFirebase} from "@/libs/google-firebase-client/provider";
import {useTailorFirebaseUtils} from "@/libs/google-firebase-client/hooks";
import {Session} from "@/libs/google-firebase-client/types";

type FormInput = {
  username: string;
  password: string;
};

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required."),
    password: z.string().min(1, "Password is required."),
  })
  .required();

export type LoginProps = {
  title?: string;
  header?: ReactNode;
  footer?: ReactNode;
  loginButton?: string;
  identityProviderName?: string;
  identityProvider?: string;
  tenantId: string;
  onLoginSuccess?: (user: Session) => void;
  onLoginFailure?: (code: string, message: string) => void;
}

// https://ark-ui.com/docs/components/toast
const FirebaseLoginUI = ({
  title,
  header,
  footer,
  loginButton,
  identityProviderName,
  identityProvider,
    onLoginSuccess,
    onLoginFailure
  }: LoginProps) => {
  const { auth } = useTailorFirebase();
  const { exchangeTokenForSession } = useTailorFirebaseUtils();
  const handleTailorLogin = useCallback(async (cred: UserCredential) => {
    const idToken = await cred.user.getIdToken();
    try {
      const session = await exchangeTokenForSession(idToken);
      if (onLoginSuccess) onLoginSuccess(session);
    } catch (error) {
        if (onLoginFailure) onLoginFailure("auth", error.message);
    }
  }, [exchangeTokenForSession, onLoginFailure, onLoginSuccess])
  useEffect(() => {
    (async () => {
      try {
        const cred = await getRedirectResult(auth);
        await handleTailorLogin(cred);
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (onLoginFailure) onLoginFailure(error.code, error.message);
        }
      }
    })();
  }, [auth, exchangeTokenForSession, handleTailorLogin, onLoginFailure, onLoginSuccess]);

  const handleSignInWithSSO = useCallback(async () => {
    try {
      const provider = new SAMLAuthProvider('saml.okta');
      // https://firebase.google.com/docs/reference/js/auth.md?hl=ja#signinwithredirect_770f816
      await signInWithRedirect(auth, provider);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (onLoginFailure) onLoginFailure(error.code, error.message);
      }
    }
  }, [auth, onLoginFailure]);

  const handleFormSubmit: SubmitHandler<FormInput> = useCallback(async (form) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, form.username, form.password);
      await handleTailorLogin(cred)
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (onLoginFailure) onLoginFailure(error.code, error.message);
      }
    }
  }, [auth, handleTailorLogin, onLoginFailure]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Form.Root {...form} >
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="w-2/3 space-y-6"
      >
        <VStack>
          <h1 className="text-3xl font-bold text-center">{title || "Login"}</h1>
          {header}
          <Form.Field
            control={form.control}
            name="username"
            render={({ field }) => (
              <Form.Item w="full">
                <Form.Label>Username</Form.Label>
                <Form.Control>
                  <Input placeholder="Username" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="password"
            render={({ field }) => (
              <Form.Item w="full">
                <Form.Label>Email</Form.Label>
                <Form.Control>
                  <Input placeholder="Password" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Button variant="primary" size="lg" width="full" type="submit" mt={4} >
            {loginButton|| "Login"}
          </Button>
          {identityProvider &&
            <Button variant="primary" size="lg" width="full" type="button" mt={4} onClick={handleSignInWithSSO}>
              {identityProviderName || `Login with ${identityProvider}`}
            </Button>
          }
          {footer}
        </VStack>
      </form>
    </Form.Root>
  );
};

export default FirebaseLoginUI;