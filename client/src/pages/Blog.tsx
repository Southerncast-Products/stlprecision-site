import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Search, Calendar, User, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "casting-types" | "industry-guides" | "technical" | "comparison";
  author: string;
  date: Date;
  readTime: number;
  image?: string;
  tags: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "gray-iron-guide",
    title: "Gray Iron Castings: Complete Guide for Industrial Applications",
    excerpt: "Learn everything about gray iron castings, from material properties to applications across industries.",
    content: "Gray iron is one of the most widely used casting materials in the world...",
    category: "casting-types",
    author: "STL Precision",
    date: new Date(2026, 1, 10),
    readTime: 8,
    tags: ["gray iron", "castings", "materials"],
  },
  {
    id: "ductile-vs-gray",
    title: "Ductile Iron Castings vs Gray Iron: Which Should You Choose?",
    excerpt: "Comprehensive comparison of ductile iron and gray iron for your casting needs.",
    content: "Choosing between ductile iron and gray iron depends on several factors...",
    category: "comparison",
    author: "STL Precision",
    date: new Date(2026, 1, 8),
    readTime: 10,
    tags: ["ductile iron", "gray iron", "comparison"],
  },
  {
    id: "pattern-tooling",
    title: "Pattern Tooling Castings: Design, Capabilities, and Lead Times",
    excerpt: "Everything you need to know about pattern tooling castings for tool and die applications.",
    content: "Pattern tooling castings are essential for tool shops and manufacturers...",
    category: "casting-types",
    author: "STL Precision",
    date: new Date(2026, 1, 5),
    readTime: 7,
    tags: ["pattern tooling", "tooling", "design"],
  },
  {
    id: "prototype-castings",
    title: "Prototype Castings: Fast Turnaround Sand Casting Solutions",
    excerpt: "Accelerate your product development with rapid prototype casting services.",
    content: "Prototype castings enable engineers to test designs quickly...",
    category: "casting-types",
    author: "STL Precision",
    date: new Date(2026, 1, 3),
    readTime: 6,
    tags: ["prototyping", "rapid", "sand casting"],
  },
  {
    id: "stainless-steel",
    title: "Stainless Steel Castings for Corrosion-Resistant Applications",
    excerpt: "Explore stainless steel casting options for demanding environments.",
    content: "Stainless steel castings offer superior corrosion resistance...",
    category: "casting-types",
    author: "STL Precision",
    date: new Date(2026, 0, 28),
    readTime: 9,
    tags: ["stainless steel", "corrosion resistant", "applications"],
  },
  {
    id: "magma-simulation",
    title: "MAGMA Simulation in Casting: How Advanced Modeling Improves Quality",
    excerpt: "Discover how MAGMA simulation technology ensures casting quality and reduces defects.",
    content: "MAGMA simulation is a powerful tool for optimizing casting processes...",
    category: "technical",
    author: "STL Precision",
    date: new Date(2026, 0, 25),
    readTime: 11,
    tags: ["MAGMA", "simulation", "quality"],
  },
  {
    id: "tool-steel-castings",
    title: "Tool Steel Castings (H13, D2): Heat Treatment and Specifications",
    excerpt: "Master tool steel castings with comprehensive guide to H13 and D2 grades and heat treatment.",
    content: "Tool steel castings provide the hardness and toughness required for demanding manufacturing applications...",
    category: "casting-types",
    author: "STL Precision",
    date: new Date(2026, 1, 15),
    readTime: 9,
    tags: ["tool steel", "H13", "D2", "heat treatment"],
  },
  {
    id: "ni-resist-castings",
    title: "Ni-Resist Iron Castings for High-Temperature Applications",
    excerpt: "Learn about Ni-Resist D-2 and D-5 castings for extreme temperature and corrosive environments.",
    content: "Ni-Resist iron castings excel in high-temperature and corrosive environments...",
    category: "casting-types",
    author: "STL Precision",
    date: new Date(2026, 1, 14),
    readTime: 8,
    tags: ["Ni-Resist", "high temperature", "corrosion resistant"],
  },
  {
    id: "white-iron-castings",
    title: "Abrasion Resistant White Iron Castings (NiHard, ASTM A532)",
    excerpt: "Discover NiHard and white iron castings engineered for maximum wear resistance in mining and aggregate.",
    content: "Abrasion resistant white iron castings are engineered for maximum wear resistance...",
    category: "casting-types",
    author: "STL Precision",
    date: new Date(2026, 1, 13),
    readTime: 8,
    tags: ["white iron", "NiHard", "abrasion resistant", "ASTM A532"],
  },
  {
    id: "automotive-castings",
    title: "Casting Solutions for Automotive Industry: Materials and Tolerances",
    excerpt: "Explore casting solutions for automotive applications including engines, transmissions, and drivetrain.",
    content: "The automotive industry demands castings that combine precision, reliability, and cost-effectiveness...",
    category: "industry-guides",
    author: "STL Precision",
    date: new Date(2026, 1, 12),
    readTime: 10,
    tags: ["automotive", "engine castings", "tolerances"],
  },
  {
    id: "railroad-castings",
    title: "Railroad Casting Specifications and Standards",
    excerpt: "Master AAR specifications and standards for railroad freight and passenger equipment castings.",
    content: "Railroad castings must meet stringent specifications established by the Association of American Railroads...",
    category: "industry-guides",
    author: "STL Precision",
    date: new Date(2026, 1, 11),
    readTime: 9,
    tags: ["railroad", "AAR standards", "freight cars"],
  },
  {
    id: "construction-equipment",
    title: "Construction Equipment Castings: Durability and Performance",
    excerpt: "Learn about castings for excavators, loaders, and heavy equipment built for harsh environments.",
    content: "Construction equipment operates in harsh environments where durability and reliability are essential...",
    category: "industry-guides",
    author: "STL Precision",
    date: new Date(2026, 1, 10),
    readTime: 8,
    tags: ["construction equipment", "heavy equipment", "durability"],
  },
  {
    id: "energy-sector-castings",
    title: "Energy Sector Castings: Oil & Gas, Power Generation Applications",
    excerpt: "Explore casting solutions for oil & gas, power generation, and renewable energy applications.",
    content: "The energy sector demands castings that perform reliably in extreme conditions...",
    category: "industry-guides",
    author: "STL Precision",
    date: new Date(2026, 1, 9),
    readTime: 10,
    tags: ["energy", "oil and gas", "power generation"],
  },
  {
    id: "sand-vs-die-casting",
    title: "Sand Casting vs Die Casting: When to Use Each Process",
    excerpt: "Comprehensive comparison of sand casting and die casting to help you choose the right process.",
    content: "Sand casting and die casting are both widely used metal casting processes...",
    category: "technical",
    author: "STL Precision",
    date: new Date(2026, 1, 8),
    readTime: 9,
    tags: ["sand casting", "die casting", "process comparison"],
  },
  {
    id: "casting-defect-prevention",
    title: "Casting Defect Prevention: Porosity, Shrinkage, and Cracking",
    excerpt: "Master defect prevention techniques for porosity, shrinkage, and cracking in castings.",
    content: "Casting defects like porosity, shrinkage, and cracking compromise casting quality...",
    category: "technical",
    author: "STL Precision",
    date: new Date(2026, 1, 7),
    readTime: 11,
    tags: ["defects", "porosity", "shrinkage", "quality"],
  },
  {
    id: "meehanite-licensed",
    title: "Why Choose a MEEHANITE Licensed Foundry?",
    excerpt: "Understand the advantages of MEEHANITE certification and quality assurance in casting.",
    content: "MEEHANITE is a quality assurance system for cast iron that ensures consistent material properties...",
    category: "comparison",
    author: "STL Precision",
    date: new Date(2026, 1, 6),
    readTime: 7,
    tags: ["MEEHANITE", "quality assurance", "certification"],
  },
  {
    id: "local-vs-overseas",
    title: "Local Foundry vs Overseas Casting: Cost and Quality Analysis",
    excerpt: "Compare local and overseas casting sourcing to understand total cost of ownership.",
    content: "The decision between sourcing castings from a local foundry or overseas supplier...",
    category: "comparison",
    author: "STL Precision",
    date: new Date(2026, 1, 5),
    readTime: 8,
    tags: ["sourcing", "supply chain", "cost analysis"],
  },
  {
    id: "sustainable-casting",
    title: "Sustainable Casting Practices: Recycled Metal and Environmental Benefits",
    excerpt: "Explore sustainable foundry practices including metal recycling and environmental responsibility.",
    content: "Sustainability is increasingly important in manufacturing. The casting industry has embraced sustainable practices...",
    category: "technical",
    author: "STL Precision",
    date: new Date(2026, 1, 4),
    readTime: 9,
    tags: ["sustainability", "recycled metal", "environment"],
  },
];

const CATEGORIES = [
  { value: "all", label: "All Articles" },
  { value: "casting-types", label: "Casting Types" },
  { value: "industry-guides", label: "Industry Guides" },
  { value: "technical", label: "Technical Resources" },
  { value: "comparison", label: "Comparisons" },
];

export default function Blog() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-12">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-foundry-red hover:text-foundry-red-dark mb-8 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Blog
          </button>

          <article className="max-w-3xl">
            <div className="mb-8">
              <h1 className="font-display text-4xl font-black text-navy mb-4">{selectedPost.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(selectedPost.date, "MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{selectedPost.author}</span>
                </div>
                <span className="text-sm">{selectedPost.readTime} min read</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed text-lg">{selectedPost.content}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedPost.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-16">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-black text-navy mb-4">Blog & Resources</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover industry insights, technical guides, and expert knowledge about casting, materials, and manufacturing processes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPost(post)}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-foundry-red">{post.category.replace("-", " ")}</span>
                  <span className="text-xs text-gray-500">{post.readTime} min</span>
                </div>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{format(post.date, "MMM d")}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-foundry-red" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
