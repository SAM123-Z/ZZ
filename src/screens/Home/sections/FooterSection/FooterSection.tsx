import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import React from "react";

export const FooterSection = (): JSX.Element => {
  // Social media links data
  const socialLinks = [
    { icon: <TwitterIcon className="h-4 w-4" />, alt: "Twitter" },
    {
      icon: (
        <img className="h-6 w-6\" alt="Pinterest\" src="/mdi-pinterest.svg" />
      ),
      alt: "Pinterest",
    },
    { icon: <InstagramIcon className="h-6 w-6" />, alt: "Instagram" },
    { icon: <LinkedinIcon className="h-6 w-6" />, alt: "Linkedin" },
    { icon: <FacebookIcon className="h-6 w-6" />, alt: "Facebook" },
  ];

  // Navigation links data
  const navLinks = ["Open Restaurant", "Become A Delivery Man", "Profile"];

  // Contact info data
  const contactInfo = [
    {
      icon: "/material-symbols-apartment.svg",
      text: "House : 00, Road, 00, City-0000,country",
    },
    { icon: "/ic-baseline-email.svg", text: "admin@gmail.com" },
    { icon: "/ic-baseline-phone.svg", text: "0612345678" },
  ];

  // Submenu links data
  const submenuLinks = [
    "About Us",
    "Categories",
    "Restaurants",
    "Privacy Policy",
    "Term & Conditions",
  ];

  // Quick links data
  const quickLinks = [
    "New Restaurants",
    "Popular Restaurants",
    "Best Reviewed foods",
    "Track Order",
  ];

  return (
    <footer className="bg-couleur-du-fond-principale py-8 px-4 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Social media and navigation */}
        <div className="flex flex-col items-center gap-4 mb-8">
          {/* Social media icons */}
          <div className="flex items-center gap-5 bg-white">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                aria-label={link.alt}
                className="hover:opacity-80 transition-opacity"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap justify-center gap-4 text-center">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="font-police-courant-regular text-couleur-du-texte hover:text-premire-couleur transition-colors text-sm md:text-base"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
          {/* Company info column */}
          <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="font-police-principal-titre-1 text-premire-couleur text-3xl md:text-4xl font-extrabold">
                Food
              </span>
              <span className="font-police-principal-titre-1 text-couleur-du-texte text-3xl md:text-4xl font-extrabold">
                Swift
              </span>
            </div>
            <p className="font-police-courant-regular text-couleur-du-texte">
              is Best Delivery Service Near You
            </p>

            {/* Contact information */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <img className="w-6 h-6" alt="" src={item.icon} />
                  <span className="font-police-courant-regular text-black text-sm md:text-base">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Submenu column */}
          <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
            <h3 className="font-police-principale-titres-h2 text-couleur-du-texte text-2xl md:text-[28px] font-bold">
              Submenu
            </h3>
            <nav className="flex flex-col gap-5">
              {submenuLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="font-police-courant-regular text-couleur-du-texte hover:text-premire-couleur transition-colors text-sm md:text-base"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Quick links column */}
          <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
            <h3 className="font-police-principale-titres-h2 text-couleur-du-texte text-2xl md:text-[28px] font-bold">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-5">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="font-police-courant-regular text-couleur-du-texte hover:text-premire-couleur transition-colors text-sm md:text-base"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex justify-center pt-8">
          <p className="font-police-courant-regular text-couleur-du-texte text-sm md:text-base text-center">
            Copyright&nbsp;&nbsp;Ⓒ copyright 2024
          </p>
        </div>
      </div>
    </footer>
  );
};