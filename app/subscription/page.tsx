import { PricingTable } from "@clerk/nextjs";

const Subscription = () => {
  return (
    <div className="flex items-center justify-center h-screen px-5">
      <div className="w-full max-w-2xl">
        <PricingTable />
      </div>
    </div>
  );
};

export default Subscription;
