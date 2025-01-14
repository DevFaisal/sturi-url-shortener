import "./globals.css";

export const metadata = {
  title: "Sturi URL - Transform your long URLs into short",
  description: "AI-powered healthcare",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
