import { writable } from 'svelte/store';

export const locale = writable('en');

const translations = {
  en: {
    name: 'Kyle Romero',
    description: (years) => `Software Engineering Leader with ${years} years experience in IT based out of Jersey City, NJ.`,
    aboutMe: {
      title: 'About Me',
      content: 'IT Leader with 10 years as a full-stack developer and 7 years in software development management, living in the NYC Metro Area. Looking for the next opportunity to lead a development organization to success, maximize business value, and provide great user experiences. Adherent to servant leadership and continuous improvement.',
      openTo: 'Open To: Manager, Senior Manager, and Director roles (In-Office, Hybrid, or Remote)'
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
        { date: "Apr 2021 - Mar 2023", title: "Director of Operations Technology, MEARS Group" },
        { date: "Mar 2020 - Apr 2021", title: "Senior Manager of Operations Technology, MEARS Group" },
        { date: "Oct 2017 - Mar 2020", title: "Manager of Operations Technology, MEARS Group" },
        { date: "Apr 2016 — Oct 2017", title: "Team Lead / Senior Software Developer, Worldwide Machinery" },
        { date: "Dec 2013 — Feb 2016", title: "Technical Lead (IT Developer / Engineer III), HP" },
        { date: "Dec 2011 - Dec 2013", title: "Senior Developer (IT Developer / Engineer II), HP" },
        { date: "July 2007 — Dec 2011", title: "Software / Systems Engineer, X-Fab, Texas" },
        { date: "May 2007 — July 2007", title: "Software Development Intern, X-Fab, Texas" },
        { date: "May 2005 — Dec 2009", title: "Bachelor of Science in Computer Engineering, Texas Tech University" }
      ]
    },
    skills: {
      title: 'Skills',
      categories: {
        "General": "People Management, Project Management, Financial Management, System Architecture, Full-Stack Development, Entire SDLC, Continuous Improvement, Legacy Systems",
        "Processes": "DevOps, CICD, Agile Scrum, Kanban, GitFlow, Matrixed Organization",
        "Architectures": "N-Tier, REST API, PWA, SPA, Serverless, MVC, Event Driven, Offline-First, Distributed, Microservices (Novice), Containerized/Orchestrated (Novice)",
        ".NET": "C#, VB.NET, ASP.NET API/MVC, Blazor, UWP, SignalR",
        "JavaScript": "React, Node.js, NPM, Electron, Angular, TypeScript, SvelteKit",
        "Scripting": "Python",
        "Web": "HTML, CSS, Tailwind, Bootstrap",
        "Containerization (Novice)": "Docker, MicroK8s",
        "DB": "SQL Server, Sqlite3, Oracle",
        "Cloud": "Azure, AWS, Netlify",
        "Servers": "Windows Server, Linux (Ubuntu/Debian)",
        "Tooling": "Azure DevOps, GitHub, Visual Studio/VS Code, SSMS, DBeaver",
        "ETL": "Boomi, SSIS",
        "Message Queue": "Azure Service Bus",
        "AI": "ChatGPT, Microsoft CoPilot",
        "Data Warehouse": "Snowflake",
        "Reporting": "SSRS, PowerBI",
        "Other": "Sharepoint Online, PowerApps, PowerAutomate, Twilio, JWT, Swagger, C++, Java (Spring Boot), Raspberry Pi"
      }
    },
    other: {
      title: 'Other',
      recentProjects: 'Recent Projects',
      projects: [
        { name: "(C#) Reddit Listener", link: "https://github.com/romero927/RedditListener" },
        { name: "(Go) Luhn Veri Microservice", link: "https://github.com/romero927/LuhnVerifier" },
        { name: "(Python) Wordle Clone", link: "https://github.com/romero927/Wurdle" },
        { name: "(Flutter) Generator Utility", link: "https://github.com/romero927/Flutter_Generator-Utility" },
        { name: "(OpenCV) Face / Object Detection", link: "https://github.com/romero927/OpenCV_Face-Object-Detect" },
        { name: "(Rust) Simple Blockchain", link: "https://github.com/romero927/rust-simple_blockchain" },
        { name: "(Scala) Game of Life", link: "https://github.com/romero927/Scala-Game-of-Life" },
        { name: "(Java / Spring Boot) Sudoku", link: "https://github.com/romero927/Java-Sudoku" }
      ],
      wantToLearn: "Want To Learn",
      learningList: ".NET MAUI, Apache Kafka, RabbitMQ, Terraform, Django, Next.js, Vue, Phoenix, Erlang, K8s, Blockchain, GraphQL, PostgreSQL, MongoDB,  LLMs,  Numpy, Pandas, Redis, Jupyter, Anaconda",
      interests: "Interests",
      family: "My Family",
      interestList: "Spin Class, PC Gaming, Reading (SFF), Nature / National Parks, Broadway, Theme Parks, Travel",
      favoriteBlogs: "Favorite Blogs and Tech Resources",
      blogs: [
        { name: "Hacker News (YCombinator)", href: "https://news.ycombinator.com/", attrs: { target: "_blank" } },
        { name: "Dev.to", href: "https://dev.to/", attrs: { target: "_blank" } },
        { name: "Pluralsight", href: "https://www.pluralsight.com", attrs: { target: "_blank" } },
        { name: "/r/programming", href: "https://www.reddit.com/r/programming/", attrs: { target: "_blank" } }
        
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