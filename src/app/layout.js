import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Fable — Discover & Read Original Ebooks",
  description: "A digital platform connecting ebook lovers with talented writers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className="dark h-full">
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: "#0A1A0F", fontFamily: "'Inter', sans-serif" }}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}