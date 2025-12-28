const LoadingSpinner = () => {
  return (
    <div className="text-center py-10">
      <div className="w-20 h-20 relative mx-auto mb-5">
        <div className="absolute inset-0 rounded-full border-[6px] border-foreground/10 border-t-accent animate-spin-slow" />
      </div>
      <p className="text-lg text-foreground/90 font-medium">
        Searching database...
      </p>
    </div>
  );
};

export default LoadingSpinner;
