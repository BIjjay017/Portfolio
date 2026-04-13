"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

export const BoxesCore = ({ className, ...rest }) => {
  const rows = React.useMemo(() => new Array(150).fill(1), []);
  const cols = React.useMemo(() => new Array(100).fill(1), []);

  const colors = React.useMemo(
    () => [
      'rgb(125 211 252)',
      'rgb(249 168 212)',
      'rgb(134 239 172)',
      'rgb(253 224 71)',
      'rgb(252 165 165)',
      'rgb(216 180 254)',
      'rgb(147 197 253)',
      'rgb(165 180 252)',
      'rgb(196 181 253)',
    ],
    []
  );

  const getRandomColor = React.useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);

  return (
    <div
      className={cn(
        'absolute left-1/4 -top-1/4 z-0 flex h-full w-full -translate-x-1/2 -translate-y-1/2 p-4 [transform:translate(-40%,-60%)_skewX(-48deg)_skewY(14deg)_scale(0.675)_rotate(0deg)_translateZ(0)]',
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row${i}`}
          className='relative h-8 w-16 border-l border-slate-700'
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col${j}`}
              className='relative h-8 w-16 border-r border-t border-slate-700'
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <Plus
                  className='pointer-events-none absolute -left-[22px] -top-[14px] h-6 w-10 text-slate-700 stroke-[1px]'
                />
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
