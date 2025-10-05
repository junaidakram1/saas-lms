import { Skeleton } from "@/components/ui/skeleton";

export default function GuideCardSkeleton() {
  return (
    <div className="w-full p-6 min-h-screen">
      {/* Top row: title left, search/filter right */}

      {/* Card skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mt-15">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton
              className="h-[200px] w-full rounded-xl bg-gray-300 animate-pulse"
              // style={{
              //   background:
              //     "radial-gradient(circle at center, rgba(254, 254, 254, 0.934) #ffffffc.05) 70%, rgba(254, 254, 254, 0.934) 100%)",
              //   backdropFilter: "blur(10px)",
              // }}
            />

            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4 rounded-xl bg-gray-300 animate-pulse" />
              <Skeleton className="h-4 w-1/2 rounded-xl bg-gray-300 animate-pulse" />
              <div className="flex items-center space-x-2 pt-2">
                <Skeleton className="h-6 w-16 rounded-xl bg-gray-300 animate-pulse" />
                <Skeleton className="h-6 w-20 rounded-xl bg-gray-300 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
