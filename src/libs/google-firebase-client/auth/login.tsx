"use client";

import { Button, Input } from "@tailor-platform/design-systems";
import { VStack, Container, Box } from "@tailor-platform/styled-system/jsx";
import { skeletonLoader } from "@tailor-platform/styled-system/recipes";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@tailor-platform/design-systems/client";
import { useCallback, useEffect } from "react";
import { FirebaseError } from '@firebase/util'
import {
  useAuthUser,
  SAMLAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from '@/libs/google-firebase-client/firebase';
import {useTailorFirebase} from "@/libs/google-firebase-client/provider";

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
  tenantId: string;
  onLoginSuccess?: () => void;
  onLoginFailure?: (code: string, message: string) => void;
}

// https://ark-ui.com/docs/components/toast
const FirebaseLoginUI = ({
    onLoginSuccess,
    onLoginFailure
  }: LoginProps) => {
  const config = useTailorFirebase();
  const auth = config.auth;
  const {user, loading} = useAuthUser();

  useEffect(() => {
    getRedirectResult(auth).catch((err) => {
      if (err instanceof FirebaseError) {
        if (onLoginFailure) onLoginFailure(err.code, err.message);
      }
    })
  }, [auth, onLoginFailure]);

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
      await signInWithEmailAndPassword(auth, form.username, form.password);
      if (onLoginSuccess) onLoginSuccess();
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (onLoginFailure) onLoginFailure(error.code, error.message);
      }
    }
  }, [auth, onLoginSuccess, onLoginFailure]);

  const handleSignOut = useCallback(async () => {
    try {
      // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signout
      await signOut(auth);
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (onLoginFailure) onLoginFailure(error.code, error.message);
      }
    }
  }, [auth, onLoginFailure]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

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
    <Form.Root {...form} >
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="w-2/3 space-y-6"
      >
        <VStack>
          <h1 className="text-3xl font-bold text-center">Login</h1>
          {user && <p>ログイン済み: {user.email}</p>}

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
            Login
          </Button>
          <Button variant="primary" size="lg" width="full" type="button" mt={4} onClick={handleSignInWithSSO}>
            SignIn With SSO
          </Button>
          {user &&
            <Button variant="primary" size="lg" width="full" type="button" mt={4} onClick={handleSignOut}>
              Logout
            </Button>
          }
        </VStack>
      </form>
    </Form.Root>
  );
};

export default FirebaseLoginUI;