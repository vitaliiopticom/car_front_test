import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialTimeInMinutes: number;
  currentTimeInMinutes: number;
  onTimeUp?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialTimeInMinutes,
  currentTimeInMinutes,
  onTimeUp,
}) => {
  const totalTime = initialTimeInMinutes * 60;
  const currentTime = currentTimeInMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(currentTime);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp && onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const getStyles = (): React.CSSProperties => {
    let backgroundColor;
    const twoThirdsOfTotal = (2 / 3) * totalTime;
    const oneThirdOfTotal = (1 / 3) * totalTime;

    if (timeLeft > twoThirdsOfTotal) {
      backgroundColor = '#90EE90'; // Green
    } else if (timeLeft > oneThirdOfTotal) {
      backgroundColor = '#FFD700'; // Orange
    } else {
      backgroundColor = '#FFB6C1'; // Red
    }

    return {
      backgroundColor,
      color: 'black',
      padding: '5px',
      borderRadius: '5px',
      textAlign: 'center' as React.CSSProperties['textAlign'],
      minWidth: '50px',
    };
  };

  const getProgressBarWidth = () => {
    const percentage = (timeLeft / totalTime) * 100;
    return `${percentage}%`;
  };

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div style={{ position: 'relative', ...getStyles() }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: getProgressBarWidth(),
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: '5px',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{formatTimeLeft()}</div>
    </div>
  );
};

export default CountdownTimer;
