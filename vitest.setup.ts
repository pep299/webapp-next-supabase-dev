import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";

// @ts-expect-error
globalThis.React = React;

// NOTE: This setup file requires React to be available in the root workspace dependencies
// Core/DB packages that don't use React should not include this setupFile in their vitest.config
// to avoid unnecessary React dependency errors

// Mock window.matchMedia for Mantine (only in jsdom environment)
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

// React Testing Library cleanup
afterEach(() => {
  cleanup();
});

// Mock environment variables
beforeAll(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "http://localhost:54321";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
});

// Mock Next.js router
vi.mock("next/router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));
