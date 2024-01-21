import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { QueryToaster } from "./queryToaster";
import * as OverlayHook from "@/hooks/useOverlay";

describe("QueryToaster", () => {
  const mockShowToast = vi.fn();
  beforeEach(() => {
    // 共通のモックセットアップ
    vi.mocked(OverlayHook.useOverlay).mockReturnValue({
      showToast: mockShowToast,
      showModal: vi.fn(),
      closeModal: vi.fn(),
    });

    vi.mock("@/hooks/useOverlay", () => ({
      useOverlay: vi.fn(() => ({
        showToast: vi.fn(),
        showModal: vi.fn(),
        closeModal: vi.fn(),
      })),
    }));
    vi.restoreAllMocks();
  });

  test("shows toast when query params are present", async () => {
    vi.mock("next/navigation", () => ({
      useRouter: vi.fn(() => ({ replace: vi.fn() })),
      usePathname: vi.fn(),
      useSearchParams: vi.fn(
        () =>
          new URLSearchParams({
            showToast: "true",
            toastTitle: "Test Title",
            toastDescription: "Test Description",
          }),
      ),
    }));

    render(<QueryToaster />);

    await waitFor(() => {
      expect(mockShowToast).not.toHaveBeenCalledWith({
        title: "Test Title",
        description: "Test Description",
      });
    });
  });

  test("does not show toast when query params are not present", async () => {
    vi.mock("next/navigation", () => ({
      useRouter: vi.fn(() => ({ replace: vi.fn() })),
      usePathname: vi.fn(),
      useSearchParams: vi.fn(() => new URLSearchParams()),
    }));

    render(<QueryToaster />);

    await waitFor(() => {
      expect(mockShowToast).not.toHaveBeenCalled();
    });
  });
});
