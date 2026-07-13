import { SVGProps } from 'react';

/**
 * Static Sparky mascot face — flat yellow smiley icon used in the
 * "Ask Sparky" chat bottom sheet header and the Sparky chat FAB.
 * Unlike the other Sparky assets, this is a plain SVG (no Lottie)
 * for contexts that need a still, tiny avatar.
 */
export function SparkyFace(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <clipPath id="sparkyFaceClip">
          <circle cx="24" cy="24" r="24" />
        </clipPath>
      </defs>
      <g clipPath="url(#sparkyFaceClip)">
        <circle cx="24" cy="24" r="24" fill="#F2A73B" />
        <circle cx="19" cy="19" r="24" fill="#FFC220" />
      </g>
      <rect x="14.5" y="19" width="4.5" height="10" rx="2.25" fill="#001E60" transform="rotate(-6 16.75 24)" />
      <rect x="29" y="19" width="4.5" height="10" rx="2.25" fill="#001E60" transform="rotate(6 31.25 24)" />
      <path d="M14.5 30C17 35 21 37.5 24 37.5C27 37.5 31 35 33.5 30" stroke="#001E60" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default SparkyFace;
