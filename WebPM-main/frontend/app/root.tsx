import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import ReactQueryProvider from "./provider/react-query-provider";
import { ThemeProvider } from "./components/theme-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NotificationProvider } from "./context/NotificationProvider";

// Import your global stylesheet. Make sure this file exists.
import "./app.css";

export const links: LinksFunction = () => [];

// Ensure this VITE_GOOGLE_CLIENT_ID is configured in your .env file
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_FALLBACK_GOOGLE_CLIENT_ID";

export default function RootLayout() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {/* All application-level providers wrap the Outlet */}
        <ReactQueryProvider>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <NotificationProvider>
                <Outlet /> {/* Child routes will be rendered here */}
              </NotificationProvider>
            </ThemeProvider>
          </GoogleOAuthProvider>
        </ReactQueryProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// This is the standard Remix Error Boundary.
// It will catch any errors that occur in your nested routes.
export function ErrorBoundary() {
  const error = useRouteError();

  let message = "Oops! Something went wrong.";
  let details = "An unexpected error occurred. Please try again later.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 - Page Not Found" : `${error.status} ${error.statusText}`;
    details = error.data?.message || "The page you are looking for does not exist or has been moved.";
  } else if (import.meta.env.DEV && error instanceof Error) {
    message = error.message;
    details = "An error occurred during development.";
    stack = error.stack;
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <title>{message}</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <main className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">{message}</h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{details}</p>
          {stack && (
            <pre className="mt-6 w-full max-w-2xl overflow-x-auto rounded bg-gray-50 dark:bg-gray-700 p-4 text-left text-sm text-red-500">
              <code>{stack}</code>
            </pre>
          )}
        </main>
        <Scripts />
      </body>
    </html>
  );
}