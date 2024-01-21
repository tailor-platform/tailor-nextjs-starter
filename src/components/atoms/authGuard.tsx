"use client";
import React, {useEffect} from "react";
import {useUser} from "@tailor-platform/client";
import {usePathname, useRouter} from "next/navigation";

type AuthGuardProps = {
  loginPath: string
  publicPaths: string[]
  children: React.ReactNode
}

const AuthGuard = ({children, publicPaths, loginPath}: AuthGuardProps) => {
  const { user, loading } = useUser();
  const pathname = usePathname()
  const router = useRouter()
  useEffect(() => {
    if (loading) {
      return
    }
    if (publicPaths.includes(pathname)) {
      return
    }
    if (!user || user.id === '') {
      router.push(loginPath + "?redirect=" + encodeURI(pathname))
    }
  }, [loginPath, pathname, publicPaths, router, user, loading])
  return (
    <>{children}</>
  )
}

export default AuthGuard