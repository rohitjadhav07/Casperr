export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield outline */}
      <path 
        d="M20 2L4 8V18C4 27.5 10.5 36 20 38C29.5 36 36 27.5 36 18V8L20 2Z" 
        stroke="url(#gradient1)" 
        strokeWidth="2" 
        fill="none"
      />
      
      {/* Checkmark */}
      <path 
        d="M12 20L17 25L28 14" 
        stroke="url(#gradient2)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Inner geometric pattern */}
      <circle cx="20" cy="20" r="3" fill="url(#gradient3)"/>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0EA5E9"/>
          <stop offset="100%" stopColor="#06B6D4"/>
        </linearGradient>
        <linearGradient id="gradient2" x1="12" y1="14" x2="28" y2="25" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0EA5E9"/>
          <stop offset="100%" stopColor="#06B6D4"/>
        </linearGradient>
        <linearGradient id="gradient3" x1="17" y1="17" x2="23" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0EA5E9"/>
          <stop offset="100%" stopColor="#06B6D4"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M12 2L3 6V12C3 17.5 7 22 12 23C17 22 21 17.5 21 12V6L12 2Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        fill="none"
      />
      <path 
        d="M8 12L10.5 14.5L16 9" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}