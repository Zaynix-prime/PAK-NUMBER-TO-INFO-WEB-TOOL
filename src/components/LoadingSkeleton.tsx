import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton = () => {
  return (
    <div className="mt-10 animate-slide-up">
      {/* Header skeleton */}
      <div className="bg-gradient-to-r from-secondary to-primary rounded-t-2xl p-6 flex justify-between items-center">
        <Skeleton className="h-8 w-40 bg-foreground/20" />
        <div className="flex gap-4">
          <Skeleton className="w-11 h-11 rounded-full bg-foreground/20" />
          <Skeleton className="w-11 h-11 rounded-full bg-foreground/20" />
        </div>
      </div>
      
      {/* Results skeleton */}
      <div className="bg-foreground/95 rounded-b-2xl p-8 space-y-5">
        {[1, 2].map((index) => (
          <div key={index} className="result-item">
            <Skeleton className="h-7 w-32 mb-5 bg-primary/20" />
            
            <div className="space-y-4">
              {/* Mobile Number */}
              <div className="flex flex-col sm:flex-row pb-4 border-b border-muted/20">
                <Skeleton className="h-5 w-32 mb-2 sm:mb-0 bg-muted/30" />
                <Skeleton className="h-5 w-48 bg-primary/20 ml-0 sm:ml-4" />
              </div>
              
              {/* Full Name */}
              <div className="flex flex-col sm:flex-row pb-4 border-b border-muted/20">
                <Skeleton className="h-5 w-24 mb-2 sm:mb-0 bg-muted/30" />
                <Skeleton className="h-5 w-56 bg-primary/20 ml-0 sm:ml-4" />
              </div>
              
              {/* CNIC */}
              <div className="flex flex-col sm:flex-row pb-4 border-b border-muted/20">
                <Skeleton className="h-5 w-28 mb-2 sm:mb-0 bg-muted/30" />
                <Skeleton className="h-5 w-44 bg-primary/20 ml-0 sm:ml-4" />
              </div>
              
              {/* Address */}
              <div className="flex flex-col sm:flex-row">
                <Skeleton className="h-5 w-20 mb-2 sm:mb-0 bg-muted/30" />
                <Skeleton className="h-5 w-72 bg-primary/20 ml-0 sm:ml-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-center text-foreground/70 mt-4 text-sm animate-pulse">
        Searching database...
      </p>
    </div>
  );
};

export default LoadingSkeleton;
