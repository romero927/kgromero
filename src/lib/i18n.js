import { writable } from "svelte/store";

export const locale = writable("en");

// Started professionally in mid-2007; computed so the site never goes stale.
// Pages are prerendered, so this refreshes on every deploy.
const CAREER_START_YEAR = 2007;
export const yearsExperience = `${new Date().getFullYear() - CAREER_START_YEAR}+`;

const translations = {
  en: {
    name: "Kyle Romero",
    description: `Software Engineering Leader with ${yearsExperience} years experience in IT, living in Jersey City, NJ.`,
    aboutMe: {
      title: "About Me",
      content:
        `Currently Team Lead at Tenna, a construction B2B SaaS company acquired by John Deere, where I own the integrations domain. Hands-on across cloud architecture, full-stack development, DevOps, and project management.`,
    },
    contactInfo: {
      title: "Contact Info",
      phone: "+1 (281) 857-9006",
      email: "kgromero@gmail.com",
      linkedin: "https://www.linkedin.com/in/kyleromero/",
      github: "https://github.com/romero927",
      linktree: "Linktree",
    },
    experience: {
      title: "Experience",
      timeline: [
        { date: "Oct 2025 — Current", title: "Team Lead, Tenna" },
        {
          date: "Mar 2025 — Oct 2025",
          title: "Contractor, Dexian (Client: Deloitte Consulting)",
        },
        {
          date: "Mar 2023 — May 2024",
          title: "Director of Software Development, Raymour & Flanigan",
        },
        {
          date: "Apr 2021 — Mar 2023",
          title: "Director of Operations Technology, MEARS Group",
        },
        {
          date: "Mar 2020 — Apr 2021",
          title: "Senior Manager of Operations Technology, MEARS Group",
        },
        {
          date: "Oct 2017 — Mar 2020",
          title: "Manager of Operations Technology, MEARS Group",
        },
        {
          date: "Apr 2016 — Oct 2017",
          title: "Team Lead, Worldwide Machinery",
        },
        { date: "Dec 2013 — Feb 2016", title: "Technical Lead, HP" },
        { date: "Dec 2011 — Dec 2013", title: "Senior Developer, HP" },
        {
          date: "Jul 2007 — Dec 2011",
          title: "Software Developer, X-Fab, Texas",
        },
        {
          date: "May 2007 — Jul 2007",
          title: "Software Development Intern, X-Fab, Texas",
        },
        {
          date: "May 2005 — Dec 2009",
          title:
            "Bachelor of Science in Computer Engineering, Texas Tech University",
        },
      ],
    },
    skills: {
      title: "Skills",
      companies: [
        {
          name: "Tenna (Construction Technology Industry)",
          url: "https://tenna.com",
          techStack:
            "AWS (EKS, Aurora, ElastiCache, S3, Lambda, SQS, DynamoDB, DMS, Kinesis), K8s, Helm, Docker, FluxCD (GitOps), Istio, GitHub Actions, Hapi, Express, Sequelize, React, Redux (Toolkit), SingleSpa (Micro-UI), RabbitMQ, Postgres, Redis, Elasticsearch, Grafana, Prometheus, Tempo, OpenTelemetry, Papertrail, GitHub, JIRA, Confluence, Claude.",
        },
        {
          name: "Dexian (Staffing, IT Services, and Workforce Solutions)",
          url: "https://dexian.com",
          client: "Deloitte Consulting",
          client_url: "https://deloitte.com",
          techStack:
            "Azure Cloud, Containerized Node Express API (Azure App Services), .NET Microservices (Azure Functions), Angular F.E., SAP / CC&B B.E., Tibco + Boomi Data Integrations, Redis Cache, CosmosDB, MS-SQL DB (Azure), Azure DevOps, Confluence.",
        },
        {
          name: "Raymour & Flanigan (Retail Industry)",
          url: "https://www.raymourflanigan.com",
          techStack:
            "React, .NET (C#, UWP, ASP.NET Core), SQL Server, Oracle DB, Azure, AWS, Windows Server, Git (Azure DevOps), Boomi, Snowflake.",
        },
        {
          name: "MEARS Group (Energy Industry)",
          url: "https://www.mears.net",
          techStack:
            ".NET (C#, ASP.NET Core, Blazor), SQL Server, Sqlite3, Azure / Windows Server, JavaScript (Angular / Node / Electron), Git (Azure DevOps), PowerBI, PowerAutomate, Java (Spring Boot), Python, Raspberry Pi.",
        },
        {
          name: "Worldwide Machinery (Construction Industry)",
          url: "https://www.wwmach.com",
          techStack:
            ".NET (C#, ASP.NET MVC API, WinForms), React, Redux, Typescript (ES6), Node.js, Express, SASS, SQL Server, DigitalOcean, Docker, JIRA, TeamCity, Bitbucket, Ubuntu, Windows Server.",
        },
        {
          name: "HP Inc. (Consumer Electronics Industry)",
          url: "https://www.hp.com",
          techStack:
            ".NET (VB.NET, C#, ASP.NET), jQueryUI, jQuery, SQL Server, Tableau, Hadoop, Hive, HP Vertica, TFS, Subversion, Visual Studio, Windows Server.",
        },
        {
          name: "X-Fab, Texas (Semiconductor Manufacturing Industry)",
          url: "https://www.xfab.com",
          techStack:
            ".NET (C#, ASP.NET, WinForms), C++, Perl, SQL Server, Subversion, Windows Server, RedHat.",
        },
      ],
      allSkills: {
        title: "All Skills",
        categories: [
          {
            name: "General",
            skills:
              "People/Project/Financial Management, System Architecture, Full-Stack Development, Entire SDLC, Continuous Improvement, Legacy Systems",
          },
          {
            name: "Processes",
            skills:
              "DevOps, CICD, GitOps, Agile Scrum, Waterfall, Kanban, GitFlow, Matrixed Organization",
          },
          {
            name: "Architectures",
            skills:
              "N-Tier, RESTful API, PWA, SPA, SSR, MVC, Serverless, Offline-First, Event-Driven, Distributed, Microservices, Micro-Frontends, Containerized, Service Oriented, Change Data Capture",
          },
          {
            name: "Tooling",
            skills:
              "Azure DevOps, GitHub, GitHub Actions, Visual Studio/VS Code, Postman, SSMS, DBeaver, Jira, Confluence, Lucid, Trello",
          },
          {
            name: "Cloud",
            skills: "Azure, AWS, Netlify, DigitalOcean, Fly.io",
          },
          {
            name: "AI",
            skills:
              "ChatGPT, Microsoft CoPilot, Claude, Gemini, Ollama (Qwen, Gemma, Deepseek), Cursor, Cline, N8N, OpenRouter",
          },
          {
            name: "Servers",
            skills: "Windows Server, Linux (Ubuntu/Debian)",
          },
          {
            name: "DB",
            skills: "SQL Server, Postgres (Aurora), Sqlite3, Oracle, DynamoDB",
          },
          {
            name: "ORM",
            skills: "Sequelize, Entity Framework",
          },
          {
            name: "JavaScript",
            skills:
              "React, Redux, Angular, SvelteKit, Node.js, Express API, Hapi, Electron, TypeScript, JWT",
          },
          {
            name: ".NET",
            skills: "C#, VB.NET, ASP.NET Core, Blazor, UWP, SignalR, Webforms",
          },
          {
            name: "Scripting",
            skills: "Python",
          },
          {
            name: "Source Control",
            skills: "Git, Subversion",
          },
          {
            name: "QA",
            skills: "xUnit, Jasmine",
          },
          {
            name: "Web",
            skills: "HTML, CSS, Tailwind, Bootstrap",
          },
          {
            name: "Containerization",
            skills: "Docker, Kubernetes, Helm, FluxCD, Istio",
          },
          {
            name: "Data Integration",
            skills: "Boomi, Tibco, SSIS",
          },
          {
            name: "Message Queue",
            skills: "Azure Service Bus, RabbitMQ, AWS SQS, AWS Kinesis",
          },
          {
            name: "Caching",
            skills: "Redis",
          },
          {
            name: "Search",
            skills: "Elasticsearch",
          },
          {
            name: "Observability",
            skills: "Grafana, Prometheus, Papertrail, Tempo, OpenTelemetry",
          },
          {
            name: "Data Warehouse",
            skills: "Snowflake",
          },
          {
            name: "Reporting",
            skills: "SSRS, PowerBI",
          },
          {
            name: "Other",
            skills:
              "C++, Sharepoint Online, PowerApps, PowerAutomate, Twilio, Swagger, Raspberry Pi, OOP/SOLID",
          },
        ],
      },
    },
    other: {
      title: "Other",
      recentProjects: "Side Projects",
      allProjects: "More on GitHub",
      projects: [
        {
          name: "(SvelteKit) kgromero.com",
          description: "This site: my personal portfolio and resume site.",
          link: "https://github.com/romero927/kgromero",
        },
        {
          name: "(C#) Reddit Listener",
          description: "Tracks top posts and authors across subreddits in near real time, within Reddit's API rate limits.",
          link: "https://github.com/romero927/RedditListener",
        },
        {
          name: "(Go) Luhn Verifier Microservice",
          description: "HTTP microservice that validates card numbers with the Luhn algorithm.",
          link: "https://github.com/romero927/LuhnVerifier",
        },
        {
          name: "(Flutter) UUID / Password Utility",
          description: "Cross-platform app for bulk UUIDs and configurable passwords with a strength meter.",
          link: "https://github.com/romero927/Flutter_Generator-Utility",
        },
        {
          name: "(C++) JSON to Model Generator",
          description: "Generates model classes from JSON or JSON Schema for 12 languages.",
          link: "https://github.com/romero927/CPP_JSON-to-Model-Generator",
        },
      ],
      interests: "Interests",
      family: "My Family",
      interestList:
        "Spin Class, PC Gaming, Reading (SFF), Nature / National Parks, Broadway, Theme Parks",
      favoriteBlogs: "Favorite Tech Resources",
      blogs: [
        { name: "Hacker News (YCombinator)", href: "https://news.ycombinator.com/" },
        { name: "Lobste.rs", href: "https://lobste.rs/" },
        { name: "Dev.to", href: "https://dev.to/" },
        { name: "/r/programming", href: "https://www.reddit.com/r/programming/" },
        { name: "The Pragmatic Engineer", href: "https://newsletter.pragmaticengineer.com/" },
        { name: "LeadDev", href: "https://leaddev.com/" },
      ],
    },
  },
  // Add other languages here as needed
};

export const t = writable(translations.en);

locale.subscribe((value) => {
  t.set(translations[value]);
});
