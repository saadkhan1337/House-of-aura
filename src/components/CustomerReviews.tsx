import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Salma Tariq',
      location: 'DHA Phase 5, Karachi',
      badge: 'Verified Buyer • Apple Hair Color',
      rating: 5,
      comment:
        'Sabse achi baat yeh hai ke rider ne open parcel check karwaya before taking cash. Zero stains on skin, genuine Italian formula. My grey hair was covered 100% in 15 minutes!',
      date: '3 days ago'
    },
    {
      id: 2,
      name: 'Farhan Salon & Studio',
      location: 'Gulberg III, Lahore',
      badge: 'Salon Owner • Cosmo Shampoo & Color',
      rating: 5,
      comment:
        'We order in bulk for our clients. The 1000ml Cosmo Keratin shampoo is phenomenal—clients with frizzy and treated hair immediately notice silky softness. Authentic UAE stock.',
      date: '1 week ago'
    },
    {
      id: 3,
      name: 'Zainab Mir',
      location: 'F-7/2, Islamabad',
      badge: 'Verified Buyer • Hamidi Bakhoor',
      rating: 5,
      comment:
        'The Sheikha bakhoor fragrance lasts for days in the house and clothes. Smells like a luxury Dubai hotel lobby. Packaging was totally secure with holographic seal.',
      date: '5 days ago'
    }
  ];

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#20212b]">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Over 1,200+ Satisfied Clients Across Pakistan</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
          Real Experiences, Real Trust
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 sm:p-6 rounded-2xl bg-[#12131b] border border-[#262734] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-zinc-500">{rev.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed mb-4">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                <p className="text-[11px] text-zinc-400">{rev.location}</p>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
