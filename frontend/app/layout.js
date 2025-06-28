import './globals.css';
import ApolloWrapper from '@/components/ApolloWrapper'; // Adjust path

export const metadata = {
  title: 'My App',
  description: 'My app description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
