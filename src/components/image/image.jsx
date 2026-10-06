'use client';

import { useInView } from 'framer-motion';
import { useRef, useState, forwardRef, useCallback, startTransition } from 'react';
import clsx from 'clsx';

import { mergeRefs } from 'minimal-shared/utils';
import { imageClasses } from './classes';

const DEFAULT_DELAY = 0;
const DEFAULT_EFFECT = {
  style: 'blur',
  duration: 300,
  disabled: false,
};

const placeholderImage =
  'data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJhZGlhbEdyYWRpZW50IGlkPSJhIiBjeD0iNTAlIiBjeT0iNDYuODAxMTAyJSIgcj0iOTUuNDk3MTEyJSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOTE5ZWFiIiBzdG9wLW9wYWNpdHk9Ii40OCIgLz48L3JhZGlhbEdyYWRpZW50PjxwYXRoIGQ9Im04OCA4Nmg1MTJ2NTEyaC01MTJ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04OCAtODYpIiAvPjwvc3ZnPg==';

export const Image = forwardRef((props, ref) => {
  const {
    src,
    alt = '',
    className = '',
    effect,
    aspectRatio = '1 / 1',
    overlay,
    viewportOptions,
    visibleByDefault = false,
    disablePlaceholder,
    delayTime = DEFAULT_DELAY,
    onLoad,
    slotProps,
    ...other
  } = props;

  const localRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const isInView = useInView(localRef, {
    once: true,
    ...viewportOptions,
  });

  const finalEffect = {
    ...DEFAULT_EFFECT,
    ...(effect ?? {}),
  };

  const handleImageLoad = useCallback(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        setIsLoaded(true);
        onLoad?.();
      });
    }, delayTime);

    return () => clearTimeout(timer);
  }, [delayTime, onLoad]);

  const shouldRenderImage = visibleByDefault || isInView;
  const showPlaceholder = !visibleByDefault && !isLoaded && !disablePlaceholder;

  const effectMap = {
    opacity: {
      hidden: 'opacity-0',
      visible: 'opacity-100',
    },
    blur: {
      hidden: 'opacity-0 blur-md',
      visible: 'opacity-100 blur-0',
    },
    'black-and-white': {
      hidden: 'opacity-0 grayscale',
      visible: 'opacity-100 grayscale-0',
    },
  };

  const stateClass = isLoaded
    ? effectMap[finalEffect.style]?.visible || 'opacity-100'
    : effectMap[finalEffect.style]?.hidden || 'opacity-0';

  return (
    <span
      ref={mergeRefs([localRef, ref])}
      className={clsx(
        'relative inline-block max-w-full overflow-hidden align-bottom',
        className
      )}
      style={{ aspectRatio }}
      {...other}
    >
      {/* Placeholder */}
      {showPlaceholder && (
        <span
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${placeholderImage})` }}
        />
      )}

      {/* Image */}
      {shouldRenderImage && (
        <img
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          className={clsx(
            'absolute inset-0 w-full h-full object-cover transition-all',
            stateClass
          )}
          style={{
            transitionDuration: `${finalEffect.duration}ms`,
          }}
        />
      )}

      {/* Overlay */}
      {overlay && <span className="absolute inset-0 z-10">{overlay}</span>}
    </span>
  );
});