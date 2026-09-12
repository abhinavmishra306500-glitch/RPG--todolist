import React, { useEffect, useState, useRef } from 'react';

interface AnimatedStatNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

export const AnimatedStatNumber: React.FC<AnimatedStatNumberProps> = ({
  value,
  duration = 500,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const startVal = prevValueRef.current;
    const endVal = value;
    prevValueRef.current = value;

    if (startVal === endVal) {
      return;
    }

    const startTime = performance.now();

    const updateValue = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentInterpolated = Math.round(startVal + (endVal - startVal) * easeProgress);

      setDisplayValue(currentInterpolated);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        setDisplayValue(endVal);
      }
    };

    const animId = requestAnimationFrame(updateValue);
    return () => cancelAnimationFrame(animId);
  }, [value, duration]);

  return <span className={className}>{displayValue}</span>;
};
