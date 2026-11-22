import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/library(.*)",
    "/create-book(.*)",
    "/api/books(.*)",
  ],
};
