import {
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

const packages = [
  {
    id: "apartment-starter",
    title: "APARTMENT STARTER",
    price: "12,500",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
    features: [
      "2× 2MP Indoor Cameras",
      "4-Channel DVR",
      "500GB Storage",
      "Free App Setup",
    ],
    buttonText: "Select Package",
    variant: "light",
  },
  {
    id: "family-guard",
    title: "FAMILY GUARD",
    price: "28,900",
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80",
    features: [
      "4× 5MP All-weather Cams",
      "8-Channel DVR",
      "1TB Storage + Smart Lock",
      "1 year Free Maintenance",
    ],
    buttonText: "Select Package",
    variant: "popular",
  },
  {
    id: "business-suite",
    title: "BUSINESS SUITE",
    price: "45,000",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    features: [
      "8× IP Cameras (Night Vision)",
      "16-Channel NVR",
      "2TB Server Storage",
      "24/7 Priority Support",
    ],
    buttonText: "Select Package",
    variant: "light",
  },
  {
    id: "custom-solution",
    title: "CUSTOM SOLUTION",
    price: null,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    description:
      "For large estates, multi-floor offices, or high-security data centers. We design to your specs.",
    buttonText: "Talk to Expert",
    variant: "dark",
  },
];

export function Packages({ packages: inputPackages }: { packages?: any[] }) {
  if (!inputPackages || inputPackages.length === 0) {
    return null;
  }

  const displayPackages = inputPackages.map((pkg, idx) => {
    const variant = idx % 3 === 1 ? "popular" : idx % 3 === 2 ? "dark" : "light";
    return {
      title: pkg.name.toUpperCase(),
      price: pkg.price ? Number(pkg.price).toLocaleString() : null,
      image: pkg.image,
      features: pkg.items && pkg.items.length > 0
        ? pkg.items.map((it: any) => it.nestedService?.name || "Premium item")
        : ["Full Service", "Expert technician", "Quality check", "Support included"],
      buttonText: "Select Package",
      variant,
      badge: variant === "popular" ? "POPULAR" : undefined,
      description: pkg.description,
    };
  });

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">
            Exclusive Packages
          </h2>
          <p className="text-slate-600 mt-2">
            Save more with our bundled solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-3xl p-8 relative flex flex-col h-full transition-all hover:-translate-y-1 ${
                pkg.variant === "popular"
                  ? "border-2 border-[#FF7C71] bg-rose-50/50 shadow-xl"
                  : pkg.variant === "dark"
                    ? "bg-[#261817] text-white"
                    : "bg-white border border-slate-100"
              }`}
            >
              {/* Popular Badge */}
              {pkg.badge && (
                <div className="absolute -top-3 right-6 bg-[#FF7C71] text-white text-xs font-bold px-4 py-1 rounded-full z-10">
                  {pkg.badge}
                </div>
              )}

              {pkg.image && (
                <div className="relative h-44 -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-[22px] border-b border-slate-100">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}

              <div className="mb-8">
                <h3
                  className={`text-lg font-semibold mb-4 ${pkg.variant === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  {pkg.title}
                </h3>

                {pkg.price ? (
                  <div className="mb-6">
                    <span className="text-4xl font-bold">৳{pkg.price}</span>
                  </div>
                ) : (
                  <div className="mb-6">
                    <h4 className="text-3xl font-bold mb-1">Get Quote</h4>
                  </div>
                )}
              </div>

              {/* Features or Description */}
              {pkg.features ? (
                <ul className="space-y-3 mb-10 flex-1">
                  {pkg.features.map((feature: any, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-[#FF7C71] mt-0.5 flex-shrink-0" />
                      <span
                        className={
                          pkg.variant === "dark"
                            ? "text-slate-300"
                            : "text-slate-600"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-400 leading-relaxed mb-10 flex-1">
                  {pkg.description}
                </p>
              )}

              {/* Button */}
              <button
                className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all ${
                  pkg.variant === "dark"
                    ? "bg-slate-100 text-slate-900 hover:bg-slate-300"
                    : pkg.variant === "popular"
                      ? "bg-[#FF7C71] text-white hover:bg-[#E5675D]"
                      : "bg-[#261817]/90 text-white hover:bg-black"
                }`}
              >
                {pkg.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
