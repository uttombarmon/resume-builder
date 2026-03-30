"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, LayoutTemplate } from "lucide-react";

// Mock templates data for gallery
const templates = [
  { id: 1, name: "Modern Minimalist", category: "Minimal", plays: "125k uses", image: "/templates/1.webp" },
  { id: 2, name: "Executive Professional", category: "Professional", plays: "98k uses", image: "/templates/2.webp" },
  { id: 3, name: "Creative Agency", category: "Creative", plays: "45k uses", image: "/templates/3.webp" },
  { id: 4, name: "Tech Innovator", category: "Modern", plays: "210k uses", image: "/templates/4.webp" },
  { id: 5, name: "Startup Founder", category: "Modern", plays: "82k uses", image: "/templates/5.webp" },
  { id: 6, name: "Academic Scholar", category: "Professional", plays: "34k uses", image: "/templates/6.webp" },
];

const categories = ["All", "Professional", "Modern", "Creative", "Minimal"];

export default function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = activeCategory === "All" || template.category === activeCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="flex overflow-x-auto pb-2 md:pb-0 w-full md:w-auto hide-scrollbar gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-800 rounded-full leading-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-all shadow-sm"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              <div className="aspect-3/4 bg-slate-100 dark:bg-slate-800 relative overflow-hidden flex items-center justify-center p-8">
                {/* Fallback pattern since we don't have real images */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-slate-300 via-transparent to-transparent"></div>
                <LayoutTemplate size={64} className="text-slate-300 dark:text-slate-600 group-hover:scale-110 transition-transform duration-500" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    href={`/editor?template=${template.id}`}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-amber-500/30 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                  >
                    Use Template
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {template.name}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {template.plays}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
          <Filter className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No templates found</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            We couldn't find any templates matching "{searchQuery}" in the {activeCategory} category.
          </p>
          <button 
            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
            className="mt-6 text-amber-600 hover:text-amber-700 font-bold"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
