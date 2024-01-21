import { headers } from "next/headers";

// <tenantId>.example.com
export const getTenantId = async () => {
  "use server";
  return new Promise<string>((resolve) => {
    const headersList = headers();
    const host = headersList.get('host');
    const hs = host.split(".")
    if (hs.length >= 2) {
      resolve(hs[0]);
    } else {
      resolve(undefined);
    }
  })
}
