import {
  Activity, ScanFace, Sparkles, Smile, ShieldCheck, Heart, Lightbulb, Wand2,
  type LucideIcon
} from "lucide-react";

export type AppItem = {
  slug: string;
  name: string;
  domain: string;
  tagline: string;
  category: string;
  icon: LucideIcon;
  description: string;
  functionalities: { title: string; desc: string }[];
  benefits: string[];
  quote: string;
};

export const APPS: AppItem[] = [
  {
    slug: "mednux",
    name: "Mednux.ai",
    domain: "mednux.ai",
    tagline: "Medical Operations & Healthcare Intelligence",
    category: "Healthcare Intelligence",
    icon: Activity,
    description:
      "A smart platform designed to streamline healthcare operations, improve visibility, and support intelligent decision-making.",
    functionalities: [
      { title: "Operational Intelligence", desc: "Smart oversight of healthcare workflows and activity." },
      { title: "Workflow Coordination", desc: "Smoother patient, staff, and service coordination." },
      { title: "Performance Visibility", desc: "Real-time dashboards, metrics, and tracking." },
      { title: "Decision Support", desc: "Data-guided operational and clinical support insights." },
    ],
    benefits: ["Improves Efficiency", "Reduces Operational Gaps", "Supports Better Planning", "Enhances Service Quality"],
    quote: "Smarter healthcare operations start with intelligent visibility and coordination.",
  },
  {
    slug: "dermascope",
    name: "DermaScope.ai",
    domain: "dermascope.ai",
    tagline: "AI Dermatology & Skin Intelligence",
    category: "Advanced Skin Analysis",
    icon: ScanFace,
    description:
      "An intelligent platform that helps physicians assess, document, and understand skin findings with greater precision.",
    functionalities: [
      { title: "Skin Assessment", desc: "Intelligent review of visible skin findings." },
      { title: "Lesion Documentation", desc: "Clear image-based clinical documentation." },
      { title: "Comparative Tracking", desc: "Follow-up comparison over time." },
      { title: "Clinical Support Insights", desc: "Smart, supportive dermatology intelligence." },
    ],
    benefits: ["Supports Earlier Detection", "Enhances Diagnostic Confidence", "Improves Documentation", "Saves Clinical Time"],
    quote: "Sharper skin intelligence helps clinicians see more, compare better, and act faster.",
  },
  {
    slug: "skintrix360",
    name: "Skintrix360.ai",
    domain: "skintrix360.ai",
    tagline: "Skin & Aesthetic Intelligence Platform",
    category: "360° Skin Intelligence",
    icon: Sparkles,
    description:
      "A 360-degree platform for skin analysis, aesthetic insight, and treatment-oriented planning.",
    functionalities: [
      { title: "360 Skin Analysis", desc: "Comprehensive multi-angle skin evaluation." },
      { title: "Aesthetic Mapping", desc: "Clearer visualization of skin and beauty concerns." },
      { title: "Treatment Planning", desc: "Guided support for aesthetic decisions." },
      { title: "Progress Monitoring", desc: "Structured follow-up and comparison." },
    ],
    benefits: ["Personalized Recommendations", "Better Aesthetic Planning", "Clearer Patient Communication", "Stronger Treatment Follow-Up"],
    quote: "360° skin intelligence transforms aesthetic planning into a smarter experience.",
  },
  {
    slug: "jmali",
    name: "Jmali.ai",
    domain: "jmali.ai",
    tagline: "Beauty, Wellness & Media Intelligence",
    category: "Smart Beauty Discovery",
    icon: Wand2,
    description:
      "A smart platform that blends beauty insight, wellness direction, and digital media intelligence into one refined experience.",
    functionalities: [
      { title: "Beauty Insights", desc: "Smart beauty and skincare intelligence." },
      { title: "Wellness Intelligence", desc: "Refined wellness-oriented guidance support." },
      { title: "Media Direction", desc: "Stronger content and message structuring." },
      { title: "Engagement Support", desc: "Smarter connection with audiences and users." },
    ],
    benefits: ["Stronger Brand Communication", "Smarter Content Planning", "Better User Connection", "Enhanced Market Presence"],
    quote: "Beauty intelligence becomes more powerful when insight, wellness, and media work together.",
  },
  {
    slug: "niomi",
    name: "NIOMI",
    domain: "niomi.ai",
    tagline: "Intelligent Wellness Companion",
    category: "AI Assistant Reimagined",
    icon: Heart,
    description:
      "A smart companion designed to support healthier choices, wellness journeys, and daily lifestyle guidance.",
    functionalities: [
      { title: "Wellness Guidance", desc: "Daily support for healthier routines." },
      { title: "Lifestyle Tracking", desc: "Clearer visibility of wellness activity." },
      { title: "Personalized Reminders", desc: "Intelligent support for consistency." },
      { title: "Journey Insights", desc: "Meaningful progress-oriented wellness feedback." },
    ],
    benefits: ["Supports Healthier Habits", "Encourages Consistency", "Personalizes Wellness Support", "Enhances User Engagement"],
    quote: "Wellness becomes more sustainable when intelligent support feels personal.",
  },
  {
    slug: "universalproof",
    name: "UniversalProof.com",
    domain: "universalproof.com",
    tagline: "Documentation, Verification & Proof Intelligence",
    category: "Identity Verification",
    icon: ShieldCheck,
    description:
      "A secure platform built to structure, verify, and strengthen digital proof and documentation workflows.",
    functionalities: [
      { title: "Document Structuring", desc: "Organized and intelligent record preparation." },
      { title: "Verification Support", desc: "Stronger validation and trust workflows." },
      { title: "Evidence Organization", desc: "Clearer proof and reference management." },
      { title: "Audit-Ready Records", desc: "Structured documentation for confidence and compliance." },
    ],
    benefits: ["Increases Trust", "Improves Accuracy", "Strengthens Compliance", "Simplifies Documentation"],
    quote: "Proof intelligence turns documentation into a stronger asset of trust and verification.",
  },
  {
    slug: "acneskin",
    name: "AcneSkin.ai",
    domain: "acneskin.ai",
    tagline: "Acne-Focused Skin Education & Intelligence",
    category: "Acne & Skin Solutions",
    icon: Lightbulb,
    description:
      "A focused platform designed to educate, analyze, and support smarter acne-related skin understanding.",
    functionalities: [
      { title: "Acne Education", desc: "Simple and useful knowledge for better skin understanding." },
      { title: "Skin Condition Insights", desc: "Focused acne-related analysis support." },
      { title: "Care Journey Guidance", desc: "Structured support for clearer next steps." },
      { title: "Visual Tracking", desc: "Comparison and progress visibility over time." },
    ],
    benefits: ["Improves Understanding", "Supports Better Awareness", "Encourages Consistent Care", "Simplifies Skin Learning"],
    quote: "Clear acne intelligence helps users understand skin better and act with more confidence.",
  },
  {
    slug: "acneface",
    name: "AcneFace.ai",
    domain: "acneface.ai",
    tagline: "Acne & Facial Skin Intelligence Application",
    category: "Acne Facial Analysis",
    icon: Smile,
    description:
      "An intelligent facial skin platform focused on acne visibility, facial-zone analysis, and clearer care insights.",
    functionalities: [
      { title: "Facial Zone Analysis", desc: "Clearer mapping of acne-prone areas." },
      { title: "Acne Pattern Recognition", desc: "Smart visibility of facial skin patterns." },
      { title: "Progress Comparison", desc: "Before-and-after or follow-up comparison support." },
      { title: "Care Support Insights", desc: "Meaningful guidance-oriented skin intelligence." },
    ],
    benefits: ["Better Facial Clarity", "More Targeted Guidance", "Easier Monitoring", "Stronger User Confidence"],
    quote: "Facial skin intelligence helps turn acne insight into clearer next steps.",
  },
];
