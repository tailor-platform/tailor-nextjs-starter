"use client";

import {
  Container,
} from "@tailor-platform/styled-system/jsx";
import {useAuthUser} from "@/libs/google-firebase-client/firebase";
import {useState} from "react";

const Home = () => {
  const [idToken, setIdToken] = useState<string | null>(null);
  const {user, loading, signOut} = useAuthUser();
  if (loading) return (<Container w="100%" p={10}><h1>loading...</h1></Container>);
  const val = JSON.stringify(user, null, 2)
  user.getIdToken().then((token) => {
    setIdToken(token);
  });
  return (
    <Container w="100%" p={10}>
      <h1>home</h1>
      <ul>
        {user && [
          <li key={1}>user: {user.email}</li>,
          <li key={2}>tenantId: {user.tenantId}</li>,
          <li key={2}>idToken: {idToken}</li>,
        ]}
        {user && <li>user: {user.email} <pre>{val}</pre></li>}
        <li><a href={"/login"}>login</a></li>
        <button onClick={signOut}>logout</button>
      </ul>
    </Container>
  );
};

export default Home;
