import { Link } from 'react-router-dom';

export default function Logo({ size = 'md', link = true, light = false }) {
  const sizeMap = {
    sm: { img: 28, text: 'var(--text-base)' },
    md: { img: 40, text: 'var(--text-lg)' },
    lg: { img: 56, text: 'var(--text-2xl)' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`logo-container flex items-center gap-3 ${light ? 'logo-light' : ''}`} style={{ userSelect: 'none' }}>
      <img
        src="/havilla-logo.png"
        alt="Havilla University Logo"
        style={{
          width: currentSize.img,
          height: currentSize.img,
          objectFit: 'contain',
        }}
        onError={(e) => {
          // fallback if logo is not found
          e.target.style.display = 'none';
        }}
      />
      {/* <div className="logo-text-wrapper flex flex-col justify-center">
        <span className="font-extrabold tracking-tight text-primary-color" style={{ fontSize: currentSize.text, lineHeight: 1.1, color: light ? 'var(--color-accent)' : 'var(--color-primary)' }}>
          HAVILLA
        </span>
        <span className="font-semibold text-overline" style={{ fontSize: `calc(${currentSize.text} * 0.45)`, color: light ? 'var(--text-inverse)' : 'var(--text-secondary)' }}>
          UNIVERSITY
        </span>
      </div> */}
    </div>
  );

  if (link) {
    return <Link to="/">{content}</Link>;
  }

  return content;
}
