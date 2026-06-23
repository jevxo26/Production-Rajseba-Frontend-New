export interface FallbackCategory {
  id: number;
  name: string;
  slug: string;
}

export interface FallbackNestedService {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  service: {
    id: number;
    slug: string;
    category: {
      id: number;
      name: string;
      slug: string;
    };
  };
}

export const FALLBACK_CATEGORIES: FallbackCategory[] = [
  { id: 1, name: "Cleaning", slug: "cleaning" },
  { id: 2, name: "AC Repair", slug: "ac-repair" },
  { id: 3, name: "Plumbing", slug: "plumbing" },
  { id: 4, name: "Electrical", slug: "electrical" },
  { id: 5, name: "Painting", slug: "painting" },
  { id: 6, name: "Carpentry", slug: "carpentry" },
  { id: 7, name: "Home Salon", slug: "home-salon" },
  { id: 8, name: "Gardening", slug: "gardening" },
  { id: 9, name: "Pest Control", slug: "pest-control" },
  { id: 10, name: "Shifting", slug: "shifting" },
  { id: 11, name: "CCTV", slug: "cctv" },
  { id: 12, name: "Appliance Repair", slug: "appliance-repair" }
];

export const FALLBACK_NESTED_SERVICES: FallbackNestedService[] = [
  {
    id: "ns-1",
    name: "Premium Deep Cleaning",
    description: "Full home sanitization using eco-friendly industrial equipment. Perfect for move-in or seasonal refreshes.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
    price: 4500,
    service: {
      id: 101,
      slug: "premium-deep-cleaning",
      category: {
        id: 1,
        name: "Cleaning",
        slug: "cleaning"
      }
    }
  },
  {
    id: "ns-2",
    name: "Master AC Service",
    description: "Comprehensive cleaning and gas top-up for all split brands.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
    price: 1200,
    service: {
      id: 102,
      slug: "master-ac-service",
      category: {
        id: 2,
        name: "AC Repair",
        slug: "ac-repair"
      }
    }
  },
  {
    id: "ns-3",
    name: "Kitchen Deep Cleaning",
    description: "Degreasing and detailed cabinet cleaning services.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop",
    price: 2500,
    service: {
      id: 103,
      slug: "kitchen-cleaning",
      category: {
        id: 1,
        name: "Cleaning",
        slug: "cleaning"
      }
    }
  },
  {
    id: "ns-4",
    name: "Bathroom Sanitization",
    description: "Tackle lime-stains, sparkling sanitization.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
    price: 1500,
    service: {
      id: 104,
      slug: "bathroom-cleaning",
      category: {
        id: 1,
        name: "Cleaning",
        slug: "cleaning"
      }
    }
  },
  {
    id: "ns-5",
    name: "AC Installation / Uninstallation",
    description: "Professional AC installation and unit uninstallation services.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop",
    price: 2000,
    service: {
      id: 105,
      slug: "ac-installation",
      category: {
        id: 2,
        name: "AC Repair",
        slug: "ac-repair"
      }
    }
  },
  {
    id: "ns-6",
    name: "Water Tap Leak Repair",
    description: "Fixing leaky water taps and sanitary fittings.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop",
    price: 500,
    service: {
      id: 106,
      slug: "plumbing-services",
      category: {
        id: 3,
        name: "Plumbing",
        slug: "plumbing"
      }
    }
  },
  {
    id: "ns-7",
    name: "Short Circuit Fix",
    description: "Emergency electrical repair for short circuit and wiring issues.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
    price: 1500,
    service: {
      id: 107,
      slug: "electrical-services",
      category: {
        id: 4,
        name: "Electrical",
        slug: "electrical"
      }
    }
  },
  {
    id: "ns-8",
    name: "Home Painting Service",
    description: "Premium wall painting and decorative textures.",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop",
    price: 15000,
    service: {
      id: 108,
      slug: "painting-services",
      category: {
        id: 5,
        name: "Painting",
        slug: "painting"
      }
    }
  },
  {
    id: "ns-9",
    name: "Furniture Assembly",
    description: "Quick and professional carpentry services for all kinds of furniture.",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=600&auto=format&fit=crop",
    price: 2500,
    service: {
      id: 109,
      slug: "carpentry-services",
      category: {
        id: 6,
        name: "Carpentry",
        slug: "carpentry"
      }
    }
  }
];
