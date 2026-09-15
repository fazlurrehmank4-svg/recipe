import React from 'react';

export function CountryFlag({ code, flag, className = "w-8 h-6" }) {
  if (!code) return <span>{flag || '🏳️'}</span>;

  const flagUrl = `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

  return (
    <span className={`inline-flex items-center justify-center overflow-hidden rounded shadow-sm bg-slate-100 dark:bg-slate-800 shrink-0 ${className}`}>
      <img
        src={flagUrl}
        alt={`${code} flag`}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = flag || '🏳️';
        }}
      />
    </span>
  );
}
