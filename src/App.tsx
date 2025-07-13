import React, { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Theme initialization
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Set initial navbar background
    updateNavbarBackground(currentTheme);

    // Add loaded class to body
    document.body.classList.add('loaded');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateNavbarBackground(newTheme);
  };

  const updateNavbarBackground = (theme: string) => {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (!navbar) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      if (theme === 'dark') {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      }
    } else {
      if (theme === 'dark') {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
      }
    }
  };

  useEffect(() => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    const handleHamburgerClick = () => {
      hamburger?.classList.toggle('active');
      navMenu?.classList.toggle('active');
    };

    hamburger?.addEventListener('click', handleHamburgerClick);

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
    }));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href')!);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Navbar background on scroll
    const handleScroll = () => {
      updateNavbarBackground(theme);
    };

    window.addEventListener('scroll', handleScroll);

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const handleNavHighlight = () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleNavHighlight);

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.section-title, .about-text, .stat, .timeline-item, .project-card, .skill-category, .contact-info, .contact-form').forEach(el => {
      observer.observe(el);
    });

    // Skill bar animations
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBar = entry.target as HTMLElement;
          const targetWidth = skillBar.getAttribute('data-width') || '0%';
          skillBar.style.width = '0%';
          setTimeout(() => {
            skillBar.style.width = targetWidth;
          }, 200);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
      skillObserver.observe(bar);
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(this: HTMLFormElement, e: Event) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
          alert('Please fill in all fields.');
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email as string)) {
          alert('Please enter a valid email address.');
          return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]') as HTMLButtonElement;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
          alert('Thank you for your message! I\'ll get back to you soon.');
          this.reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2000);
      });
    }

    // Add click effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
      (btn as HTMLElement).addEventListener('click', function(this: HTMLElement, e: MouseEvent) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Parallax effect for hero section
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const heroImage = document.querySelector('.hero-image') as HTMLElement;
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleParallax);

    // Cleanup
    return () => {
      hamburger?.removeEventListener('click', handleHamburgerClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleNavHighlight);
      window.removeEventListener('scroll', handleParallax);
    };
  }, [theme]);

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <a href="#home">Chengjia Feng</a>
          </div>
          <ul className="nav-menu">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#experience" className="nav-link">Experience</a></li>
            <li><a href="#projects" className="nav-link">Projects</a></li>
            <li><a href="#skills" className="nav-link">Skills</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
          <div className="theme-toggle">
            <button id="theme-toggle" className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle dark mode">
              <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
              </svg>
              <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
              </svg>
            </button>
          </div>
          <div className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">Chengjia Feng</span>
            </h1>
            <p className="hero-subtitle">Software Engineer & Full-Stack LLM Application Developer</p>
            <p className="hero-description">
              Passionate about building scalable web applications, machine learning solutions, 
              and data-driven systems. Currently pursuing MS in Software Engineering systems at Northeastern University.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="/CV-Chengjia Feng _NEU_v3.8.pdf" className="btn btn-secondary" download>Download Resume</a>
            </div>
            <div className="hero-social">
              <a href="https://github.com/chengjiafeng857" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/chengjia-feng-a59698291" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="mailto:feng.chen@northeastern.edu" aria-label="Email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.269h.909c.904 0 1.636.732 1.636 1.636z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-avatar">
              <img src="/1711482347572.jpeg" alt="Chengjia Feng" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate software engineer currently pursuing my Master's in Software Engineering systems at 
                Northeastern University. With a strong foundation in full-stack development, AI Agent development and machine learning, 
                I enjoy creating innovative solutions that solve real-world problems.
              </p>
              <p>
                My experience spans across various technologies including Python, Java, React, Node.js, Langchain/Langgraph and cloud platforms. 
                I've worked on projects ranging from e-commerce platforms to AI agent applications, 
                always focusing on writing clean, efficient, and scalable code.
              </p>
              <p>
                When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, 
                and staying up-to-date with the latest industry trends. I'm particularly interested in the 
                intersection of AI and web development.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h3>1+</h3>
                <p>Years 
                  (Internships included)Experience</p>
              </div>
              <div className="stat">
                <h3>5+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>8+</h3>
                <p>Technologies Mastered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>AI Engineering Intern</h3>
                <h4>Phicil-itate Change</h4>
                <span className="timeline-date">Jan 2025 - Aug 2025</span>
                <ul>
                  <li>Engineered a full-stack web application using React.js and FastAPI, implementing a GitOps pipeline via Argo CD and GitHub Actions for CI/CD, deployed on CloudFlare. </li>
                  <li>Developed five AI agents processing 1,000+ daily queries:
                    <ul style={{marginTop: '0.5rem', marginLeft: '1rem'}}>
                      <li>Voice Agent - Phone system integration (<a href="tel:+19786376169" style={{color: '#667eea', textDecoration: 'none'}}>+1 9786376169</a>)</li>
                      <li>LangGraph-based CoT Deep Research Agent</li>
                      <li>CrewAI Multi-agent Report Generator</li>
                      <li>Natural Language SQL Query Agent</li>
                      <li>Automated Data Visualization Pipeline</li>
                    </ul>
                  </li>
                  <li>Designed and maintained a HIPAA-compliant PostgreSQL database managing 3,000+ patient records, incorporating TLS encryption, audit logging, and achieving 99.9% uptime.</li>
                </ul>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Graduate Student</h3>
                <h4>Northeastern University</h4>
                <span className="timeline-date">Sep 2023 - Present</span>
                <ul>
                  <li>Pursuing Master of Science in Software Engineering systems</li>
                  <li>Relevant Coursework: Algorithms, Database Systems, Machine Learning, Software Engineering</li>
                  <li>Maintaining strong academic performance while working on practical projects</li>
                  <li>Active participant in coding competitions and hackathons</li>
                </ul>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Software Engineering Co-op</h3>
                <h4>Zhongshan Super Delight Software</h4>
                <span className="timeline-date">Aug 2021 - Oct 2021</span>
                <ul>
                  <li>Contributed to the development and overall testing of all modules, including solving high concurrency using Spring Cloud and async processing in a domestic hardware retail system in China using the F2B2C business model. </li>
                  <li>Designed and developed RESTful APIs for Warehouse and Sales modules using springMVC, MyBatis, and SQL, </li>
                  <li>implementing a micro-service architecture with RabbitMQ message queuing and Redis caching</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Undergraduate study</h3>
                <h4>University of Electronic Science and Technology of China</h4>
                <span className="timeline-date">Sep 2018 - Jul 2022</span>
                <ul>
                  <li>Pursuing Bachelor in Computer Science</li>
                  <li>Relevant Coursework: Data structure and Algorithms, Database Systems, Linux management</li>
                  <li>Maintaining strong academic performance while working on practical projects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <img src="/Screenshot 2025-07-12 at 16.30.48.png" alt="E-commerce Platform" />
              </div>
              <div className="project-content">
                <h3>Agentic rag Assistant for Techdocs</h3>
                <ul style={{marginTop: '0.5rem', marginLeft: '1rem', marginBottom: '1rem'}}>
                  <li>Agentic RAG – Enables querying of any uplaoded documents (PDFs, Markdown, Notebooks) usingagentic RAG to provide grounded answers. Includes official LangChain docs by default.</li>
                  <li>GitHub Resource Finder (in development) – An agent-based tool for retrieving relevant GitHub resources</li>
                </ul>
                <div className="project-tech">
                  <span className="tech-tag">Streamlit</span>
                  <span className="tech-tag">PostgreSQL</span>
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Langchain</span>
                </div>
                <div className="project-links">
                  <a href="http://134.199.142.71" className="project-link">Live Demo</a>
                  <a href="https://github.com/chengjiafeng857/agentic_rag_techdoc" className="project-link">GitHub</a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <img src="/Screenshot 2025-07-12 at 16.55.16.png" alt="Machine Learning Dashboard" />
              </div>
              <div className="project-content">
                <h3>Opt-imize</h3>
                <p>AI-powered platform supporting OPT/H1B immigration queries using RAG, GPT-4o, and LangChain agents. Features real-time USCIS data, a CrewAI multi-agent system, MERN-based web app, and AWS/Kubernetes deployment</p>
                <div className="project-tech">
                  <span className="tech-tag">MongoDB</span>
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Express</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">LangChain</span>
                </div>
                <div className="project-links">
                  <a href="https://opt-imize.com/" className="project-link">Live Demo</a>
                  {/* <a href="https://github.com/chengjiafeng857" className="project-link">GitHub</a> */}
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <img src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Task Management App" />
              </div>
              <div className="project-content">
                <h3>School Sports Management System</h3>
                <p>Built and deployed modules for field, equipment, and athlete management using Spring Boot, MyBatis, and Docker. Led backend/API development and CI/CD automation with Jenkins and GitHub Actions, cutting release cycles by 60%.</p>
                <div className="project-tech">
                  <span className="tech-tag">Java</span>
                  <span className="tech-tag">Spring Boot</span>
                  <span className="tech-tag">MyBatis</span>
                  <span className="tech-tag">SQL</span>
                  <span className="tech-tag">Spring Cloud</span>
                  <span className="tech-tag">Docker</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">Live Demo</a>
                  <a href="https://github.com/chengjiafeng857/mirrohMatch" className="project-link">GitHub</a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <img src="/Screenshot 2025-07-12 at 16.47.56.png" alt="Task Management App" />
              </div>
              <div className="project-content">
                <h3>MirroMatch-online dating site</h3>
                <p>A B2B platform for dating coaches, offering tools to boost client engagement, enable dating-specific practice, and streamline feedback between sessions.</p>
                <div className="project-tech">
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">PostgreSQL</span>
                  <span className="tech-tag">Express</span>
                  <span className="tech-tag">CSS3</span>
                  <span className="tech-tag">React.js</span>
                  <span className="tech-tag">LangChain</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">Live Demo</a>
                  <a href="https://github.com/chengjiafeng857/mirrohMatch" className="project-link">GitHub</a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Data Analytics Platform" />
              </div>
              <div className="project-content">
                <h3>Cross-Platform Mobile App</h3>
                <p>A cross-platform mobile application for social networking with real-time messaging, photo sharing, and location-based features. Built with React Native.</p>
                <div className="project-tech">
                  <span className="tech-tag">React Native</span>
                  <span className="tech-tag">Redux</span>
                  <span className="tech-tag">Firebase</span>
                  <span className="tech-tag">Maps API</span>
                  <span className="tech-tag">Push Notifications</span>
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">Live Demo</a>
                  <a href="https://github.com/chengjiafeng857" className="project-link">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend Development</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-name">React.js</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '90%'}} data-width="90%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">JavaScript</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '95%'}} data-width="95%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">TypeScript</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '85%'}} data-width="85%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">HTML/CSS</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '95%'}} data-width="95%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Vue.js</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '80%'}} data-width="80%"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3>Backend Development</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-name">Node.js</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '88%'}} data-width="88%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Python</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '92%'}} data-width="92%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Java</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '80%'}} data-width="80%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Express.js</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '85%'}} data-width="85%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Django</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '75%'}} data-width="75%"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3>Database & Cloud</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-name">MongoDB</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '85%'}} data-width="85%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">PostgreSQL</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '80%'}} data-width="80%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">AWS</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '75%'}} data-width="75%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Docker</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '70%'}} data-width="70%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Firebase</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '82%'}} data-width="82%"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skill-category">
              <h3>Tools & Others</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-name">Git</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '90%'}} data-width="90%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Machine Learning</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '78%'}} data-width="78%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Agile/Scrum</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '85%'}} data-width="85%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">REST APIs</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '88%'}} data-width="88%"></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">TensorFlow</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '72%'}} data-width="72%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's work together</h3>
              <p>I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!</p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.91L12 10.09l9.455-6.269h.909c.904 0 1.636.732 1.636 1.636z"/>
                  </svg>
                  <span>feng.chen@northeastern.edu</span>
                </div>
                <div className="contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <a href="https://www.linkedin.com/in/chengjia-feng-a59698291" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                </div>
                <div className="contact-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com/chengjiafeng857" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
                </div>
              </div>
            </div>
            
            <form className="contact-form">
              <div className="form-group">
                <input type="text" id="name" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" id="subject" name="subject" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea id="message" name="message" placeholder="Your Message" rows={5} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2024 Chengjia Feng. All rights reserved.</p>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
