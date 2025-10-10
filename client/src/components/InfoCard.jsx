import React from 'react';

export default function InfoCard({ title, titleColor, description, icon: IconComponent }) {
  return (
    <div className="text-center"> {/* This centers the icon and title */}
      {/* Render the icon, centered and with its circular background and matching color */}
      {IconComponent && (
        <div className={`flex items-center justify-center w-14 h-14 rounded-full bg-current/10 ${titleColor} mx-auto mb-4`}>
          <IconComponent size={28} /> {/* Adjust icon size to fit */}
        </div>
      )}
      {/* Title, centered below the icon */}
      <h3 className={`text-2xl font-display font-semi-bold mb-2 ${titleColor}`}>
        {title}
      </h3>
      {/* Description text, explicitly left-aligned within the card */}
      <p className="text-gray-700 text-justify">{description}</p>
    </div>
  );
}