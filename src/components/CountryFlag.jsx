import React, { useState } from 'react';

export function CountryFlag({ code, flag, className = "w-8 h-6" }) {
  const [imgError, setImgError] = useState(false);

  if (!code) return <span className="text-xl">{flag || '🏳️'}</span>;

  const primaryFlagUrl = `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
  const secondaryFlagUrl = `https://flagcdn.com/${code.toLowerCase()}.svg`;

  return (
    <span className={`inline-flex items-center justify-center overflow-hidden rounded shadow-sm bg-slate-100 dark:bg-slate-800 shrink-0 ${className}`}>
      {!imgError ? (
        <img
          src={primaryFlagUrl}
          alt={`${code} flag`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            if (e.target.src !== secondaryFlagUrl) {
              e.target.src = secondaryFlagUrl;
            } else {
              setImgError(true);
            }
          }}
        />
      ) : (
        <span className="text-xl font-bold">{flag || '🏳️'}</span>
      )}
    </span>
  );
}
