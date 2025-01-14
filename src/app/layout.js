import "./globals.css";

export default function RootLayout({ children }) {
  // Sturi URL
  return (
    <html>
      <body >{children}</body>
    </html>
  );
}
