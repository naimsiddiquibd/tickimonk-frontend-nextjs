import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const res = await fetch(`${process.env.BACKEND_URL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
                });

                const data = await res.json();

                if (res.ok && data.accessToken) {
                    // Decode the accessToken to extract user info
                    const decodedToken = jwt.decode(data.accessToken);
                    const user = decodedToken?.user || {};

                    return {
                        id: user.id,
                        name: user.name || "Default Name",
                        email: user.email || "",
                        role: user.role || "user", // Default to "user" if role is not provided
                        accessToken: data.accessToken,
                    };
                } else {
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    
    callbacks: {
        async session({ session, token }) {
 
            
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.role = token.role || "user"; // Default to "user" if role is not provided
            session.accessToken = token.accessToken; // Include the accessToken in the session
    

            
            return session;
        },
        async jwt({ token, user }) {
            
            
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role; // Store the role in the JWT token
                token.accessToken = user.accessToken; // Store the accessToken in the JWT token
            }
            
            
            return token;
        }
    }
    
};
