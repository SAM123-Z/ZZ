import React from "react";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Bike, Store, ArrowRight } from "lucide-react";

export const JoinOptionsSection = (): JSX.Element => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Devenir Livreur",
      icon: <Bike className="w-16 h-16 text-[#ff6600]" />,
      description: "Rejoignez notre équipe de livreurs et profitez d'un emploi du temps flexible. Gagnez un revenu complémentaire en livrant de délicieux repas à nos clients.",
      benefits: [
        "Horaires flexibles",
        "Revenus attractifs",
        "Support 24/7",
        "Formation complète"
      ],
      path: "/delivery-signup"
    },
    {
      title: "Devenir Restaurateur",
      icon: <Store className="w-16 h-16 text-[#ff6600]" />,
      description: "Développez votre activité en rejoignant notre plateforme. Accédez à de nouveaux clients et augmentez vos ventes grâce à notre service de livraison.",
      benefits: [
        "Visibilité accrue",
        "Gestion simplifiée",
        "Analytics détaillés",
        "Support dédié"
      ],
      path: "/restaurant-signup"
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Devenir Partenaire
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  {option.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-[#ff6600] mb-4">
                  {option.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {option.description}
                </p>

                <div className="w-full mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    {option.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center bg-orange-50 rounded-lg p-3"
                      >
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => navigate(option.path)}
                  className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white rounded-full py-6 text-lg font-semibold flex items-center justify-center gap-2 group"
                >
                  {option.title}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};