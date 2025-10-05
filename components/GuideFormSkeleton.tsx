"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function GuideFormSkeleton() {
  return (
    <div className="flex justify-center items-start min-h-screen bg-[#f9fafb22] pt-10">
      <div className="w-full max-w-lg gap-4 flex flex-col p-6 border border-gray-200 rounded-md">
        <div className="flex justify-center">
          <Skeleton className="h-10 w-1/2 rounded-md bg-gray-300 animate-pulse" />
        </div>

        <Skeleton className="h-10 w-full rounded-md bg-gray-300 animate-pulse" />
        <Skeleton className="h-10 w-full rounded-md bg-gray-300 animate-pulse" />
        <Skeleton className="h-10 w-full rounded-md bg-gray-300 animate-pulse" />
        <Skeleton className="h-24 w-full rounded-lg bg-gray-300 animate-pulse" />
        <Skeleton className="h-12 w-64 rounded-sm bg-gray-200 animate-pulse mt-2" />
      </div>
    </div>
  );
}
