import { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import ScrollIndicator from './components/ScrollIndicator';
import Cursor from './components/Cursor/Cursor';
import PageTransition from './components/Transitions/PageTransition';
import StickySection from './components/StickySection';
import useLenis from './hooks/useLenis';

function App() {
  useLenis();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
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
    <div className="min-h-screen">
      <ScrollIndicator />
      <Cursor />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} data={portfolioData.basicInfo} />
      <PageTransition>
        <main className="noise-overlay relative overflow-hidden">
          <Hero data={portfolioData.basicInfo} intro={portfolioData.introduction} />
          <About data={portfolioData.about} />
          <Skills data={portfolioData.skills} />
          <Projects data={portfolioData.projects} />
          <StickySection />
          <Education 
            education={portfolioData.education} 
            certifications={portfolioData.certifications}
            experience={portfolioData.experience}
          />
          <Contact data={portfolioData.basicInfo} />
        </main>
      </PageTransition>
      
      <footer className="border-t border-slate-200/70 bg-white/65 py-8 text-slate-700">
        <div className="section-container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold gradient-text">{portfolioData.basicInfo.name}</h3>
              <p className="text-slate-500">{portfolioData.basicInfo.tagline}</p>
            </div>
            <div className="flex space-x-4">
              <a href={portfolioData.basicInfo.github} className="transition-colors hover:text-primary-blue-700">
                GitHub
              </a>
              <a href={portfolioData.basicInfo.kaggle} className="transition-colors hover:text-primary-blue-700">
                Kaggle
              </a>
              <a href={`mailto:${portfolioData.basicInfo.email}`} className="transition-colors hover:text-primary-blue-700">
                Email
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-slate-500">
            <p>© {new Date().getFullYear()} {portfolioData.basicInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;