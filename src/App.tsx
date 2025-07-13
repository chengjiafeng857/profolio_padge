import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Sun, Moon, Menu, X } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const submitBtn = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.");
      e.currentTarget.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <button onClick={() => scrollToSection('home')}>Chengjia Feng</button>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`nav-link ${activeSection === section ? 'active' : ''}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          <div className="theme-toggle">
            <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle dark mode">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
                View My Work
              </button>
              <a href="/CV-Chengjia Feng _NEU_v3.8.pdf" className="btn btn-secondary" download>
                Download Resume
              </a>
            </div>
            <div className="hero-social">
              <a href="https://github.com/chengjiafeng857" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/chengjia-feng-a59698291" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href="mailto:feng.chen@northeastern.edu" aria-label="Email">
                <Mail size={24} />
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
                <p>Years (Internships included) Experience</p>
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
                  <li>Engineered a full-stack web application using React.js and FastAPI, implementing a GitOps pipeline via Argo CD and GitHub Actions for CI/CD, deployed on CloudFlare.</li>
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
                  <li>Contributed to the development and overall testing of all modules, including solving high concurrency using Spring Cloud and async processing in a domestic hardware retail system in China using the F2B2C business model.</li>
                  <li>Designed and developed RESTful APIs for Warehouse and Sales modules using springMVC, MyBatis, and SQL,</li>
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
                <img src="/Screenshot 2025-07-12 at 16.30.48.png" alt="Agentic RAG Assistant" />
              </div>
              <div className="project-content">
                <h3>Agentic rag Assistant for Techdocs</h3>
                <ul style={{marginTop: '0.5rem', marginLeft: '1rem', marginBottom: '1rem'}}>
                  <li>Agentic RAG – Enables querying of any uploaded documents (PDFs, Markdown, Notebooks) using agentic RAG to provide grounded answers. Includes official LangChain docs by default.</li>
                  <li>GitHub Resource Finder (in development) – An agent-based tool for retrieving relevant GitHub resources</li>
                </ul>
                <div className="project-tech">
                  <span className="tech-tag">Streamlit</span>
                  <span className="tech-tag">PostgreSQL</span>
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Langchain</span>
                </div>
                <div className="project-links">
                  <a href="http://134.199.142.71" className="project-link" target="_blank" rel="noopener noreferrer">Live Demo</a>
                  <a href="https://github.com/chengjiafeng857/agentic_rag_techdoc" className="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <img src="/Screenshot 2025-07-12 at 16.55.16.png" alt="Opt-imize" />
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
                  <a href="https://opt-imize.com/" className="project-link" target="_blank" rel="noopener noreferrer">Live Demo</a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <img src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600" alt="School Sports Management System" />
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
                  <a href="https://github.com/chengjiafeng857/mirrohMatch" className="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <img src="/Screenshot 2025-07-12 at 16.47.56.png" alt="MirroMatch" />
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
                  <a href="https://github.com/chengjiafeng857/mirrohMatch" className="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div className="project-image">
                <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Cross-Platform Mobile App" />
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
                  <a href="https://github.com/chengjiafeng857" className="project-link" target="_blank" rel="noopener noreferrer">GitHub</a>
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
                {[
                  { name: 'React.js', level: 90 },
                  { name: 'JavaScript', level: 95 },
                  { name: 'TypeScript', level: 85 },
                  { name: 'HTML/CSS', level: 95 },
                  { name: 'Vue.js', level: 80 }
                ].map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h3>Backend Development</h3>
              <div className="skill-items">
                {[
                  { name: 'Node.js', level: 88 },
                  { name: 'Python', level: 92 },
                  { name: 'Java', level: 80 },
                  { name: 'Express.js', level: 85 },
                  { name: 'Django', level: 75 }
                ].map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h3>Database & Cloud</h3>
              <div className="skill-items">
                {[
                  { name: 'MongoDB', level: 85 },
                  { name: 'PostgreSQL', level: 80 },
                  { name: 'AWS', level: 75 },
                  { name: 'Docker', level: 70 },
                  { name: 'Firebase', level: 82 }
                ].map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-category">
              <h3>Tools & Others</h3>
              <div className="skill-items">
                {[
                  { name: 'Git', level: 90 },
                  { name: 'Machine Learning', level: 78 },
                  { name: 'Agile/Scrum', level: 85 },
                  { name: 'REST APIs', level: 88 },
                  { name: 'TensorFlow', level: 72 }
                ].map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
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
                  <Mail size={20} />
                  <span>feng.chen@northeastern.edu</span>
                </div>
                <div className="contact-item">
                  <Linkedin size={20} />
                  <a href="https://www.linkedin.com/in/chengjia-feng-a59698291" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                </div>
                <div className="contact-item">
                  <Github size={20} />
                  <a href="https://github.com/chengjiafeng857" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
                </div>
              </div>
            </div>
            
            <form className="contact-form" onSubmit={handleSubmit}>
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
              {['home', 'about', 'projects', 'contact'].map((section) => (
                <button key={section} onClick={() => scrollToSection(section)}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;