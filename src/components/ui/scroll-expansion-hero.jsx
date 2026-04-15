import { useEffect, useMemo, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const INITIAL_MEDIA_WIDTH = 300;
const INITIAL_MEDIA_HEIGHT = 400;

const getYouTubeEmbedSrc = (source) => {
  if (!source || !source.includes('youtube.com')) {
    return source;
  }

  if (source.includes('embed/')) {
    return `${source}${source.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1`;
  }

  const videoId = source.split('v=')[1]?.split('&')[0] || '';
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=${videoId}`;
};

const ScrollExpandMedia = ({
  id,
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}) => {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobileState, setIsMobileState] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 180,
    damping: prefersReducedMotion ? 260 : 36,
    mass: prefersReducedMotion ? 1 : 0.5,
  });

  const expansionProgress = useTransform(
    smoothProgress,
    [0, 0.45],
    [0, 1],
    { clamp: true }
  );

  const contentOpacity = useTransform(
    smoothProgress,
    [0.56, 0.86],
    [0, 1],
    { clamp: true }
  );

  const stickyOpacity = useTransform(
    smoothProgress,
    [0.72, 0.95],
    [1, 0],
    { clamp: true }
  );

  const backgroundOpacity = useTransform(expansionProgress, [0, 1], [1, 0]);
  const helperTextOpacity = useTransform(expansionProgress, [0, 0.32], [1, 0]);
  const mediaOverlayOpacity = useTransform(expansionProgress, [0, 1], [0.68, 0.38]);
  const textTranslateX = useTransform(expansionProgress, (value) => value * (isMobileState ? 140 : 220));
  const inverseTextTranslateX = useTransform(textTranslateX, (value) => -value);

  const mediaWidth = useTransform(
    expansionProgress,
    (value) => INITIAL_MEDIA_WIDTH + value * (isMobileState ? 650 : 1250)
  );

  const mediaHeight = useTransform(
    expansionProgress,
    (value) => INITIAL_MEDIA_HEIGHT + value * (isMobileState ? 220 : 420)
  );

  useEffect(() => {
    const updateViewportState = () => {
      setIsMobileState(window.innerWidth < 768);
    };

    updateViewportState();
    window.addEventListener('resize', updateViewportState, { passive: true });

    return () => {
      window.removeEventListener('resize', updateViewportState);
    };
  }, []);

  const [firstWord, restOfTitle] = useMemo(() => {
    if (!title) {
      return ['', ''];
    }

    const words = title.trim().split(' ');
    return [words[0], words.slice(1).join(' ')];
  }, [title]);

  const resolvedBackgroundSrc = bgImageSrc || mediaSrc;

  return (
    <div
      id={id}
      className='overflow-x-hidden transition-colors duration-700 ease-in-out'
    >
      <section ref={sectionRef} className='relative min-h-[150vh]'>
        <motion.div
          className='sticky top-0 z-0 flex min-h-[100dvh] w-full flex-col items-center justify-start overflow-hidden'
          style={{ opacity: stickyOpacity }}
        >
          <motion.div className='absolute inset-0 z-0 h-full' style={{ opacity: backgroundOpacity }}>
            <img
              src={resolvedBackgroundSrc}
              alt='Background'
              loading='lazy'
              decoding='async'
              className='h-screen w-screen object-cover object-center'
            />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container relative z-10 mx-auto flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden'>
            <motion.div
              className='absolute left-1/2 top-1/2 z-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl shadow-[0px_0px_50px_rgba(0,0,0,0.3)]'
              style={{
                width: mediaWidth,
                height: mediaHeight,
                willChange: 'width, height, transform',
              }}
            >
              {mediaType === 'video' ? (
                mediaSrc?.includes('youtube.com') ? (
                  <div className='relative h-full w-full pointer-events-none'>
                    <iframe
                      width='100%'
                      height='100%'
                      src={getYouTubeEmbedSrc(mediaSrc)}
                      className='h-full w-full rounded-xl'
                      title='Embedded media player'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    />
                    <motion.div className='absolute inset-0 rounded-xl bg-black/50' style={{ opacity: mediaOverlayOpacity }} />
                  </div>
                ) : (
                  <div className='relative h-full w-full pointer-events-none'>
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload='auto'
                      className='h-full w-full rounded-xl object-cover'
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />
                    <motion.div className='absolute inset-0 rounded-xl bg-black/50' style={{ opacity: mediaOverlayOpacity }} />
                  </div>
                )
              ) : (
                <div className='relative h-full w-full'>
                  <img
                    src={mediaSrc}
                    alt={title || 'Media content'}
                    loading='lazy'
                    decoding='async'
                    className='h-full w-full rounded-xl object-cover'
                  />
                  <motion.div className='absolute inset-0 rounded-xl bg-black/50' style={{ opacity: mediaOverlayOpacity }} />
                </div>
              )}

              <motion.div
                className='pointer-events-none absolute bottom-5 left-1/2 z-20 flex w-[min(92vw,620px)] -translate-x-1/2 flex-col items-center gap-1 px-4 text-center'
                style={{ opacity: helperTextOpacity }}
              >
                {date && (
                  <motion.p className='max-w-full text-lg font-semibold text-blue-200 md:text-2xl' style={{ x: inverseTextTranslateX }}>
                    {date}
                  </motion.p>
                )}
                {scrollToExpand && (
                  <motion.p className='text-center text-xs font-medium uppercase tracking-[0.16em] text-blue-100 md:text-sm' style={{ x: textTranslateX }}>
                    {scrollToExpand}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>

            <div
              className={`pointer-events-none relative z-10 flex w-full max-w-[92vw] flex-col items-center justify-center gap-3 px-4 text-center ${
                textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
              }`}
            >
              <motion.h2
                className='mx-auto max-w-[14ch] break-words text-3xl font-bold leading-[0.95] text-blue-200 sm:text-4xl md:text-5xl lg:text-6xl'
                style={{ x: inverseTextTranslateX }}
              >
                {firstWord}
              </motion.h2>
              <motion.h2
                className='mx-auto max-w-[14ch] break-words text-center text-3xl font-bold leading-[0.95] text-blue-200 sm:text-4xl md:text-5xl lg:text-6xl'
                style={{ x: textTranslateX }}
              >
                {restOfTitle}
              </motion.h2>
            </div>
          </div>
        </motion.div>

        <motion.section
          className='relative z-10 flex w-full flex-col px-8 pb-10 pt-16 md:px-16 md:pt-20 lg:pb-20 lg:pt-24'
          style={{ opacity: contentOpacity }}
        >
          {children}
        </motion.section>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
