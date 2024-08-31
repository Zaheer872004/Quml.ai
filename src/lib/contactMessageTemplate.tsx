import { Html, Head, Preview, Tailwind, Body, Container, Section, Heading, Text, Button } from '@react-email/components';

interface ContactEmailProps {
  from: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const ContactEmailTemplate = ({ from, name, email, phone, subject, message }: ContactEmailProps) => {
  const previewText = `Contact message from ${name}: ${subject}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="my-10 mx-auto p-5 w-[465px]">
            <Section className="mt-8">
              <Text>
                <p className='bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text'>Contact Us</p>
              </Text>
            </Section>
            <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">
              New Contact Message
            </Heading>
            <Text className="text-sm">
              You have received a new contact message from {name}.
            </Text>
            <Text className="text-sm">
              <strong>Name:</strong> {name}
            </Text>
            <Text className="text-sm">
              <strong>Email:</strong> {email}
            </Text>
            {phone && (
              <Text className="text-sm">
                <strong>Phone:</strong> {phone}
              </Text>
            )}
            <Text className="text-sm">
              <strong>Subject:</strong> {subject}
            </Text>
            <Text className="text-sm">
              <strong>Message:</strong>
              <p>{message}</p>
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="px-20 py-12 bg-[#00A3FF] rounded text-white text-xs font-semibold no-underline text-center"
                href={`mailto:${email}`}
              >
                Reply to {name}
              </Button>
            </Section>
            <Text className="text-sm">
              Cheers,
              <br />
              The Quml Application Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmailTemplate;
