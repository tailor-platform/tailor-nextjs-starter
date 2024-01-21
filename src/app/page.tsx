"use client";

import {
  Box,
} from "@tailor-platform/styled-system/jsx";
import { User } from "firebase/auth";
import {useAuthUser} from "@/libs/google-firebase-client/firebase";

const ProfileDebug = ({user}: User) => {
  const val = JSON.stringify(user, null, 2)
  return (
    <ul>
      <li>user: {user?.email}</li>
      <li>tenantId: {user?.tenantId}</li>
      {user && <li>user: {user?.email} <pre>{val}</pre></li>}
    </ul>
  )
}

const Home = () => {
  const {user, signOut} = useAuthUser();
  return (
    <Box w="full">
      <h1>home</h1>
      <ProfileDebug user={user} />
      <ul>
        <li><a href={"/login"}>login</a></li>
        <button onClick={signOut}>logout</button>
      </ul>
    </Box>
  );
};

export default Home;
