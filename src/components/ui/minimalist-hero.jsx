import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-slate-500 transition-colors hover:text-slate-900"
  >
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-500 transition-colors hover:text-slate-900"
  >
    <Icon className="h-5 w-5" />
  </a>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}) => {
  return (
    <section
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-slate-50 px-6 py-8 text-slate-900 md:px-10 md:py-12',
        className
      )}
    >
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider"
        >
          {logoText}
        </motion.div>

        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-1.5 md:hidden"
          aria-label="Open menu"
          type="button"
        >
          <span className="block h-0.5 w-6 bg-slate-900" />
          <span className="block h-0.5 w-6 bg-slate-900" />
          <span className="block h-0.5 w-5 bg-slate-900" />
        </motion.button>
      </header>

      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-8 md:grid-cols-3 md:gap-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="z-20 order-2 text-center md:order-1 md:text-left"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-slate-700 md:mx-0">{mainText}</p>
          <a
            href={readMoreLink}
            className="mt-4 inline-block text-sm font-medium text-slate-900 underline decoration-from-font"
          >
            Read More
          </a>
        </motion.div>

        <div className="relative order-1 flex h-full items-center justify-center md:order-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="absolute z-0 h-[280px] w-[280px] rounded-full bg-yellow-400/90 md:h-[380px] md:w-[380px] lg:h-[460px] lg:w-[460px]"
          />

          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-auto w-52 scale-125 rounded-xl object-cover md:w-60 md:scale-150 lg:w-72"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
          <h1 className="text-6xl font-extrabold leading-[0.9] text-slate-900 md:text-7xl lg:text-8xl">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link) => (
            <SocialIcon key={link.href} href={link.href} icon={link.icon} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm font-medium text-slate-700"
        >
          {locationText}
        </motion.div>
      </footer>
    </section>
  );
};
