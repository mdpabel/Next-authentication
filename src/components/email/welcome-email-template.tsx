import {
  Html,
  Text,
  Container,
  Heading,
  Button,
} from '@react-email/components';

export function WelcomeEmailTemplate({
  userName,
  dashboardLink,
}: {
  userName: string;
  dashboardLink: string;
}) {
  return (
    <Html lang='en'>
      <Container
        style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <Heading style={{ fontSize: '24px', marginBottom: '20px' }}>
          Welcome to Our Platform, {userName}!
        </Heading>
        <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
          We&apos;re excited to have you on board. Click the button below to
          start exploring your dashboard.
        </Text>
        <Button
          href={dashboardLink}
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
          }}>
          Go to Dashboard
        </Button>
        <Text style={{ fontSize: '14px', marginTop: '20px' }}>
          If you have any questions, feel free to reach out to our support team.
        </Text>
      </Container>
    </Html>
  );
}

export default WelcomeEmailTemplate;
