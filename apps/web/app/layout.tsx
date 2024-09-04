import "@repo/tailwind-config/globals.css";
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background w-screen h-screen">
        <Providers>
        {children}
        </Providers>
      </body>
    </html>
  );
}
