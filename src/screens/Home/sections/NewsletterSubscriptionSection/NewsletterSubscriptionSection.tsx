import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const NewsletterSubscriptionSection = (): JSX.Element => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-[100px] py-6 md:py-[15px] w-full bg-couleur-du-fond-principale gap-4 md:gap-0">
      <div className="flex flex-col items-center md:items-start gap-[15px] text-center md:text-left w-full md:w-auto">
        <h2 className="font-bold text-xl md:text-[23.3px] leading-8 text-[#141313] font-['Rubik',Helvetica]">
          Lets Connect !
        </h2>
        <p className="text-sm leading-[21px] text-[#141313] font-['Rubik',Helvetica]">
          Stay upto date with restaurants around you.
          <br />
          Subscribe with email.
        </p>
      </div>

      <div className="flex items-center w-full md:w-auto">
        <div className="relative flex items-center w-full md:w-auto">
          <Input
            className="w-full md:w-[289px] h-8 bg-[#f2f2f280] text-[#65748b] font-['Rubik',Helvetica] text-base rounded-none border-none"
            placeholder="Your Email Address"
          />
          <Button
            type="submit"
            className="min-w-[45px] h-8 px-[10.5px] py-[5px] rounded-[5px] ml-0 [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,190,11,1)_0%,rgba(251,86,7,1)_100%)]"
            aria-label="Subscribe"
          >
            <ArrowRightIcon className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
};