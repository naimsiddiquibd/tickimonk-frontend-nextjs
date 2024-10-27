

import "./globals.css";
import SidebarRight from "./components/SidebarRight";
import Sidebar from "./components/Sidebar";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Navbar from "./components/Navbar";
import NewNavBarForTop from "./components/NewNavBarForTop";
import Footer from "./components/Footer";
import Copyright from "./components/Copyright";
import GetStarted from "./components/GetStarted";



export const metadata = {
  title: "Tickimonk",
  description: "Created for Ticketing",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  console.log("AccessToken", session?.accessToken);
  return (
    <html lang="en">
      <body>
        <div className="bg-[#112D59]">
          <div className="">
           {/* <Sidebar session={session}></Sidebar> */}
           <NewNavBarForTop session={session}></NewNavBarForTop>
            <div>
              {children}
            </div>
            <Copyright></Copyright>
          </div>
        </div>
      </body>
    </html>
  );
}
