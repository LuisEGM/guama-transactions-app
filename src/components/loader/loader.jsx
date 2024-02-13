import { Skeleton } from "@nextui-org/react";

const Loader = () => (
  <div className="w-[80%] mx-auto px-6">
    <div className="flex justify-between mt-5 mb-10">
      <Skeleton className="w-3/5 rounded-lg mb-1">
        <div className="h-14 w-full rounded-lg bg-secondary"></div>
      </Skeleton>
      <Skeleton className="w-1/5 rounded-lg mb-1">
        <div className="h-14 w-full rounded-lg bg-secondary"></div>
      </Skeleton>
    </div>
    <Skeleton className="w-5/5 rounded-lg mx-auto mb-1">
      <div className="h-14 w-full rounded-lg bg-secondary"></div>
    </Skeleton>
    <Skeleton className="w-5/5 rounded-lg mx-auto mb-1">
      <div className="h-14 w-full rounded-lg bg-secondary"></div>
    </Skeleton>
    <Skeleton className="w-5/5 rounded-lg mx-auto mb-1">
      <div className="h-14 w-full rounded-lg bg-secondary"></div>
    </Skeleton>
    <Skeleton className="w-5/5 rounded-lg mx-auto mb-1">
      <div className="h-14 w-full rounded-lg bg-secondary"></div>
    </Skeleton>
    <Skeleton className="w-5/5 rounded-lg mx-auto mb-1">
      <div className="h-14 w-full rounded-lg bg-secondary"></div>
    </Skeleton>
  </div>
);

export default Loader;
