import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.clone();
  const baseUrl = `${url.protocol}//${url.host}`;
  const user = await auth();

  if (user.sessionId !== null && url.pathname === "/") {
    console.log("User is signed in, redirecting to /dashboard");
    return NextResponse.redirect(`${baseUrl}/dashboard`);
  }

  if (isProtectedRoute(req) || !isPublicRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
