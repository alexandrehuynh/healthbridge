export default function HeroNewcomers() {
  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full h-auto max-w-lg mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sky and background */}
      <rect width="600" height="400" fill="#F0F9FF" />
      
      {/* Montreal skyline silhouette */}
      <path
        d="M0 280 L50 260 L100 240 L150 220 L200 200 L250 190 L300 185 L350 180 L400 175 L450 170 L500 165 L550 160 L600 155 L600 400 L0 400 Z"
        fill="#E5E7EB"
        opacity="0.3"
      />
      
      {/* Quebec landmark (stylized building) */}
      <rect x="350" y="120" width="40" height="60" fill="#6B7280" opacity="0.4" />
      <rect x="355" y="110" width="30" height="20" fill="#6B7280" opacity="0.4" />
      
      {/* Family group - diverse newcomers */}
      {/* Parent 1 (woman with hijab) */}
      <ellipse cx="180" cy="240" rx="25" ry="35" fill="#FEF3C7" />
      <path d="M155 210 Q180 190 205 210 Q200 240 180 250 Q160 240 155 210 Z" fill="#3B82F6" />
      <circle cx="180" cy="220" r="15" fill="#F59E0B" />
      <circle cx="175" cy="217" r="2" fill="#1F2937" />
      <circle cx="185" cy="217" r="2" fill="#1F2937" />
      <path d="M175 225 Q180 230 185 225" stroke="#1F2937" strokeWidth="1.5" fill="none" />
      
      {/* Parent 2 (man) */}
      <ellipse cx="240" cy="245" rx="28" ry="38" fill="#2563EB" />
      <circle cx="240" cy="215" r="18" fill="#D4A574" />
      <path d="M230 200 Q240 190 250 200 Q245 210 240 215 Q235 210 230 200 Z" fill="#1F2937" />
      <circle cx="235" cy="212" r="2" fill="#1F2937" />
      <circle cx="245" cy="212" r="2" fill="#1F2937" />
      <path d="M235 220 Q240 225 245 220" stroke="#1F2937" strokeWidth="1.5" fill="none" />
      
      {/* Child */}
      <ellipse cx="210" cy="275" rx="18" ry="25" fill="#10B981" />
      <circle cx="210" cy="260" r="12" fill="#F3D5A7" />
      <path d="M202 250 Q210 245 218 250 Q215 258 210 260 Q205 258 202 250 Z" fill="#92400E" />
      <circle cx="207" cy="257" r="1.5" fill="#1F2937" />
      <circle cx="213" cy="257" r="1.5" fill="#1F2937" />
      <path d="M207 262 Q210 265 213 262" stroke="#1F2937" strokeWidth="1" fill="none" />
      
      {/* Luggage */}
      <rect x="120" y="270" width="25" height="35" rx="3" fill="#7C3AED" />
      <rect x="125" y="265" width="15" height="8" rx="2" fill="#5B21B6" />
      <circle cx="125" cy="290" r="3" fill="#374151" />
      <circle cx="140" cy="290" r="3" fill="#374151" />
      
      {/* Document/papers */}
      <rect x="280" y="260" width="20" height="25" rx="2" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
      <rect x="283" y="265" width="14" height="2" fill="#3B82F6" />
      <rect x="283" y="270" width="10" height="1" fill="#6B7280" />
      <rect x="283" y="273" width="12" height="1" fill="#6B7280" />
      
      {/* Hearts/positive emotion indicators */}
      <path d="M320 180 C315 175 305 175 300 185 C295 175 285 175 280 180 C280 190 300 205 300 205 C300 205 320 190 320 180 Z" fill="#F87171" opacity="0.6" />
      
      {/* Welcome elements */}
      <text x="450" y="100" fill="#1E40AF" fontSize="24" fontWeight="bold" fontFamily="Arial">Bienvenue!</text>
      <text x="460" y="125" fill="#059669" fontSize="20" fontWeight="600" fontFamily="Arial">Welcome!</text>
      
      {/* Path/journey line */}
      <path
        d="M100 320 Q200 310 300 315 Q400 320 500 310"
        stroke="#10B981"
        strokeWidth="3"
        fill="none"
        strokeDasharray="5,5"
        opacity="0.7"
      />
      
      {/* Quebec flag elements (subtle) */}
      <rect x="480" y="60" width="30" height="20" fill="#003D7A" opacity="0.3" />
      <path d="M485 65 L490 70 L485 75 L495 75 L500 70 L495 65 Z" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}