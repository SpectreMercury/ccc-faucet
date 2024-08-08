"use client"

import "./globals.css";
import Header from "./components/Header";
import BackgroundCanvas from "./components/CanvasBackground";
import { ccc } from '@ckb-ccc/connector-react'



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <>
          <ccc.Provider>
            <Header />
            <BackgroundCanvas />
            {children}
          </ccc.Provider>
        </>
      </body>
    </html>
  );
}
