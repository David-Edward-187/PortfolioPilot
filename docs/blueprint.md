# **App Name**: PortfolioPilot

## Core Features:

- Profile Display: Displays the developer's profile information, including name, headshot, and a brief bio.
- Dynamic Resume: Dynamically renders the resume content (education, experience, skills, projects) from the `resume.json` file.
- Contact Form: Presents a contact form with fields for name, email, subject, and message to facilitate direct communication.
- CV Download: Includes a prominent "Download CV" button that links directly to the developer's resume (`mycv.pdf`).
- Resume AI Assistant: Uses a generative AI tool to suggest improvements to the resume, focusing on phrasing and impact, based on uploaded content and target roles. Generates alternative wording to use in the `resume.json` file. This feature uses an LLM to perform reasoning on the user provided resume and target roles to make suggestions; it is a tool.

## Style Guidelines:

- Primary color: Teal (#008080) for a professional and calming feel.
- Secondary color: Light gray (#F0F0F0) for backgrounds to ensure readability.
- Accent color: Coral (#FF7F50) for highlighting interactive elements and calls to action.
- Consistent branding with Teal primary, Coral accent, Light-Gray backgrounds
- Full shade scales for hover/focus states
- Neutral/text/status colors for everything else
- Use clear and professional sans-serif fonts to make the portfolio look good.
- Utilize simple, outline-style icons from a consistent set (e.g., Font Awesome, Material Icons) to represent skills, technologies, and social media links.
- Employ a clean and well-organized layout, ensuring responsiveness across different devices using Tailwind CSS grid and flexbox utilities.
- Implement subtle transition effects and hover animations to add visual interest and enhance user engagement.
- Double-check that all text over Teal and Coral meets WCAG AA (4.5:1) contrast. You might need slightly darker shades for body text or link hover states.
- Include focus-ring styles (e.g. ring-2 ring-primary-300) for keyboard navigation.
- Consider offering a dark-mode toggle. Defining corresponding dark-mode shades (e.g. primary-900 backgrounds, light text) will make it easy.
- Employ a clean and well-organized layout, ensuring responsiveness across different devices using Tailwind CSS grid and flexbox utilities.
- Define a 4-step type scale (e.g. 1.25rem, 1rem, 0.875rem, 0.75rem) so headings and body copy feel cohesive.
- Map Tailwind’s spacing (e.g. p-4, p-6) to your design tokens for margins, gutters, and section padding.
- Standardize on a 24 px grid with 2 px stroke icons to keep everything visually balanced.
- Accessibility Contrast Ratios: Run your Teal and Coral against white/text overlays in a contrast checker to ensure WCAG AA (4.5:1). If needed, swap in the 600–700 shades for body text or link hovers.
- Keyboard Focus: Standardize on ring-2 ring-primary-300 (or a high-contrast variant in dark mode) so interactive elements are always obvious when tabbing.
- You’ve flagged it—great. Next: define your dark-mode tokens (e.g. primary-900 for backgrounds, secondary-50 for cards) and wire up a toggle switch or system-prefers setting.
- Validation & Feedback: Specify inline error messages, loading states, and success toasts for both the Contact Form and AI suggestions.
- Resume AI Workflow: Clarify how users import their existing resume (PDF-to-text extraction? Markdown?), how suggestions are applied (auto-inject vs. manual copy-paste), and whether past suggestion versions are stored for comparison.
- Add a note on environment-variable management (EmailJS keys, LLM API creds), plus a simple GitHub Actions or Vercel/Netlify CI pipeline for lint→test→deploy.
- Even a lightweight integration (Plausible, Google Analytics) will let you measure form submissions, CV downloads, and AI feature usage.
- Error-reporting (Sentry, LogRocket) will catch front-end exceptions before they reach users.
- Lock in a 24 px icon grid with 2 px strokes so your icons always align neatly with text baselines and padding.
- Use your 1.25 rem → 0.75 rem scale consistently: H1/H2 at 1.25 rem, H3/H4 at 1 rem, body at 0.875 rem, captions at 0.75 rem.
- Ensure that p-4, p-6, m-4, etc., map directly to your design-token values so there’s no guesswork when adding sections or cards.