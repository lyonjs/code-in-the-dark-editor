import '../style.scss';
import { Layout } from '../components/layout/Layout';
import Hydration from "../components/Hydratation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Hydration />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
