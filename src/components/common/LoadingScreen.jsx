import Logo from './Logo';

export default function LoadingScreen({ message = 'Loading...', fullScreen = false }) {
  return (
    <div className={`loading-screen flex flex-col items-center justify-center gap-4 ${fullScreen ? 'min-h-screen w-full absolute top-0 left-0 bg-primary z-fixed' : 'p-8 h-full w-full'}`} style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="animate-pulse">
        <Logo size="lg" link={false} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="spinner" style={{
          width: 32,
          height: 32,
          border: '3px solid var(--color-primary-100)',
          borderBottomColor: 'var(--color-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <span className="text-muted text-sm font-medium animate-fade-in">{message}</span>
      </div>
    </div>
  );
}
