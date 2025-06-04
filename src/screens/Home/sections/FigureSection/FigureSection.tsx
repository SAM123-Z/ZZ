import React from "react";

export const FigureSection = (): JSX.Element => {
  const figures = [
    {
      number: "10K+",
      label: "Happy Customers",
      description: "We have served thousands of satisfied customers"
    },
    {
      number: "500+",
      label: "Restaurants",
      description: "Partner restaurants across the city"
    },
    {
      number: "100+",
      label: "Popular Dishes",
      description: "Delicious dishes to choose from"
    },
    {
      number: "50+",
      label: "Cities",
      description: "Serving in major cities"
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {figures.map((figure, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg transition-transform hover:transform hover:scale-105"
            >
              <h3 className="text-4xl font-bold text-[#ff6600] mb-2">
                {figure.number}
              </h3>
              <p className="text-xl font-semibold text-gray-800 mb-2">
                {figure.label}
              </p>
              <p className="text-gray-600 text-sm">
                {figure.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};