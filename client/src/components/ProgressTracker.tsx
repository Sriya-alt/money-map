import React from 'react';

interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-tracker">
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
    </div>
  );
};

export default ProgressTracker;