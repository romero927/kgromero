<script>
  import { onMount } from 'svelte';
  import { Terminal } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  export let isOpen = false;
  export let onClose;

  let input = '';
  let output = [
    { type: 'system', content: 'Welcome to Kyle Romero\'s bash shell! You can use this terminal to interactively explore my information. This functionality was completely built using Claude AI 3.5 Sonnet.' },
    { type: 'system', content: 'Type "help" for available commands.' }
  ];
  let inputElement;
  let outputElement;

  const resumeData = {
    name: "Kyle Romero",
    location: "Jersey City, NJ",
    email: "kgromero@gmail.com",
    phone: "(281) 857-9006",
    linkedin: "in/kyleromero",
    website: "kgromero.com",
    summary: "Software Engineering Leader with 10 years as a full-stack developer and 7 years in management, living in the NYC Metro Area. Looking for the next opportunity to lead a development organization to success, maximize business value, and provide great user experiences.",
    experience: [
      {
        startDate: "2023-03",
        endDate: "2024-05",
        title: "Director of Software Development",
        company: "Raymour & Flanigan",
        location: "Jersey City, NJ (remote)"
      },
      {
        startDate: "2017-10",
        endDate: "2023-03",
        title: "Manager of Software Development",
        company: "MEARS Group",
        location: "Jersey City, NJ (remote)"
      },
      {
        startDate: "2016-04",
        endDate: "2017-10",
        title: "Team Lead",
        company: "Worldwide Machinery",
        location: "Houston, TX"
      },
      {
        startDate: "2013-12",
        endDate: "2016-02",
        title: "Technical Lead",
        company: "HP",
        location: "Houston, TX"
      },
      {
        startDate: "2011-12",
        endDate: "2013-12",
        title: "Senior Developer",
        company: "HP",
        location: "Houston, TX"
      },
      {
        startDate: "2007-07",
        endDate: "2011-12",
        title: "Software Developer",
        company: "X-Fab, Texas",
        location: "Lubbock, TX"
      },
      {
        startDate: "2007-05",
        endDate: "2007-07",
        title: "Software Development Intern",
        company: "X-Fab, Texas",
        location: "Lubbock, TX"
      }
    ],
    education: {
      startDate: "2005-05",
      endDate: "2009-12",
      degree: "Bachelor of Science in Computer Engineering",
      school: "Texas Tech University",
      location: "Lubbock, TX"
    }
  };

  $: if (isOpen && inputElement) {
    setTimeout(() => inputElement.focus(), 0);
  }

  function handleSubmit() {
    processCommand(input);
    input = '';
    scrollToBottom();
  }

  function processCommand(cmd) {
    const command = cmd.trim().toLowerCase();
    output = [...output, { type: 'command', content: cmd }];
    
    let response = '';

    switch (command) {
      case 'help':
        response = [
          'Available commands:',
          '  summary - Display a brief summary',
          '  experience - Show work experience and education timeline',
          '  education - Show education details',
          '  contact - Display contact information',
          '  clear - Clear the screen',
          '  exit - Close the terminal',
          '  help - Show this help message'
        ].join('\n');
        break;
      case 'summary':
        response = resumeData.summary;
        break;
      case 'experience':
        response = generateExperienceTimeline();
        break;
      case 'education':
        response = `${resumeData.education.degree}\n${resumeData.education.school}, ${resumeData.education.location} (${resumeData.education.endDate})\n`;
        break;
      case 'contact':
        response = `Name: ${resumeData.name}\nEmail: ${resumeData.email}\nPhone: ${resumeData.phone}\nLinkedIn: ${resumeData.linkedin}\nWebsite: ${resumeData.website}`;
        break;
      case 'clear':
        output = [];
        return;
      case 'exit':
        onClose();
        return;
      default:
        response = `Command not found: ${command}. Type "help" for available commands.`;
    }

    output = [...output, { type: 'response', content: response }];
  }

  function generateExperienceTimeline() {
    let timeline = '╔═══════════════════════ Career Timeline ═════════════════════════════╗\n';
    const allExperiences = [...resumeData.experience, resumeData.education].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    
    allExperiences.forEach((exp, index) => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate === 'present' ? new Date() : new Date(exp.endDate);
      const duration = endDate.getFullYear() - startDate.getFullYear();
      const startYear = startDate.getFullYear();
      const endYear = endDate.getFullYear();
      
      let line1, line2;
      if ('degree' in exp) {
        line1 = `${startYear} - ${endYear} (${duration} years)`.padEnd(21) + `│ ${exp.degree}`;
        line2 = ' '.repeat(21) + `│ ${exp.school}, ${exp.location}`;
      } else {
        line1 = `${startYear} - ${endYear} (${duration} years)`.padEnd(21) + `│ ${exp.title}`;
        line2 = ' '.repeat(21) + `│ ${exp.company}, ${exp.location}`;
      }
      
      timeline += `║ ${line1.padEnd(70)}\n`;
      timeline += `║ ${line2.padEnd(70)}\n`;
      
      if (index < allExperiences.length - 1) {
        timeline += `║${'─'.repeat(21)}┼${'─'.repeat(48)}\n`;
      }
    });
    
    timeline += '╚═════════════════════════════════════════════════════════════════════╝';
    return timeline;
  }

  function scrollToBottom() {
    setTimeout(() => {
      outputElement.scrollTop = outputElement.scrollHeight;
    }, 0);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div transition:fade="{{ duration: 200 }}" class="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" on:keydown={handleKeydown}>
    <div class="w-full max-w-3xl bg-gray-900 text-green-400 font-mono rounded-lg shadow-lg">
      <div class="flex items-center justify-between p-4 border-b border-gray-800">
        <div class="flex items-center">
          <Terminal class="mr-2" size={20} />
          <h2 class="text-xl font-bold">Kyle's Resume Bash Shell</h2>
        </div>
        <button on:click={onClose} class="text-gray-500 hover:text-gray-300 focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div bind:this={outputElement} class="h-96 overflow-y-auto p-4 whitespace-pre-wrap">
        {#each output as line}
          {#if line.type === 'command'}
            <div class="mb-1">$ {line.content}</div>
          {:else}
            <div class="mb-2">{line.content}</div>
          {/if}
        {/each}
      </div>
      <form on:submit|preventDefault={handleSubmit} class="flex p-4 border-t border-gray-800">
        <span class="mr-2">$</span>
        <input
          bind:this={inputElement}
          bind:value={input}
          type="text"
          class="flex-grow bg-transparent focus:outline-none"
        />
      </form>
    </div>
  </div>
{/if}

<style>
  /* Add any additional styles here if needed */
</style>