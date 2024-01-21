import { describe, test, expect } from "vitest";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OverlayProvider } from "./OverlayProvider";
import { useOverlay } from "@/hooks/useOverlay";

const ToastComponent = () => {
  const { showToast } = useOverlay();
  return (
    <button
      onClick={() =>
        showToast({ title: "Test", description: "This is a test" })
      }
    >
      Show Toast
    </button>
  );
};

const ModalTriggerComponent = () => {
  const { showModal } = useOverlay();
  return (
    <button
      onClick={() =>
        showModal({ header: "Header", content: <div>content</div> })
      }
    >
      Show Modal
    </button>
  );
};

describe("OverlayContext", () => {
  test("show toast", async () => {
    render(
      <OverlayProvider>
        <ToastComponent />
      </OverlayProvider>,
    );

    fireEvent.click(screen.getByText("Show Toast"));

    expect(await screen.findByText("Test")).toBeInTheDocument();
    expect(await screen.findByText("This is a test")).toBeInTheDocument();
  });

  test("closed toast", async () => {
    render(
      <OverlayProvider>
        <ToastComponent />
      </OverlayProvider>,
    );
    fireEvent.click(screen.getByText("Show Toast"));
    expect(await screen.findByText("Test")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("close"));
    await waitFor(() =>
      expect(screen.queryByText("Test")).not.toBeInTheDocument(),
    );
  });
});

describe("Modal", () => {
  test("show and close modal", async () => {
    render(
      <OverlayProvider>
        <ModalTriggerComponent />
      </OverlayProvider>,
    );

    const user = userEvent.setup();
    await act(async () => {
      await user.click(screen.getByText("Show Modal"));
    });
    expect(await screen.findByText("Header")).toBeVisible();
    expect(await screen.findByText("content")).toBeVisible();
    await act(async () => {
      await user.click(screen.getByLabelText("Close Dialog"));
    });
    expect(await screen.findByText("Header")).not.toBeVisible();
    expect(await screen.findByText("content")).not.toBeVisible();
  });
});
