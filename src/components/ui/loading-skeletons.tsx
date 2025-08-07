import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const BlogPostSkeleton = () => {
  return (
    <Card className="shadow-soft h-full overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>
      <CardContent className="p-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          
          <div className="flex items-center space-x-4 pt-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const BlogPostGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <BlogPostSkeleton key={i} />
      ))}
    </div>
  );
};

export const BlogTableSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Desktop Table Skeleton */}
      <div className="hidden lg:block">
        <div className="border rounded-lg">
          <div className="p-4 border-b">
            <div className="grid grid-cols-5 gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="p-4 border-b last:border-b-0">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-28" />
                <div className="flex space-x-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded" />
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Cards Skeleton */}
      <div className="lg:hidden space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
