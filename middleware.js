// export { default } from "next-auth/middleware"

// export const config = { matcher: [ "/bookmarks", "/mytickets", "/create-event", "/my-events"] }

export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/((?!login|signup|reset-password|forget-password|$).*)" // Exclude the root "/", "login", and "signup" routes
  ]
}

