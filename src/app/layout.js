import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crypto Audit",
  description: "Crypto Audit Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` ${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
