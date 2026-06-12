"use client";

import Image from "next/image";
import "./trending.css";

const trendingPageServices = [
  {
    id: "premium-deep-cleaning",
    title: "Premium Deep Cleaning",
    description: "Complete sanitation for houses & offices.",
    image: "/images/service/cleaning.png",
    rating: 4.9,
    reviews: "1.2k",
    price: "1,500",
    badge: "Trending",
  },
  {
    id: "master-ac-service",
    title: "Master AC Service",
    description: "Jet wash, gas refill & master repair.",
    image: "/images/service/ac.png",
    rating: 4.8,
    reviews: "850",
    price: "1,200",
    badge: null,
  },
  {
    id: "expert-plumbing",
    title: "Expert Plumbing",
    description: "Leak fixing, pipe installation & drainage.",
    image: "/images/service/plumbing.png",
    rating: 4.7,
    reviews: "520",
    price: "800",
    badge: null,
  },
  {
    id: "electrical-solution",
    title: "Electrical Solution",
    description: "Wiring, socket repair & appliance setup.",
    image: "/images/service/electrical.png",
    rating: 4.9,
    reviews: "910",
    price: "900",
    badge: null,
  },
  {
    id: "luxe-painting",
    title: "Luxe Painting",
    description: "Interior & exterior wall painting solutions.",
    image: "/images/service/luxe.png",
    rating: 4.6,
    reviews: "315",
    price: "5,000",
    badge: null,
  },
  {
    id: "premium-shifting",
    title: "Premium Shifting",
    description: "Hassle-free home & office moving.",
    image: "/images/service/shifting.png",
    rating: 4.8,
    reviews: "1.1k",
    price: "4,500",
    badge: null,
  },
  {
    id: "safe-pest-control",
    title: "Safe Pest Control",
    description: "Eco-friendly pest & termite control.",
    image: "/images/service/pest.png",
    rating: 4.7,
    reviews: "640",
    price: "2,000",
    badge: null,
  },
  {
    id: "appliance-repair",
    title: "Appliance Repair",
    description: "Fridge, Oven & Microwave servicing.",
    image: "/images/service/appliance.png",
    rating: 4.5,
    reviews: "290",
    price: "1,000",
    badge: null,
  },
];

export default function TrendingServicesPage() {
  return (
    <section className="trending-page-section">
      <div className="trending-page-container">
        {/* Header */}
        <div className="trending-page-header">
          <div>
            <h1 className="trending-page-title">Trending Services</h1>
            <p className="trending-page-subtitle">
              The most requested home services in Dhaka, selected by thousands of happy customers for quality and reliability.
            </p>
          </div>
          <button className="popularity-index-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d93838" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path>
            </svg>
            Live Popularity Index
          </button>
        </div>

        {/* Filters */}
        <div className="trending-page-filters-wrapper">
          <div className="trending-page-filters-left">
            <button className="trending-page-filter-btn">
              All Categories
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            
            <button className="trending-page-filter-btn">
              Price Range
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>
            </button>

            <button className="trending-page-filter-btn">
              Rating (4.5+)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </button>
          </div>

          <div className="trending-page-sort">
            <span>Sort by:</span>
            <select defaultValue="popularity" className="trending-page-sort-select">
              <option value="popularity">Popularity</option>
              <option value="rating">Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="trending-page-grid">
          {trendingPageServices.map((service) => (
            <div key={service.id} className="trending-page-card">
              <div className="trending-page-card-image">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {service.badge && (
                  <span className="trending-page-badge">{service.badge}</span>
                )}
              </div>
              <div className="trending-page-card-info">
                <div className="trending-page-rating">
                  <span className="trending-page-star">★</span>
                  <span className="trending-page-rating-val">{service.rating}</span>
                  <span className="trending-page-rating-count">({service.reviews} reviews)</span>
                </div>
                <h3 className="trending-page-card-title">{service.title}</h3>
                <p className="trending-page-card-desc">{service.description}</p>
                
                <div className="trending-page-card-footer">
                  <div>
                    <span className="trending-page-price-label">Starts from</span>
                    <span className="trending-page-price-val">৳{service.price}</span>
                  </div>
                  <button className="trending-page-book-btn">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="listings-pagination">
          <button className="pagination-arrow">‹</button>
          <button className="pagination-num pagination-num--active">1</button>
          <button className="pagination-num">2</button>
          <button className="pagination-num">3</button>
          <span style={{color: "var(--text-secondary)", margin: "0 8px"}}>...</span>
          <button className="pagination-num">12</button>
          <button className="pagination-arrow">›</button>
        </div>

        {/* Custom Service Section */}
        <div className="custom-service-section">
          <h2 className="custom-service-title">Can't find what you need?</h2>
          <p className="custom-service-desc">
            Our concierge team is ready to help you find the perfect professional for your unique requirements.
          </p>
          <div className="custom-service-actions">
            <button className="custom-service-contact-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3v4z"></path><path d="M3 19a2 2 0 0 0 2 2h1v-6H3v4z"></path></svg>
              Contact Support
            </button>
            <button className="custom-service-request-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              Request Custom Service
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
