import React from 'react';

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'square' as const,
};

const signs = [
  // Bull head with horns
  <path key="bull" d="M4 5c0 6 3 9 8 9s8-3 8-9M9 14v5h6v-5" {...strokeProps} />,
  // Fish
  <path key="fish" d="M3 12c4-5 10-5 14 0-4 5-10 5-14 0ZM17 12l4-4M17 12l4 4" {...strokeProps} />,
  // Jar
  <path key="jar" d="M7 4h10M8 4v3c-2 2-3 5-3 8 0 3 2 5 7 5s7-2 7-5c0-3-1-6-3-8V4" {...strokeProps} />,
  // Eye — circle with centre dot
  <g key="eye" {...strokeProps}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </g>,
  // Grid seal
  <g key="grid" {...strokeProps}>
    <rect x="4" y="4" width="16" height="16" />
    <path d="M9.3 4v16M14.7 4v16M4 9.3h16M4 14.7h16" />
  </g>,
  // Stacked chevrons
  <path key="chevrons" d="M5 18l7-5 7 5M5 12l7-5 7 5M5 6l7-5 7 5" {...strokeProps} />,
  // Standing figure
  <g key="figure" {...strokeProps}>
    <circle cx="12" cy="5" r="2.5" />
    <path d="M12 8v9M6 11h12M12 17l-4 4M12 17l4 4" />
  </g>,
  // Branching plant
  <path key="plant" d="M12 21V6M12 12c-3 0-5-2-5-5M12 12c3 0 5-2 5-5M12 17c-2.5 0-4-1.5-4-4M12 17c2.5 0 4-1.5 4-4" {...strokeProps} />,
];

const ScriptBand = () => {
  return (
    <section className="bg-lapis text-stonepage band-section">
      <div className="max-w-6xl mx-auto">
        <ul
          className="flex flex-wrap justify-center gap-x-8 gap-y-6 text-ember mb-10"
          aria-label="Carved Indus Valley signs"
        >
          {signs.map((sign, i) => (
            <li key={i} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
                {sign}
              </svg>
            </li>
          ))}
        </ul>

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="band-heading">The script nobody can read</h2>
          <p className="text-lg md:text-xl leading-relaxed text-stonepage/90">
            Thousands of Indus Valley seals survive, carved with signs that
            scholars have never decoded. In this book, a boy from Mumbai reads
            them — and that is exactly why he is hunted.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScriptBand;
