// Change this to rename the site everywhere (navbar, footer, titles)
export const SITE_NAME = "TechPulse";

// Blogs have no category field in the database, so we detect one
// from the title + description. This only changes the label on the cards.
const CATEGORY_RULES = [
  [
    "AI",
    /\b(ai|artificial intelligence|machine learning|ml|llms?|gpt|chatgpt|claude|neural|deep learning|generative)\b/i,
  ],
  [
    "Security",
    /\b(secur\w*|cyber\w*|hacking|encryption|privacy|vulnerabilit\w*)\b/i,
  ],
  [
    "Backend",
    /\b(node\.?js|node|express|apis?|backend|back-end|server|mongodb|mongoose|database|sql|mysql|rest)\b/i,
  ],
  [
    "Cloud",
    /\b(cloud|aws|azure|docker|kubernetes|devops|deploy\w*|serverless)\b/i,
  ],
  [
    "Web Dev",
    /\b(react|vue|angular|next\.?js|html|css|tailwind|frontend|front-end|web|javascript|js|ui|ux)\b/i,
  ],
  [
    "Programming",
    /\b(code|coding|programming|python|java|typescript|algorithms?|developer|software|git|github)\b/i,
  ],
];

export const getCategory = (blog) => {
  const text = `${blog.title || ""} ${blog.description || ""}`;
  for (const [name, pattern] of CATEGORY_RULES) {
    if (pattern.test(text)) return name;
  }
  return "Technology";
};

export const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const readTime = (text = "") => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export const hashString = (str = "") => {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};
