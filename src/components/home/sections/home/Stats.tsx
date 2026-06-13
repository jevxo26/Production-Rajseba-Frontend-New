import React from 'react';
import { Users, Wrench, Star, ShieldCheck, TrendingUp } from 'lucide-react';

const stats = [
  { id: 1, label: 'Happy Customers', value: '50,000+', icon: Users },
  { id: 2, label: 'Services Completed', value: '120,000+', icon: Wrench },
  { id: 3, label: 'Verified Experts', value: '2,500+', icon: ShieldCheck },
  { id: 4, label: 'Average Rating', value: '4.8/5', icon: Star },
];

export default function Stats() {
  return (
    <div className="py-8 md:py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Title block */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
            <TrendingUp className="w-8 h-8 text-[#FF5A5F]" />
            Our Platform Impact
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
            Providing top-notch home services with trust and excellence
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#FF5A5F]/10 flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
                <stat.icon className="w-8 h-8 text-[#FF5A5F]" />
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">{stat.value}</h3>
              <p className="text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
