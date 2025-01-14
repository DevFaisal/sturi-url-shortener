import "./globals.css";

export const metadata = {
  title: "Sturi URL",
  description: "Transform your long URLs into short",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
