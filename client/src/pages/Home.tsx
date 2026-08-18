/**
 * St. Louis Precision Cast Products - Home Page
 * Design: Industrial Precision — No AI photos
 * Uses real casting images from showcase + geometric blocks + clean typography
 * Navy (#1A365D) + Foundry Red (#C41230) color scheme
 * Roboto Condensed headings, Roboto body
 */

import { useState, useEffect, useRef } from "react";
import { IMAGES } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Factory,
  Cog,
  Shield,
  Award,
  Users,
  Truck,
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  Zap,
  Pickaxe,
  HardHat,
  Wheat,
  Wrench,
  CircleDot,
} from "lucide-react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Materials", href: "#materials" },
  { label: "Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

const CAPABILITIES = [
  "Steel Castings",
  "Gray Iron Castings",
  "Ductile Iron Castings",
  "No-Bake Sand Molding",
  "Patterns",
  "Pattern Tooling Castings",
  "Low-Volume & Prototype Sand Castings",
  "MEEHANITE Licensee",
  "Stress Relieve & Annealing",
  "Ready for Machining",
];

const SERVICES = [
  {
    icon: Factory,
    title: "Short Run Production",
    description: "Economical short-run production castings from 1 to 500 pieces. Ideal for specialized equipment, replacement parts, and limited production runs.",
    image: IMAGES.cast5,
  },
  {
    icon: Cog,
    title: "Rapid Prototyping",
    description: "Rapid prototype development with quick turnaround times. Perfect for testing designs before committing to full production tooling.",
    image: IMAGES.cast10,
  },
  {
    icon: Shield,
    title: "Tooling Solutions",
    description: "Complete pattern and tooling services including design assistance, pattern storage, and maintenance for repeat orders. Near-net-shape casting.",
    image: IMAGES.cast1,
  },
];

const ALLOY_CATEGORIES = [
  {
    name: "MEEHANITE® Irons",
    description: "Full complement of licensed MEEHANITE® irons with controlled graphite structure for superior mechanical properties.",
    alloys: ["Gray Iron", "Ductile Iron", "Wear Resistant"],
    image: IMAGES.cast14,
  },
  {
    name: "Abrasion Resistant White Irons",
    description: "Extremely hard irons designed for high-wear applications in mining, aggregate, and material handling.",
    alloys: ["NiHard", "ASTM A532 IIB", "ASTM A532 IIIA"],
    image: IMAGES.cast19,
  },
  {
    name: "Ni-Resist Irons",
    description: "Austenitic nickel-alloyed ductile irons with excellent corrosion and heat resistance.",
    alloys: ["ASTM A439 D-2", "ASTM A439 D-5"],
    image: IMAGES.cast3,
  },
  {
    name: "Carbon & Low Alloy Steels",
    description: "Versatile steel castings for structural and mechanical applications requiring strength and toughness.",
    alloys: ["10XX Series", "WCB", "41XX Series", "86XX Series"],
    image: IMAGES.cast5,
  },
  {
    name: "Tool Steels",
    description: "High-performance tool steels for die casting, forging dies, and tooling applications.",
    alloys: ["H13", "D2"],
    image: IMAGES.cast12,
  },
  {
    name: "Stainless Steel & Bronze",
    description: "Corrosion-resistant alloys for demanding environments and specialized applications.",
    alloys: ["300 Series SS", "400 Series SS", "C87500 Bronze"],
    image: IMAGES.cast8,
  },
];

const INDUSTRIES = [
  { name: "Energy & Power", icon: Zap },
  { name: "Mining & Aggregate", icon: Pickaxe },
  { name: "Construction", icon: HardHat },
  { name: "Agriculture", icon: Wheat },
  { name: "Machine Tool", icon: Wrench },
  { name: "Pump & Valve", icon: CircleDot },
];

const STATS = [
  { value: "55+", label: "Years of Excellence" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [submitting, setSubmitting] = useState(false);

  // Submits to Netlify Forms — see the hidden "quote-request" form in index.html.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("form-name", "quote-request");
    setSubmitting(true);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      if (!res.ok) throw new Error();
      toast.success("Thank you for your inquiry! We'll respond within 24 hours.");
      formRef.current?.reset();
    } catch {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-navy-dark text-white py-2.5 text-sm hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="text-gray-300 text-xs uppercase tracking-wider">Serving American Industry Since 1970</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300 text-xs uppercase tracking-wider">MEEHANITE® Licensee</span>
          </div>
          <a href="tel:314-849-4080" className="flex items-center gap-2 hover:text-gray-300 transition-colors font-medium">
            <Phone className="w-4 h-4" />
            314-849-4080
          </a>
        </div>
      </div>

      {/* Navigation */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "border-b border-gray-200"}`} role="banner">
        <div className="container">
          <nav className="flex items-center justify-between py-4">
            <a href="#" className="flex items-center gap-3">
              <img src={IMAGES.logo} alt="St. Louis Precision Cast Products - Sand Casting Foundry" className="h-14 w-auto" />
              <div className="hidden sm:block">
                <div className="font-display text-lg font-bold text-navy uppercase tracking-wider leading-tight">
                  St. Louis Precision
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-[0.25em]">
                  Cast Products
                </div>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-foundry-red transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="ml-4 px-6 py-2.5 bg-foundry-red text-white text-sm font-bold uppercase tracking-wide hover:bg-foundry-red-dark transition-colors"
              >
                Get a Quote
              </a>
            </div>

            <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="lg:hidden pb-4">
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <a key={link.label} href={link.href} className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 uppercase tracking-wide" onClick={() => setMobileMenuOpen(false)}>
                    {link.label}
                  </a>
                ))}
                <a href="#contact" className="mx-4 mt-2 px-6 py-3 bg-foundry-red text-white text-sm font-bold uppercase tracking-wide text-center" onClick={() => setMobileMenuOpen(false)}>
                  Get a Quote
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-navy overflow-hidden">
        {/* Geometric pattern background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        <div className="container relative z-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left sidebar — Logo and tagline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 hidden lg:flex flex-col items-center"
            >
              <img src={IMAGES.logo} alt="St. Louis Precision Cast Products" className="w-24 h-auto mb-6" />
              <div className="text-center">
                <div className="font-display text-sm font-bold text-white uppercase tracking-wider mb-2">
                  St. Louis Precision
                </div>
                <div className="text-xs text-gray-300 uppercase tracking-[0.25em] mb-4">
                  Cast Products
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  Since 1970
                </div>
              </div>
            </motion.div>

            {/* Center content — 3 cols */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 text-white"
            >
              <div className="inline-block bg-foundry-red px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
                Speciality Foundry Since 1970
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.1] mb-6">
                Dedicated to<br />
                <span className="text-foundry-red">Quality Metal Casting</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                St. Louis Precision Cast Products St. Louis Precision Cast Products has been serving American industry since 1970. We specialize in gray iron castings, ductile iron castings, and steel castings, as well as short runs and prototypes with quick turnaround.
              </p>

              {/* Bullet points grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-10">
                {CAPABILITIES.map((cap, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 bg-foundry-red rounded-full flex-shrink-0" />
                    <span className="text-sm text-gray-200">{cap}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-foundry-red text-white font-bold uppercase tracking-wide hover:bg-foundry-red-dark transition-colors"
                >
                  Request Quote
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold uppercase tracking-wide hover:bg-white/10 transition-colors"
                >
                  Our Services
                </a>
              </div>
            </motion.div>

            {/* Right sidebar — Our Products card — 1 col */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 hidden lg:block"
            >
              <div className="bg-white p-8 shadow-2xl">
                <h3 className="font-display text-xl text-navy uppercase mb-2">
                  Our Products
                </h3>
                <div className="w-full h-1 bg-foundry-red mb-6" />

                <div className="space-y-5">
                  {SERVICES.map((service, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-foundry-red/10 flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-6 h-6 text-foundry-red" />
                      </div>
                      <div>
                        <h4 className="font-display text-sm text-navy uppercase font-bold">{service.title}</h4>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {i === 0 ? "Small batch casting solutions" : i === 1 ? "Quick turnaround times" : "Near-net-shape casting"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-foundry-red text-white font-bold uppercase tracking-wide hover:bg-foundry-red-dark transition-colors"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom red accent line */}
        <div className="h-1 bg-foundry-red" />
      </section>

      {/* ===== TRUST SIGNAL BAR ===== */}
      <section className="bg-light-gray py-10 border-b border-gray-200">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="font-display text-4xl md:text-5xl font-black text-navy mb-2">55+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Years of Excellence</div>
            </motion.div>
            <div className="hidden md:block w-px h-12 bg-gray-300" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="font-display text-lg md:text-xl font-bold text-navy uppercase tracking-wide">MEEHANITE® Licensee</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Certified Foundry</div>
            </motion.div>
            <div className="hidden md:block w-px h-12 bg-gray-300" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="font-display text-lg md:text-xl font-bold text-navy uppercase tracking-wide">Made in the USA</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">St. Louis, Missouri</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="py-20 bg-white" aria-label="About St. Louis Precision Cast Products">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-xs font-bold text-foundry-red uppercase tracking-widest mb-4">
                About Us
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-navy uppercase mb-6 leading-tight">
                Your Sand Casting<br />Foundry
              </h2>
              <div className="w-16 h-1 bg-foundry-red mb-6" />
              <p className="text-gray-600 mb-6 leading-relaxed">
                St. Louis Precision Cast Products has been a cornerstone of American manufacturing since 1970. As a licensed MEEHANITE® foundry, we specialize in producing high-quality gray iron and ductile iron castings for industries ranging from energy to agriculture. In addition to MEEHANITE® irons we also pour low-alloy steels and stainless steels.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our no-bake molding process and air-set sand molds enable us to deliver quality castings with excellent surface finish and dimensional accuracy. We use MAGMA simulation software for full engineering analysis, ensuring optimal results before the first pour. Whether you need a single prototype or a short-run we have the expertise to deliver.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "No-Bake Molding",
                  "Traditional Patterns",
                  "Pattern Storage",
                  "MAGMA Simulation",
                  "Casting Weight Up To 2,000 lbs",
                  "Quality Inspection",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-foundry-red flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-foundry-red font-bold uppercase tracking-wide hover:gap-4 transition-all"
              >
                Request a Quote
                <ChevronRight className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Right side — Real casting images grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-light-gray p-6 flex items-center justify-center aspect-square">
                  <img src={IMAGES.cast10} alt="Sand casting - valve body" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
                <div className="bg-light-gray p-6 flex items-center justify-center aspect-square">
                  <img src={IMAGES.cast5} alt="Sand casting - bearing housing" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
                <div className="bg-light-gray p-6 flex items-center justify-center aspect-square">
                  <img src={IMAGES.cast1} alt="Sand casting - automotive tooling" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
                <div className="bg-navy p-6 flex items-center justify-center aspect-square relative">
                  <div className="text-center text-white">
                    <div className="font-display text-5xl font-black">55+</div>
                    <div className="text-sm uppercase tracking-wider mt-2">Years of<br />Excellence</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="py-20 bg-light-gray" aria-label="Our Casting Services">
        <div className="container">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-foundry-red uppercase tracking-widest mb-4">
              What We Offer
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-navy uppercase mb-4">
              Our Casting Services
            </h2>
            <div className="w-16 h-1 bg-foundry-red mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              From initial concept to finished casting, we provide comprehensive services 
              to meet your casting needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full bg-white border-0 shadow-sm hover:shadow-lg transition-shadow group overflow-hidden">
                  <CardContent className="p-0">
                    {/* Casting image on light background */}
                    <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-8 flex items-center justify-center h-56">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <div className="w-12 h-12 bg-foundry-red/10 mb-4 flex items-center justify-center group-hover:bg-foundry-red transition-colors">
                        <service.icon className="w-6 h-6 text-foundry-red group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-display text-xl text-navy uppercase mb-3">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MATERIALS SECTION ===== */}
      <section id="materials" className="py-20 bg-white" aria-label="Alloys and Materials We Pour">
        <div className="container">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-foundry-red uppercase tracking-widest mb-4">
              Alloys & Materials
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-navy uppercase mb-4">
              Metals We Pour
            </h2>
            <div className="w-16 h-1 bg-foundry-red mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              We pour a comprehensive range of ferrous and non-ferrous alloys to meet your specific application requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALLOY_CATEGORIES.map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-light-gray hover:bg-white hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="flex">
                  {/* Casting image thumbnail */}
                  <div className="w-28 flex-shrink-0 bg-white p-3 flex items-center justify-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-5 flex-1">
                    <h3 className="font-display text-sm text-navy uppercase mb-2 leading-tight">{category.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">{category.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {category.alloys.map((alloy: string, j: number) => (
                        <span key={j} className="text-xs bg-navy/5 border border-navy/10 px-2 py-0.5 text-navy/70 font-medium">
                          {alloy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CASTING SHOWCASE STRIP ===== */}
      <section className="bg-navy py-16" aria-label="Casting Showcase">
        <div className="container">
          <div className="text-center mb-12">
            <div className="text-xs font-bold text-foundry-red uppercase tracking-widest mb-4">
              Casting Showcase
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white uppercase mb-4">
              Recent Work
            </h2>
            <div className="w-16 h-1 bg-foundry-red mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: IMAGES.cast1, label: "Automotive Tooling" },
              { img: IMAGES.cast8, label: "Steel Permanent Mold" },
              { img: IMAGES.cast10, label: "Iron Housing" },
              { img: IMAGES.cast19, label: "Bearing Housing" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur p-6 flex items-center justify-center h-48 hover:bg-white/15 transition-colors">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="max-h-full max-w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center mt-3">
                  <span className="text-sm text-gray-300 uppercase tracking-wider">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="text-xs font-bold text-foundry-red uppercase tracking-widest mb-4">
              Industries We Serve
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-navy uppercase mb-4">
              Trusted Across Industries
            </h2>
            <div className="w-16 h-1 bg-foundry-red mx-auto mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our castings serve critical applications across diverse industries, 
              from heavy construction equipment to precision machine tools.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {INDUSTRIES.map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-light-gray p-6 text-center hover:bg-navy hover:text-white transition-colors group cursor-default"
              >
                <div className="w-14 h-14 mx-auto mb-3 bg-white flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <industry.icon className="w-7 h-7 text-foundry-red group-hover:text-white transition-colors" />
                </div>
                <div className="text-sm font-medium text-navy group-hover:text-white transition-colors">{industry.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUALITY SECTION ===== */}
      <section id="quality" className="py-20 bg-light-gray" aria-label="Quality Assurance">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-xs font-bold text-foundry-red uppercase tracking-widest mb-4">
                Quality Assurance
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-navy uppercase mb-6">
                Commitment to Excellence
              </h2>
              <div className="w-16 h-1 bg-foundry-red mb-6" />
              <p className="text-gray-600 mb-8 leading-relaxed">
                Quality is at the heart of everything we do. Our comprehensive quality management 
                system ensures every casting meets or exceeds your specifications. With MAGMA simulation 
                technology, we optimize designs before production begins.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Dimensional Inspection", desc: "Precision measurement and verification of all critical dimensions" },
                  { title: "Material Testing", desc: "Chemical analysis and mechanical property verification" },
                  { title: "MAGMA Simulation", desc: "Full engineering analysis with advanced casting simulation software" },
                  { title: "Documentation", desc: "Complete traceability and certification for all castings" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white">
                    <CheckCircle2 className="w-6 h-6 text-foundry-red flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display text-sm text-navy uppercase mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right side — casting images + MEEHANITE badge */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 flex items-center justify-center aspect-square shadow-sm">
                  <img src={IMAGES.cast8} alt="Steel casting" className="max-h-full max-w-full object-contain drop-shadow-md" />
                </div>
                <div className="bg-white p-6 flex items-center justify-center aspect-square shadow-sm">
                  <img src={IMAGES.cast12} alt="H13 insert casting" className="max-h-full max-w-full object-contain drop-shadow-md" />
                </div>
              </div>
              <div className="bg-white p-6 flex items-center gap-6 shadow-sm">
                <img
                  src={IMAGES.meehaniteBadge}
                  alt="MEEHANITE Licensed Foundry"
                  className="w-24 h-24 object-contain flex-shrink-0"
                />
                <div>
                  <h4 className="font-display text-sm text-navy uppercase mb-1">
                    MEEHANITE® Licensed Foundry
                  </h4>
                  <p className="text-sm text-gray-600">
                    Certified to produce MEEHANITE® controlled iron castings with superior mechanical properties and consistent quality.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 bg-foundry-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-white uppercase mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
              Contact us today for a quote on your casting needs. 
              Our team is ready to help bring your designs to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-foundry-red font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="tel:314-849-4080"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wide hover:bg-white hover:text-foundry-red transition-colors"
              >
                <Phone className="w-5 h-5" />
                314-849-4080
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-20 bg-white" aria-label="Contact Us and Request a Quote">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-xs font-bold text-foundry-red uppercase tracking-widest mb-4">
                Get In Touch
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-navy uppercase mb-6">
                Contact Us
              </h2>
              <div className="w-16 h-1 bg-foundry-red mb-6" />
              <p className="text-gray-600 mb-8 leading-relaxed">
                Have questions about our casting services? Ready to request a quote? 
                Our team is here to help. Reach out today and let's discuss your project.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  { icon: MapPin, title: "Address", content: "10922 Gravois Industrial Court\nSt. Louis, MO 63128-2032" },
                  { icon: Phone, title: "Phone", content: "314-849-4080", href: "tel:314-849-4080" },
                  { icon: Mail, title: "Email", content: "info@oneoffcastings.com", href: "mailto:info@oneoffcastings.com" },
                  { icon: Clock, title: "Business Hours", content: "Monday - Friday: 7:00 AM - 4:00 PM CST" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-foundry-red" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm text-navy uppercase mb-1">{item.title}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-gray-600 hover:text-foundry-red transition-colors whitespace-pre-line">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 whitespace-pre-line">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-100 flex items-center gap-4">
                <img src={IMAGES.meehaniteBadge} alt="MEEHANITE" className="w-20 h-20 object-contain" />
                <div>
                  <h4 className="font-display text-sm text-navy uppercase mb-1">MEEHANITE® Licensed Foundry</h4>
                  <p className="text-sm text-gray-600">Certified to produce MEEHANITE® controlled iron castings</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-50 p-8 lg:p-10">
                <h3 className="font-display text-xl text-navy uppercase mb-6">
                  Request a Quote
                </h3>
                <form
                  ref={formRef}
                  name="quote-request"
                  method="POST"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="quote-request" />
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <Input name="name" type="text" required placeholder="Your name" className="bg-white border-gray-300 focus:border-foundry-red" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <Input name="company" type="text" placeholder="Company name" className="bg-white border-gray-300 focus:border-foundry-red" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <Input name="email" type="email" required placeholder="your@email.com" className="bg-white border-gray-300 focus:border-foundry-red" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <Input name="phone" type="tel" placeholder="(555) 555-5555" className="bg-white border-gray-300 focus:border-foundry-red" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Details *</label>
                    <Textarea
                      name="projectDetails"
                      required
                      rows={5}
                      placeholder="Please describe your casting requirements, including material type, quantity, dimensions, and any special requirements..."
                      className="bg-white border-gray-300 focus:border-foundry-red"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-foundry-red hover:bg-foundry-red-dark text-white font-bold uppercase tracking-wide py-6 disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Submit Request"}
                    {!submitting && <ArrowRight className="w-5 h-5 ml-2" />}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-navy-dark text-white py-16" role="contentinfo" aria-label="Site Footer">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-foundry-red flex items-center justify-center flex-shrink-0">
                  <Factory className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold uppercase tracking-wider leading-tight">St. Louis Precision</div>
                  <div className="text-xs text-gray-400 uppercase tracking-[0.25em]">Cast Products</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Serving American industry with precision sand castings since 1970. 
                MEEHANITE® licensed foundry specializing in gray iron and ductile iron castings.
              </p>
            </div>

            <div>
              <h4 className="font-display text-sm uppercase tracking-wider mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm uppercase tracking-wider mb-6">Capabilities</h4>
              <ul className="space-y-3">
                {["Gray Iron Castings", "Ductile Iron Castings", "Pattern Tooling", "Prototype Castings", "MEEHANITE® Irons"].map((s) => (
                  <li key={s}><span className="text-gray-400 text-sm">{s}</span></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm uppercase tracking-wider mb-6">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="/blog" className="hover:text-white transition-colors">Blog & Articles</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display text-sm uppercase tracking-wider mb-6">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>10922 Gravois Industrial Court</li>
                <li>St. Louis, MO 63128-2032</li>
                <li><a href="tel:314-849-4080" className="hover:text-white transition-colors">314-849-4080</a></li>
                <li><a href="mailto:info@oneoffcastings.com" className="hover:text-white transition-colors">info@oneoffcastings.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} St. Louis Precision Cast Products. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>MEEHANITE® Licensed Foundry</span>
              <span>|</span>
              <span>Made in USA</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
