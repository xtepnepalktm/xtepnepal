
"use client";

import { useRef, useMemo, useEffect } from "react";
import { m, useInView, useAnimation } from "framer-motion";

// ----------------------------------------------------------------------

const srOnlyClass =
  "absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 clip-rect-0";

// ----------------------------------------------------------------------

export function AnimateText({
  className = "",
  variants,
  textContent,
  once = true,
  amount = 1 / 3,
  component: Component = "p",

  // 1000 = 1s
  repeatDelayMs = 100,

  ...other
}) {
  const textRef = useRef(null);

  const animationControls = useAnimation();

  const textArray = useMemo(
    () => (Array.isArray(textContent) ? textContent : [textContent]),
    [textContent]
  );

  const isInView = useInView(textRef, { once, amount });

  useEffect(() => {
    let timeout;

    const triggerAnimation = () => {
      if (repeatDelayMs) {
        timeout = setTimeout(async () => {
          await animationControls.start("initial");
          animationControls.start("animate");
        }, repeatDelayMs);
      } else {
        animationControls.start("animate");
      }
    };

    if (isInView) {
      triggerAnimation();
    } else {
      animationControls.start("initial");
    }

    return () => clearTimeout(timeout);
  }, [animationControls, isInView, repeatDelayMs]);

  return (
    <Component className={`m-0 p-0 ${className}`} {...other}>
      {/* Screen reader text */}
      <span className={srOnlyClass}>{textArray.join(" ")}</span>

      <m.span
        ref={textRef}
        initial="initial"
        animate={animationControls}
        exit="exit"
        variants={containerVariants}
        aria-hidden
        className="inline-block"
      >
        {textArray?.map((line, lineIndex) => (
          <span
            key={`${line}-${lineIndex}`}
            data-index={lineIndex}
            className="block"
          >
            {line.split(" ").map((word, wordIndex) => {
              const lastWordInline =
                line.split(" ")[line.split(" ").length - 1];

              return (
                <span
                  key={`${word}-${wordIndex}`}
                  data-index={wordIndex}
                  className="inline-block"
                >
                  {word.split("").map((char, charIndex) => (
                    <m.span
                      key={`${char}-${charIndex}`}
                      variants={variants ?? fadeUpVariant}
                      data-index={charIndex}
                      className="inline-block"
                    >
                      {char}
                    </m.span>
                  ))}

                  {lastWordInline !== word && (
                    <span className="inline-block">&nbsp;</span>
                  )}
                </span>
              );
            })}
          </span>
        ))}
      </m.span>
    </Component>
  );
}

// ----------------------------------------------------------------------
// Default Container Variant
// ----------------------------------------------------------------------

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

// ----------------------------------------------------------------------
// Default Character Animation Variant
// ----------------------------------------------------------------------

const fadeUpVariant = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.64,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    y: 24,
  },
};