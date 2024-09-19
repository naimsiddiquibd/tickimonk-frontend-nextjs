
import { Inter } from "next/font/google";
import "./globals.css";
import SidebarRight from "./components/SidebarRight";
import Sidebar from "./components/Sidebar";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tickimonk",
  description: "Created for Ticketing",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  console.log("AccessToken", session?.accessToken);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="lg:px-14 px-7 m-auto bg-[#F5F5F5]">
          <div className="grid grid-cols-1 lg:grid-cols-9 gap-5">
            <div className="lg:col-span-2">
              <Sidebar session={session}></Sidebar>
            </div>
            <div className="lg:col-span-5 overflow-y-scroll no-scrollbar max-h-screen">
              {children}
            </div>
            <div className="lg:col-span-2">
              <SidebarRight></SidebarRight>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
