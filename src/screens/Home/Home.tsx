import React from "react";
import { MainContentSection } from "./sections/MainContentSection";
import { NewsletterSubscriptionSection } from "./sections/NewsletterSubscriptionSection";
import { FigureSection } from "./sections/FigureSection";
import { JoinOptionsSection } from "./sections/JoinOptionsSection";

export const Home = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f2f2f2]">
      <MainContentSection />
      <FigureSection />
      <JoinOptionsSection />
      <NewsletterSubscriptionSection />
    </div>
  );
};