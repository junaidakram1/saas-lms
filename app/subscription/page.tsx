import { PricingTable } from "@clerk/nextjs";

const Subscription = () => {
  return (
    <div className="flex items-center justify-center h-screen px-5 mt-25 mb-25 sm:mt-0 sm:mb-0">
      <div className="w-full">
        <PricingTable />
      </div>
    </div>
  );
};

export default Subscription;
