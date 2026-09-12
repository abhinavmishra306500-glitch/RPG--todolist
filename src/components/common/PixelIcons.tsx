import React from 'react';

interface PixelIconProps {
  className?: string;
  size?: number;
}

export const PixelSword: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    style={{ imageRendering: 'pixelated' }}
  >
    <path
      d="M13 1h2v2h-2zm-2 2h2v2h-2zm-2 2h2v2H9zm-2 2h2v2H7zM5 9h2v2H5zm-2 2h2v2H3zm-2 2h2v2H1zm1-1h1v1H2zm9-7h1v1h-1zm-6 8H2v-1h2v-2h1v3zm7-7h1V5h-1V4h-1v2h1z"
      fillRule="evenodd"
    />
  </svg>
);

export const PixelShield: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    style={{ imageRendering: 'pixelated' }}
  >
    <path
      d="M2 2h12v2h-1v6h-1v2h-2v2H8v-2H6v-2H5V4H4V2H2zm2 2v6h1v2h2v2h2v-2h2v-2h1V4H4z"
      fillRule="evenodd"
    />
  </svg>
);

export const PixelWrench: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    style={{ imageRendering: 'pixelated' }}
  >
    <path
      d="M10 1h4v2h1v4h-2v1h-1v1l-6 6H2v-4l6-6h1V4h1V1zm1 3v2h2V3h-1V2h-1v2zm-6 7l5-5h-1V5h-1v1L4 10v2h2v-1H5z"
      fillRule="evenodd"
    />
  </svg>
);

export const PixelKey: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    style={{ imageRendering: 'pixelated' }}
  >
    <path
      d="M9 1h5v5h-2v2h-1v2h-2v2H7v-2H5v-1H3v-2H1V5h2V3h2V1h4zm3 2h-1v2h2V3h-1zM5 5H3v2h2V5z"
      fillRule="evenodd"
    />
  </svg>
);

export const PixelSparkle: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    style={{ imageRendering: 'pixelated' }}
  >
    <path
      d="M7 1h2v3h3v2H9v3H7V6H4V4h3V1zm-4 8h2v2h2v1H5v2H3v-2H1v-1h2V9zm9 1h2v2h2v1h-2v2h-2v-2h-2v-1h2v-2z"
      fillRule="evenodd"
    />
  </svg>
);

export const PixelHeart: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    style={{ imageRendering: 'pixelated' }}
  >
    <path
      d="M2 3h3v2H2zm3-1h2v2H5zm4 0h2v2H9zm3 1h3v2h-3zm2 2h1v3h-1zm-1 3h-1v2h1zm-2 2h-2v2H9zm-2 2H7v1h2zm-2-2H3v2h2zm-2-2H2v2h1zm-2-3H1V5h1zm2-3h2v2H3z"
      fillRule="evenodd"
    />
  </svg>
);

export const PixelCrown: React.FC<PixelIconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    style={{ imageRendering: 'pixelated' }}
  >
    <path
      d="M2 4h2v3H2zm10 0h2v3h-2zm-5 1h2v3H7zM3 9h10v2H3zm-1 2h12v2H2z"
      fillRule="evenodd"
    />
  </svg>
);
