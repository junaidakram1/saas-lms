import { Skeleton } from "@/components/ui/skeleton";

export default function PageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col p-6 space-y-6 bg-[#f1efef]">
      <Skeleton className="h-12 w-full rounded-md bg-gray-200 animate-pulse" />
      <div className="flex-1 flex flex-col space-y-4">
        <Skeleton className="h-8 w-1/3 rounded-md bg-gray-200 animate-pulse" />
        <Skeleton className="h-4 w-full rounded-md bg-gray-200 animate-pulse" />
        <Skeleton className="h-64 w-full rounded-lg bg-gray-200 animate-pulse" />
        <Skeleton className="h-4 w-full rounded-md bg-gray-200 animate-pulse" />
        <Skeleton className="h-4 w-5/6 rounded-md bg-gray-200 animate-pulse" />
      </div>
      <Skeleton className="h-12 w-full rounded-md bg-gray-200 animate-pulse" />
    </div>
  );
}
