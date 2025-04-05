import React from "react";
import { IoTodayOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { RiExchangeFundsLine } from "react-icons/ri";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:test-sm md:text-base text-gray-700">
      <div>
        <RiExchangeFundsLine className="m-auto mb-5 text-[3rem]" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">
          We offer hassle-free exchanges to ensure your satisfaction.
        </p>
      </div>

      <div>
        <IoTodayOutline className="m-auto mb-5 text-[3rem]" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">
          Return your items within 7 days for a full refund or exchange.
        </p>
      </div>

      <div>
        <MdSupportAgent className="m-auto mb-5 text-[3rem]" />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">
          Our team is here to assist you 24/7 with any questions or concerns.
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
