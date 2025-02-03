import { writable } from 'svelte/store';

export const locale = writable('en');

const translations = {
  en: {
    name: 'Kyle Romero',
    description: `Software Engineering Leader with 17 years experience in IT, living in Jersey City, NJ.`,
    aboutMe: {
      title: 'About Me',
      content: 'Results-driven technology leader with 10+ years in software engineering and 7 years in management, specializing in digital transformation, software architecture, DevOps, and Agile methodologies. Proven track record of optimizing development operations, mentoring high-performing teams, and delivering scalable, business-aligned solutions. Passionate about driving innovation, streamlining processes, and leading technology organizations to success.',
      openTo: 'Open To: Developer, Manager, Senior Manager, Director, and VP roles (In-Office, Hybrid, or Remote)'
    },
    contactInfo: {
      title: 'Contact Info',
      phone: '(281) 857-9006',
      email: 'kgromero@gmail.com',
      linkedin: 'LinkedIn',
      github: 'Github',
      linktree: 'Linktree'
    },
    experience: {
      title: 'Experience',
      timeline: [
        { date: "Mar 2023 - May 2024", title: "Director of Software Development, Raymour & Flanigan" },
        { date: "Apr 2021 - Mar 2023", title: "Director of Software Development, MEARS Group" },
        { date: "Mar 2020 - Apr 2021", title: "Senior Manager of Software Development, MEARS Group" },
        { date: "Oct 2017 - Mar 2020", title: "Manager of Software Development, MEARS Group" },
        { date: "Apr 2016 — Oct 2017", title: "Team Lead, Worldwide Machinery" },
        { date: "Dec 2013 — Feb 2016", title: "Technical Lead, HP" },
        { date: "Dec 2011 - Dec 2013", title: "Senior Developer, HP" },
        { date: "July 2007 — Dec 2011", title: "Software Developer, X-Fab, Texas" },
        { date: "May 2007 — July 2007", title: "Software Development Intern, X-Fab, Texas" },
        { date: "May 2005 — Dec 2009", title: "Bachelor of Science in Computer Engineering, Texas Tech University" }
      ]
    },
    skills: {
      title: 'Skills',
      categories: {
        "General": "People Management, Project Management, Financial Management, System Architecture, Full-Stack Development, Entire SDLC, Continuous Improvement, Legacy Systems",
        "Processes": "DevOps, CICD, Agile Scrum, Kanban, GitFlow, Matrixed Organization",
        "Architectures": "N-Tier, REST API, PWA, SPA, SSR, Serverless, MVC, Event Driven, Offline-First, Distributed, Microservices (Novice), Containerized/Orchestrated (Novice)",
        ".NET": "C#, VB.NET, ASP.NET Core, Blazor, UWP, SignalR, Webforms",
        "JavaScript": "React, Node.js, NPM, Electron, Angular, TypeScript, SvelteKit",
        "Scripting": "Python",
        "Web": "HTML, CSS, Tailwind, Bootstrap",
        "Containerization (Novice)": "Docker, MicroK8s",
        "DB": "SQL Server, Sqlite3, Oracle",
        "Cloud": "Azure, AWS, Netlify, DigitalOcean, Fly.io",
        "Servers": "Windows Server, Linux (Ubuntu/Debian)",
        "Tooling": "Azure DevOps, GitHub, Visual Studio/VS Code, SSMS, DBeaver, Jira",
        "ETL": "Boomi, SSIS",
        "Message Queue": "Azure Service Bus",
        "AI": "ChatGPT, Microsoft CoPilot, Claude, Cursor",
        "Data Warehouse": "Snowflake",
        "Reporting": "SSRS, PowerBI",
        "Other": "Java Spring, Sharepoint Online, PowerApps, PowerAutomate, Twilio, JWT, Swagger, C++, Raspberry Pi"
      }
    },
    other: {
      title: 'Other',
      recentProjects: 'Recent Projects',
      projects: [
        { name: "(Next.js / React) Algo Visualizer", link: "https://github.com/romero927/NextJS-AlgoAndDataStructVisualizer/" },
        { name: "(Angular) Markdown Wiki", link: "https://github.com/romero927/Angular_Markdown-Wiki" },
        { name: "(Flutter) UUID / PWD Utility", link: "https://github.com/romero927/Flutter_Generator-Utility" },
        { name: "(Django) Scored Wordle", link: "https://github.com/romero927/Django_Wurdle" },
        { name: "(C#) Reddit Listener", link: "https://github.com/romero927/RedditListener" },
        { name: "(Go) Luhn Veri Microservice", link: "https://github.com/romero927/LuhnVerifier" },
        { name: "(C++) AI Prompt Context Generator", link: "https://github.com/romero927/CPP_AIIFY" },
        { name: "(C++) JSON to Model Generator", link: "https://github.com/romero927/CPP_JSON-to-Model-Generator" },
        { name: "(Rust) Simple Blockchain", link: "https://github.com/romero927/rust-simple_blockchain" },
        { name: "(Java / Spring Boot) Sudoku", link: "https://github.com/romero927/Java-Sudoku" },
        { name: "(Phoenix) Chat Room", link: "https://github.com/romero927/Phoenix_Chat-Room" }
      ],
      wantToLearn: "Want To Learn",
      learningList: ".NET MAUI, Apache Kafka, RabbitMQ, Redis, Terraform, Vue, Kotlin, K8s, Blockchain, GraphQL, PostgreSQL, MongoDB, LLMs, Numpy, Pandas, Jupyter, Anaconda",
      interests: "Interests",
      family: "My Family",
      interestList: "Spin Class, PC Gaming, Reading (SFF), Nature / National Parks, Broadway, Theme Parks",
      favoriteBlogs: "Favorite Tech Resources",
      blogs: [
        { name: "Hacker News (YCombinator)", href: "https://news.ycombinator.com/", attrs: { target: "_blank" } },
        { name: "Dev.to", href: "https://dev.to/", attrs: { target: "_blank" } },
        { name: "Pluralsight", href: "https://www.pluralsight.com", attrs: { target: "_blank" } },
        { name: "/r/programming", href: "https://www.reddit.com/r/programming/", attrs: { target: "_blank" } },
        { name: "Stack Overflow Survey '24", href: "https://survey.stackoverflow.co/2024/", attrs: { target: "_blank" } }
        
      ]
    },
    footerMessage: '- Site built in SvelteKit, utilizing TailwindCSS, FontAwesome, and Flowbite. Hosted on Netlify.'
  },
  // Add other languages here as needed
};

export const t = writable(translations.en);

locale.subscribe(value => {
  t.set(translations[value]);
});
