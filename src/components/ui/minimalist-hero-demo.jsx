import { useMemo } from 'react';
import { BarChart3, Github, Globe, Mail } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import personImageOne from '../../pictures/person1.jpg';
import personImageTwo from '../../pictures/person2.JPG?url';

const MinimalistHeroDemo = ({ basicInfo }) => {
  const heroPortrait = useMemo(
    () => (Math.random() > 0.5 ? personImageOne : personImageTwo),
    []
  );

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: basicInfo.github },
    { icon: BarChart3, href: basicInfo.kaggle },
    { icon: Mail, href: `mailto:${basicInfo.email}` },
    { icon: Globe, href: basicInfo.website },
  ];

  return (
    <MinimalistHero
      logoText={`${basicInfo.name.split(' ')[0].toLowerCase()}.`}
      navLinks={navLinks}
      mainText="Full-stack developer building practical AI-driven products, scalable web apps, and experiences that feel fast, clean, and reliable."
      readMoreLink="#about"
      imageSrc={heroPortrait}
      imageAlt="Portrait of Bijay Shreepali."
      overlayText={{
        part1: 'code with',
        part2: 'purpose.',
      }}
      socialLinks={socialLinks}
      locationText={basicInfo.location}
      className="border-y border-slate-200/80"
    />
  );
};

export default MinimalistHeroDemo;
