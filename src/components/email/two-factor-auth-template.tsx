import { Html, Text, Container, Heading } from '@react-email/components';

export function TwoFactorAuthTemplate({ authCode }: { authCode: string }) {
  return (
    <Html lang='en'>
      <Container
        style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <Heading style={{ fontSize: '24px', marginBottom: '20px' }}>
          Your Two-Factor Authentication Code
        </Heading>
        <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
          Use the following code to complete your login:
        </Text>
        <Heading
          style={{ fontSize: '32px', color: '#007BFF', marginBottom: '20px' }}>
          {authCode}
        </Heading>
        <Text style={{ fontSize: '14px', marginTop: '20px' }}>
          If you did not request this, please contact our support team
          immediately.
        </Text>
      </Container>
    </Html>
  );
}

export default TwoFactorAuthTemplate;
