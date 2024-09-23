// app/api/auth/refresh-session/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/authOptions"; // Adjust the path according to your project structure

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Session not found." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Return the refreshed session
    return new Response(JSON.stringify({ message: "Session refreshed", session }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to refresh session." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
