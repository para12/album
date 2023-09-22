import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from "./common/navbar";
import MainProvider from "./context/MainContext";
import Tailwind from "./tailwind";
import { getServerSession } from "next-auth";
import SessionProvider from "./context/SessionProvider";
import { authOptions } from "./common/util";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Album",
  description: "soina y jinu",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainProvider>
          <SessionProvider session={session}>
            <NavBar />
          {children}
          </SessionProvider>
        </MainProvider>
      </body>
      <Tailwind />
    </html>
  );
}
