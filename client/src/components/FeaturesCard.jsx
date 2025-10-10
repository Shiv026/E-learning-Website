import React from 'react';

const FeatureCard = ({ title, description, icon: IconComponent, colorClass }) => {
  return (
    <div className="text-center"> {/* Center content within the card */}
      {IconComponent && (
        // Icon container with circular background and dynamic color
        <div className={`flex items-center justify-center w-20 h-20 rounded-full ${colorClass} bg-current/10 mx-auto mb-4`}>
          <IconComponent size={37} /> {/* Icon size */}
        </div>
      )}
      {/* Apply colorClass to the title h3 tag */}
      <h3 className={`text-2xl font-display font-semi-bold mb-2 ${colorClass}`}>{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default FeatureCard;