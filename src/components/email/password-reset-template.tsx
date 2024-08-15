import {
  Html,
  Button,
  Text,
  Container,
  Heading,
} from '@react-email/components';

export function PasswordResetTemplate({ resetLink }: { resetLink: string }) {
  return (
    <Html lang='en'>
      <Container
        style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <Heading style={{ fontSize: '24px', marginBottom: '20px' }}>
          Reset Your Password
        </Heading>
        <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
          We received a request to reset your password. Click the button below
          to proceed.
        </Text>
        <Button
          href={resetLink}
          style={{
            backgroundColor: '#28A745',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
          }}>
          Reset Password
        </Button>
        <Text style={{ fontSize: '14px', marginTop: '20px' }}>
          If you did not request this, please ignore this email or contact
          support.
        </Text>
      </Container>
    </Html>
  );
}

export default PasswordResetTemplate;
