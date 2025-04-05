import React from "react";
import { Link } from "react-router-dom";
import { moveToTop } from "../lib/moveToTop";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">
        <div>
          <Link to="/" className="text-2xl" onClick={() => moveToTop()}>
            Tokobaju
          </Link>
          <p className="w-full md:w-2/3 text-gray-600 mt-5">
            Tokobaju is your one-stop shop for stylish and affordable clothing.
            We are committed to providing high-quality products and excellent
            customer service.
          </p>
        </div>

        <div>
          <p className="font-medium text-xl mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link to="/" onClick={() => moveToTop()}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/collection" onClick={() => moveToTop()}>
                Collection
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => moveToTop()}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => moveToTop()}>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-medium text-xl mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <a
                href="https://wa.me/6287845352397"
                target="_blank"
                rel="noopener noreferrer"
              >
                +6287845352397
              </a>
            </li>
            <li>
              <a href="mailto:faukiofficial@gmail.com">
                faukiofficial@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="text-center text-gray-500 my-5">
          © {new Date().getFullYear()}.{" "}
          <Link to="/" className="font-medium" onClick={() => moveToTop()}>
            Tokobaju
          </Link>{" "}
          - All rights reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
