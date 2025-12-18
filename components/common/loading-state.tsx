// filepath: sae-frontend/components/common/loading-state.tsx
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  rows?: number;
  columns?: number;
}

export function LoadingState({ rows = 5, columns = 4 }: LoadingStateProps) {
  return (
    <div className="space-y-4">
      {/* Search skeleton */}
      <Skeleton className="w-full h-10 max-w-sm" />

      {/* Table skeleton */}
      <div className="border rounded-md">
        <div className="p-4 border-b">
          <div className="flex space-x-4">
            {Array.from({ length: columns }).map((_, i) => (
              <Skeleton key={i} className="w-20 h-4" />
            ))}
          </div>
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 border-b last:border-b-0">
            <div className="flex space-x-4">
              {Array.from({ length: columns }).map((_, j) => (
                <Skeleton key={j} className="w-20 h-4" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
