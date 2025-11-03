import { writable } from 'svelte/store';

export const locale = writable('en');

const translations = {
  en: {
    name: 'Kyle Romero',
    description: `Software Engineering Leader with 18 years experience in IT, living in Jersey City, NJ.`,
    aboutMe: {
      title: 'About Me',
      content: 'Hands-on and results-driven technology leader with 18+ years in software engineering, specializing in management, full-stack development, digital transformation, software architecture, DevOps, and Agile methodologies. Proven track record of optimizing development operations, mentoring high-performing teams, and delivering scalable, business-aligned solutions.',
      openTo: 'Open To: Developer, Manager, Senior Manager, Director, and VP roles (In-Office, Hybrid, or Remote)'
    },
    contactInfo: {
      title: 'Contact Info',
      phone: '+1 (281) 857-9006',
      email: 'kgromero@gmail.com',
      linkedin: 'https://www.linkedin.com/in/kyleromero/',
      github: 'https://github.com/romero927',
      leetcode: 'https://leetcode.com/u/romero927/',
      linktree: 'Linktree'
    },
    experience: {
      title: 'Experience',
      timeline: [
        { date: "Oct 2025 - Current", title: "Team Lead, Tenna" },
        { date: "Mar 2025 - Oct 2025", title: "Contractor, Dexian (Client: Deloitte Consulting)" },
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
      companies: [
        {
          name: "Tenna (Construction Technology Industry)",
          techStack: "AWS, GitHub, K8s, Helm, Docker, FluxCD (GitOps), SingleSpa (Micro-UI), Hapi, React, Redux, RabbitMQ, Redis, Elasticsearch, Postgres, Grafana, Confluence."
        },
        {
          name: "Dexian (Staffing, IT Services, and Workforce Solutions)",
          techStack: "Azure Cloud, .NET (Azure Functions, WebAPI) [.NET Microservices (Azure Functions)], MS SQL DB (Azure), Azure DevOps, Confluence."
        },
        {
          name: "Raymour & Flanigan (Retail Industry)",
          techStack: "React, .NET (C#, UWP, ASP.NET Core), SQL Server, Oracle DB, Azure, AWS, Windows Server, Git (Azure DevOps), Boomi, Snowflake."
        },
        {
          name: "MEARS Group (Energy Industry)",
          techStack: ".NET (C#, ASP.NET Core), Blazor, SQL Server, Sqlite3, Azure / Windows Server, JavaScript (Angular / Node / Electron), Git, PowerBI, PowerAutomate, Java (Spring Boot)."
        },
        {
          name: "Worldwide Machinery (Construction Industry)",
          techStack: ".NET (C#, ASP.NET Core), SQL Server, JavaScript (Angular / Node / Electron), Git, PowerBI, PowerAutomate, Java (Spring Boot)."
        },
        {
          name: "HP Inc. (Consumer Electronics Industry)",
          techStack: ".NET (C#, ASP.NET Core), SQL Server, Sqlite3, Azure / Windows Server, JavaScript (Angular / Node / Electron), Git, PowerBI, PowerAutomate, Java (Spring Boot)."
        },
        {
          name: "X-Fab, Texas (Semiconductor Manufacturing Industry)",
          techStack: ".NET (C#, ASP.NET MVC WebAPI), SQL Server, C++, Windows Server."
        }
      ]
    },
    other: {
      title: 'Other',
      recentProjects: 'Recent Projects',
      projects: [
        { name: "(C++) AI Prompt Codebase Processor", link: "https://github.com/romero927/CPP_Codebase_Processor" },
        { name: "(C#) Reddit Listener", link: "https://github.com/romero927/RedditListener" },
        { name: "(Go) Luhn Veri Microservice", link: "https://github.com/romero927/LuhnVerifier" },
        { name: "(Django) Scored Wordle", link: "https://github.com/romero927/Django_Wurdle" },
        { name: "(Next.js / React) Algo Visualizer", link: "https://github.com/romero927/NextJS-AlgoAndDataStructVisualizer/" },
        { name: "(Ruby on Rails) Desktop Simulator", link: "https://github.com/romero927/RoR_DesktopSimulator" },
        { name: "(Angular) Markdown Wiki", link: "https://github.com/romero927/Angular_Markdown-Wiki" },
        { name: "(Flutter) UUID / PWD Utility", link: "https://github.com/romero927/Flutter_Generator-Utility" },
        { name: "(C++) JSON to Model Generator", link: "https://github.com/romero927/CPP_JSON-to-Model-Generator" },
        { name: "(Rust) Simple Blockchain", link: "https://github.com/romero927/rust-simple_blockchain" },
        { name: "(Java / Spring Boot) Sudoku", link: "https://github.com/romero927/Java-Sudoku" },
        { name: "(Phoenix) Chat Room", link: "https://github.com/romero927/Phoenix_Chat-Room" }
      ],
      wantToLearn: "Want To Learn",
      learningList: " Apache Kafka, RabbitMQ, Terraform, Vue, Kotlin, GraphQL, MongoDB, Numpy, Pandas, Jupyter, Anaconda",
      interests: "Interests",
      family: "My Family",
      interestList: "Spin Class, PC Gaming, Reading (SFF), Nature / National Parks, Broadway, Theme Parks",
      favoriteBlogs: "Favorite Tech Resources",
      blogs: [
        { name: "Hacker News (YCombinator)", href: "https://news.ycombinator.com/", attrs: { target: "_blank" } },
        { name: "Dev.to", href: "https://dev.to/", attrs: { target: "_blank" } },
        { name: "/r/programming", href: "https://www.reddit.com/r/programming/", attrs: { target: "_blank" } },
        
      ]
    },
    footerMessage: ' | Site built in SvelteKit | '
  },
  // Add other languages here as needed
};

export const t = writable(translations.en);

locale.subscribe(value => {
  t.set(translations[value]);
});
