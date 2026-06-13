import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/nunito.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: "Easyplay - Una nueva peli al instante!",
  description: "Easyplay - Ahorra el tiempo en buscar una peli!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
