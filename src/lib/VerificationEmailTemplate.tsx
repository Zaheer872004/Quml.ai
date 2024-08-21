import { Body, Button, Column, Container, Head, Heading, Hr, Html, Img,  Preview, Row, Section, Text, Tailwind } from '@react-email/components';

import Link from 'next/link';
import * as React from 'react';

enum Role{
  'STUDENT',
  'RECRUITER'
}

interface WelcomeEmailProps {

  name? : string;

  otp? : string;

  role? : Role;

}



const VerificationEmailTemplate = ({name,otp,role} : WelcomeEmailProps) => {

  const previewText = `Welcome to ${name}, on Quml application`;


  return (

    <Html>

      <Head />

      <Preview>{previewText}</Preview>

      <Tailwind>

      <Body className="bg-white my-auto mx-auto font-sans">

        <Container className="my-10 mx-auto p-5 w-[465px]">

          <Section className="mt-8">

            <Text>
              <p className='bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text'>Quml Application</p>
            </Text>


            {/* <Img

              src={`${baseUrl}/static/example-logo.png`}

              width="80"

              height="80"

              alt="Logo Example"

              className="my-0 mx-auto"

            /> */}

          </Section>

          <Heading className="text-2xl font-normal text-center p-0 my-8 mx-0">

            Welcome to <strong> Quml application </strong>, {name} Your role is {role}!

          </Heading>

          <Text className="text-sm">

            Hello {name},

          </Text>

          <Text className="text-sm">

            We're excited to have you onboard at <strong>Feedback Application </strong>. We hope you enjoy your journey with us. If you have any questions or need assistance, feel free to reach out.

          </Text>

          <Text className='font-medium text-white'>
              {otp}
          </Text>

          <Section className="text-center mt-[32px] mb-[32px]">

              <Button

                // pX={20}

                // pY={12}

                className="px-20 py-12 bg-[#00A3FF] rounded text-white text-xs font-semibold no-underline text-center"

                href={`${baseUrl}/sign-in`}

              >

                Get Started with {otp},
                Role : {role}

              </Button>

          </Section>

          <Text className="text-sm">

            Cheers,

            <br/>

            The Quml Application Team  <strong>{" "} Contact with us - <Link href={'https://mail.google.com/mail/u/0/#inbox'}>Email</Link></strong>

          </Text>

        </Container>

      </Body>

      </Tailwind>

    </Html>

  );

};


const baseUrl = 'http://localhost'


export default VerificationEmailTemplate;

