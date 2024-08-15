import { Html, Text, Container, Heading } from '@react-email/components';

export function ChangePasswordTemplate({
  loginLink,
  supportLink,
}: {
  loginLink: string;
  supportLink: string;
}) {
  return (
    <Html lang='en'>
      <Container
        style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <Heading style={{ fontSize: '24px', marginBottom: '20px' }}>
          Your Password Has Been Changed
        </Heading>
        <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
          This is a confirmation that your password has been successfully
          changed. If this was you, no further action is required.
        </Text>
        <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
          If you did not change your password, please
          <a
            href={supportLink}
            style={{ color: '#007BFF', textDecoration: 'none' }}>
            {' '}
            contact our support team{' '}
          </a>
          immediately.
        </Text>
        <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
          You can log in using your new password by clicking the link below:
        </Text>
        <a
          href={loginLink}
          style={{
            display: 'inline-block',
            backgroundColor: '#007BFF',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            marginTop: '20px',
          }}>
          Log In
        </a>
      </Container>
    </Html>
  );
}

export default ChangePasswordTemplate;
