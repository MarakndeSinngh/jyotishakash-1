import React from "react";
import SmartImage from "./SmartImage";
import { resolveImagePath } from "../../utils/imageHelper";
import { GEMSTONES } from "../../constants/gemstones";

export default function GemstonesPage() {
  return (
    <section className="min-h-screen py-24 px-6 relative z-10">
      
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-cinzel text-primary tracking-widest gold-glow-text">
          Gemstone Collection
        </h2>
        <p className="text-text-secondary mt-3 max-w-xl mx-auto">
          Discover powerful Vedic gemstones aligned with your destiny
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        
        {GEMSTONES.map((stone, i) => (
          <div
            key={i}
            className="bg-card border border-border/20 rounded-2xl shadow-xl overflow-hidden relative group"
          >

            {/* Image Section */}
            <div className="h-[260px] flex items-center justify-center bg-gradient-to-br from-background via-surface to-background relative">

              {/* Glow */}
              <div className="absolute w-40 h-40 bg-primary/20 blur-3xl rounded-full z-0"></div>

              {/* Image (FIXED SAFE) */}
              <SmartImage
                src={resolveImagePath(stone.image)}
                alt={stone.name}
                className="w-full h-full object-contain relative z-[50] transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-primary font-cinzel">
                {stone.hindiName}
              </h3>
              <p className="text-xs text-text-secondary/60 mb-3">
                ({stone.name})
              </p>

              <p className="text-sm text-text-secondary mb-2">
                <strong className="text-text-primary">Planetary Ruler:</strong> {stone.planetaryRuler}
              </p>

              <p className="text-sm text-text-secondary mb-5 line-clamp-3">
                {stone.benefit}
              </p>

              {/* Button */}
              <button className="bg-primary text-background px-6 py-2 rounded-full hover:scale-105 hover:brightness-110 transition font-bold text-xs uppercase tracking-wider">
                INQUIRE
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}