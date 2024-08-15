import { CreateEmailOptions, Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (configuration: CreateEmailOptions) => {
  try {
    const { data, error } = await resend.emails.send(configuration);
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
