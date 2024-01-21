"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useOverlay } from "@/hooks/useOverlay";

// クエリパラメータに情報があればtoastを出してくれるコンポーネント
export const QueryToaster = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showToast } = useOverlay();

  useEffect(() => {
    const showToastParam = searchParams.get("showToast");
    const toastTitle = searchParams.get("toastTitle") || "";
    const toastDescription = searchParams.get("toastDescription") || "";

    if (showToastParam) {
      showToast({
        title: toastTitle,
        description: toastDescription,
      });
    }
  }, [searchParams, showToast, pathname, router]);

  return <></>;
};
