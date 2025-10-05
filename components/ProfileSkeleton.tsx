import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col justify- items-center min-h-screen pt-24">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-22 w-22 rounded-xl bg-gray-300 animate-pulse" />
        <div className="space-y-2">
          <Skeleton
            className="h-4 w-[650px] rounded-xl bg-gray-200 animate-pulse "
            // style={{
            //   background:
            //     "radial-gradient(circle at center, rgba(254, 254, 254, 0.934) #ffffffc.05) 70%, rgba(254, 254, 254, 0.934) 100%)",
            //   backdropFilter: "blur(10px)",
            // }}
          />
          <Skeleton
            className="h-4 w-[650px] rounded-xl bg-gray-200 animate-pulse"
            // style={{
            //   background:
            //     "radial-gradient(circle at center, rgba(254, 254, 254, 0.934) #ffffffc.05) 70%, rgba(254, 254, 254, 0.934) 100%)",
            //   backdropFilter: "blur(10px)",
            // }}
          />
        </div>
      </div>
    </div>
  );
}
