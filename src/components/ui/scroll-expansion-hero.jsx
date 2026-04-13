import React, {
  useEffect,
  useRef,
  useReducer
} from 'react';
import { motion } from 'framer-motion';

const initialState = {
  scrollProgress: 0,
  showContent: false,
  mediaFullyExpanded: false,
  touchStartY: 0,
  isMobileState: false,
};

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

function scrollExpandMediaReducer(state, action) {
  if (action.type === 'RESET_MEDIA') {
    return {
      ...state,
      scrollProgress: 0,
      showContent: false,
      mediaFullyExpanded: false,
      touchStartY: 0,
    };
  }

  if (action.type === 'SET_PROGRESS') {
    const scrollProgress = clamp(action.payload, 0, 1);

    return {
      ...state,
      scrollProgress,
      mediaFullyExpanded: scrollProgress >= 1,
      showContent: scrollProgress >= 0.75,
    };
  }

  if (action.type === 'SET_TOUCH_START') {
    return {
      ...state,
      touchStartY: action.payload,
    };
  }

  if (action.type === 'CLEAR_TOUCH_START') {
    return {
      ...state,
      touchStartY: 0,
    };
  }

  if (action.type === 'SET_MOBILE') {
    return {
      ...state,
      isMobileState: action.payload,
    };
  }

  if (action.type === 'COLLAPSE_MEDIA') {
    return {
      ...state,
      mediaFullyExpanded: false,
      showContent: false,
    };
  }

  return state;
}

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
  const [state, dispatch] = useReducer(scrollExpandMediaReducer, initialState);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    dispatch({ type: 'RESET_MEDIA' });
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e) => {
      const currentState = stateRef.current;

      if (currentState.mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        dispatch({ type: 'COLLAPSE_MEDIA' });
        e.preventDefault();
      } else if (!currentState.mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        dispatch({
          type: 'SET_PROGRESS',
          payload: currentState.scrollProgress + scrollDelta,
        });
      }
    };

    const handleTouchStart = (e) => {
      dispatch({ type: 'SET_TOUCH_START', payload: e.touches[0].clientY });
    };

    const handleTouchMove = (e) => {
      const currentState = stateRef.current;
      if (!currentState.touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = currentState.touchStartY - touchY;

      if (currentState.mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        dispatch({ type: 'COLLAPSE_MEDIA' });
        e.preventDefault();
      } else if (!currentState.mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        dispatch({
          type: 'SET_PROGRESS',
          payload: currentState.scrollProgress + scrollDelta,
        });
        dispatch({ type: 'SET_TOUCH_START', payload: touchY });
      }
    };

    const handleTouchEnd = () => {
      dispatch({ type: 'CLEAR_TOUCH_START' });
    };

    const handleScroll = () => {
      if (!stateRef.current.mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, {
      passive: false,
    });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener(
      'touchstart',
      handleTouchStart,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = () => {
      dispatch({ type: 'SET_MOBILE', payload: window.innerWidth < 768 });
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = 300 + state.scrollProgress * (state.isMobileState ? 650 : 1250);
  const mediaHeight = 400 + state.scrollProgress * (state.isMobileState ? 200 : 400);
  const textTranslateX = state.scrollProgress * (state.isMobileState ? 180 : 220);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      id={id}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - state.scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt='Background'
              loading="lazy" 
              decoding="async"
              className='w-screen h-screen object-cover object-center'
            />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative overflow-hidden'>
              <motion.div
                className='absolute z-0 top-1/2 left-1/2 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-none rounded-2xl shadow-[0px_0px_50px_rgba(0,0,0,0.3)]'
                animate={{ width: mediaWidth, height: mediaHeight }}
                transition={{ duration: 0.12, ease: 'linear' }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl'
                        title='Embedded media player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div className='absolute inset-0 z-10 pointer-events-none'></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - state.scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div className='absolute inset-0 z-10 pointer-events-none'></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 0.5 - state.scrollProgress * 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      loading="lazy" 
                      decoding="async"
                      className='w-full h-full object-cover rounded-xl'
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - state.scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                  {date && (
                    <motion.p
                      className='text-2xl text-blue-200'
                      animate={{ x: -textTranslateX }}
                      transition={{ duration: 0.15, ease: 'linear' }}
                    >
                      {date}
                    </motion.p>
                  )}
                  {scrollToExpand && (
                    <motion.p
                      className='text-blue-200 font-medium text-center'
                      animate={{ x: textTranslateX }}
                      transition={{ duration: 0.15, ease: 'linear' }}
                    >
                      {scrollToExpand}
                    </motion.p>
                  )}
                </div>
              </motion.div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200 transition-none'
                  animate={{ x: -textTranslateX }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-200 transition-none'
                  animate={{ x: textTranslateX }}
                  transition={{ duration: 0.15, ease: 'linear' }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: state.showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
