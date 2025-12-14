import { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Analytics from './components/Analytics';
import Contact from './components/Contact';
import ScrollIndicator from './components/ScrollIndicator';
import './styles/main.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50/40 to-sky-100/60 dark:from-slate-900 dark:via-blue-950/50 dark:to-emerald-950/30">
      <ScrollIndicator />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} data={portfolioData.basicInfo} />
      <main>
        <Hero data={portfolioData.basicInfo} intro={portfolioData.introduction} />
        <About data={portfolioData.about} />
        <Skills data={portfolioData.skills} />
        <Projects data={portfolioData.projects} />
        <Education 
          education={portfolioData.education} 
          certifications={portfolioData.certifications}
          experience={portfolioData.experience}
        />
        <Analytics data={portfolioData.analytics} />
        <Contact data={portfolioData.basicInfo} />
      </main>
      
      <footer className="bg-gradient-to-br from-blue-950 via-emerald-950/80 to-blue-950 text-white py-8 border-t border-blue-900/50">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold gradient-text">{portfolioData.basicInfo.name}</h3>
              <p className="text-gray-400">{portfolioData.basicInfo.tagline}</p>
            </div>
            <div className="flex space-x-4">
              <a href={portfolioData.basicInfo.github} className="hover:text-primary-blue transition-colors">
                GitHub
              </a>
              <a href={portfolioData.basicInfo.kaggle} className="hover:text-primary-blue transition-colors">
                Kaggle
              </a>
              <a href={`mailto:${portfolioData.basicInfo.email}`} className="hover:text-primary-blue transition-colors">
                Email
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} {portfolioData.basicInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;