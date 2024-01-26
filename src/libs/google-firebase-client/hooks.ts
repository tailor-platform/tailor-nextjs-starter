import { useTailorFirebase } from "./provider"
import { ErrorResponse, Session, UserInfo } from "@/libs/google-firebase-client/types";

export const useTailorFirebaseUtils = () => {
  const firebaseConfig = useTailorFirebase();
  const { config } = firebaseConfig;
  const { authServiceUserInfoPath, authServiceTokenPath, authServiceRefreshTokenPath} = config;
  const makeApiUrl = (path?: string): string => `${config.apiUrl}${path}`;

  const exchangeTokenForSession = async (
    idToken: string,
    tenantId?: string,
  ): Promise<Session> => {
    const formData = new FormData();
    formData.append("id_token", idToken);
    if (tenantId) {
      formData.append("tenant_id", tenantId);
    }
    const res = await fetch(makeApiUrl(authServiceTokenPath), {
      method: "POST",
      body: formData,
    });
    const text = await res.text();
    return JSON.parse(text) as Session;
  };

  const refreshToken = async (
    refreshToken: string,
  ): Promise<Session | ErrorResponse> => {
    const formData = new FormData();
    formData.append("refresh_token", refreshToken);
    try {
      const res = await fetch(makeApiUrl(authServiceRefreshTokenPath), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `refresh_token=${encodeURIComponent(refreshToken)}`,
      });

      const text = await res.text();
      return JSON.parse(text) as Session;
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : "" };
    }
  };

  const getLoggedInPlatformUser = async (
    token: string,
  ): Promise<UserInfo | ErrorResponse> => {
    try {
      const res = await fetch(makeApiUrl(authServiceUserInfoPath), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const text = await res.text();
      return JSON.parse(text) as UserInfo;
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : "" };
    }
  };

  return {
    exchangeTokenForSession,
    refreshToken,
    getLoggedInPlatformUser,
  }

}