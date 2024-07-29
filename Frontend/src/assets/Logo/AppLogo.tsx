import React from "react";

const AppLogo = () => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="50" y="80" width="100" height="100" fill="#7B61FF" />
      <polygon points="40,80 100,30 160,80" fill="#5A30B5" />
      <rect x="90" y="130" width="20" height="50" fill="#9B79FF" />
      <text
        x="100"
        y="190"
        fontSize="24"
        fontWeight="bold"
        textAnchor="middle"
        fill="#5A30B5"
      >
        UrbanNest
      </text>
    </svg>
  );
};

export default AppLogo;
