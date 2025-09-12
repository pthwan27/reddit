import ClientProviders from "./clientProvider";
import { ModalProvider } from "./context/modalContext";

export const metadata = {
  title: "Reddit",
  description: "message app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <ModalProvider>{children}</ModalProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
