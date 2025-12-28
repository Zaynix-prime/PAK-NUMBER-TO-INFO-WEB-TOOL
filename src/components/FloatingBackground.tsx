const FloatingBackground = () => {
  const spans = [
    { left: '25%', width: 80, height: 80, delay: '0s', duration: '25s' },
    { left: '10%', width: 20, height: 20, delay: '2s', duration: '12s' },
    { left: '70%', width: 20, height: 20, delay: '4s', duration: '25s' },
    { left: '40%', width: 60, height: 60, delay: '0s', duration: '18s' },
    { left: '65%', width: 20, height: 20, delay: '0s', duration: '25s' },
    { left: '75%', width: 110, height: 110, delay: '3s', duration: '25s' },
    { left: '35%', width: 150, height: 150, delay: '7s', duration: '25s' },
    { left: '50%', width: 25, height: 25, delay: '15s', duration: '45s' },
    { left: '20%', width: 15, height: 15, delay: '2s', duration: '35s' },
    { left: '85%', width: 150, height: 150, delay: '0s', duration: '11s' },
  ];

  return (
    <div className="floating-bg fixed inset-0 z-0 opacity-30 overflow-hidden pointer-events-none">
      {spans.map((span, index) => (
        <span
          key={index}
          style={{
            left: span.left,
            width: span.width,
            height: span.height,
            animationDelay: span.delay,
            animationDuration: span.duration,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBackground;
