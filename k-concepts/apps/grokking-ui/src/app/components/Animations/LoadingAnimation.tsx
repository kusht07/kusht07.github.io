import React, { useState, useEffect } from 'react';

const LoadingAnimation: React.FC = () => {
  const [animationFrame, setAnimationFrame] = useState(0);
  const frames = ['(-_-)', '(o_o)', '(O_O)', '(^_^)'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimationFrame((prev) => (prev + 1) % frames.length);
    }, 500); // 750ms * 4 frames = 3 seconds total duration

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary-500">
      <div className="text-white text-4xl font-mono animate-bounce">
        {frames[animationFrame]} Loading...
      </div>
    </div>
  );
};

export default LoadingAnimation;