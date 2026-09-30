// src/lib/seoData.js
import { yearsExperience } from "./i18n";

export const seoData = {
  defaultTitle: "Kyle Romero - Software Engineering Leader",
  defaultDescription:
    `Kyle Romero is a Software Engineering Leader with ${yearsExperience} years experience in IT, based in Jersey City, NJ. Specializing in full-stack development and technical leadership.`,
  defaultImage: "https://kgromero.com/images/og-image.jpg",
  siteUrl: "https://kgromero.com",
  defaultStructuredData: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kyle Romero",
    jobTitle: "Software Engineering Leader",
    url: "https://kgromero.com",
    sameAs: [
      "https://www.linkedin.com/in/kyleromero/",
      "https://github.com/romero927",
    ],
  },
};
