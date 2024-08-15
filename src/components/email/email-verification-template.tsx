import { Html, Link, Text, Container, Heading } from '@react-email/components';

const EmailVerificationTemplate = ({
  verificationLink,
}: {
  verificationLink: string;
}) => {
  return (
    <Html>
      <Container
        style={{
          maxWidth: '600px',
          padding: '20px',
          margin: 'auto',
          border: '1px solid gray',
        }}>
        <Heading style={{ fontSize: '24px', marginBottom: '20px' }}>
          Verify your email
        </Heading>
        <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
          Thank you for registering! Please click the button below to verify
          your email address.
        </Text>
        <Link
          style={{
            color: 'indigo',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
          href={verificationLink}>
          Verify email
        </Link>
        <Text style={{ fontSize: '14px', marginTop: '20px' }}>
          If you did not create an account, please ignore this email.
        </Text>
        <Link href='http://localhost:3000/resend-verification-email'>
          Resend verification link
        </Link>
      </Container>
    </Html>
  );
};

export default EmailVerificationTemplate;
