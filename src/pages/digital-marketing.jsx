import Head from "next/head";
import RootLayout from "@/components/common/layout/RootLayout";
import DigitalMarketingHero from "@/components/hero/DigitalMarketingHero";
import DigitalMarketingBrand from "@/components/brand/DigitalMarketingBrand";
import DigitalMarketingAbout from "@/components/about/DigitalMarketingAbout";
import DigitalMarketingService from "@/components/service/DigitalMarketingService";
import DigitalMarketingProtfolio from "@/components/portfolio/DigitalMarketingProtfolio";
import DigitalMarketingTestimonial from "@/components/testimonial/DigitalMarketingTestimonial";
import DigitalMarketingWorkflow from "@/components/workflow/DigitalMarketingWorkflow";
import DigitalMarketingPrice from "@/components/price/DigitalMarketingPrice";
import DigitalMarketingBlog from "@/components/blog/DigitalMarketingBlog";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button"


export default function DigitalMarketing() {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Digital Marketing</title>
        <meta name="description" content="Digital Marketing Description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <RootLayout header="header1" footer="footer1">
          {/* Add the Login/Logout buttons */}
          {/* <div className="flex justify-end top-4 right-4 z-50">
            {session ? (
              <Button
              className='text-black'
              onClick={() => signOut()}
              >Button</Button>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-blue-500 text-black px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
              >
                Login
              </button>
            )}
          </div> */}
          <DigitalMarketingHero />
          <DigitalMarketingBrand />
          <DigitalMarketingAbout />
          <DigitalMarketingService />
          <DigitalMarketingProtfolio />
          <DigitalMarketingTestimonial />
          <DigitalMarketingWorkflow />
          <DigitalMarketingPrice />
          <DigitalMarketingBlog />
        </RootLayout>
      </main>
    </div>
  );
}
