import React from "react";
import Title from "../../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="about"
          className="w-full md:w-1/2 object-cover"
        />

        <div className="flex flex-col gap-3">
          <p className="text-justify">
            Tokobaju was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>
          <p className="text-justify">
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <h2 className="text-xl font-semibold">Our Mission</h2>
          <p className="text-justify">
            Our mission at Tokobaju is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      <div className="text-xl">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border p-4 md:p-8 flex flex-col gap-5">
          <h3 className="font-bold">1. Exclusive Selection</h3>
          <p>
            We offer a wide range of products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we have a diverse selection.
          </p>
        </div>
        <div className="border p-4 md:p-8 flex flex-col gap-5">
          <h3 className="font-bold">2. Fast Shipping</h3>
          <p>
            With our fast shipping rates, customers can enjoy their purchases
            quickly and easily. From the moment they place their order to the
            moment they receive their product, we're there to help.
          </p>
        </div>
        <div className="border p-4 md:p-8 flex flex-col gap-5">
          <h3 className="font-bold">3. Customer Support</h3>
          <p>
            Tokobaju offers a dedicated customer support team who are here to
            help you with any questions or concerns you may have. From
            troubleshooting orders to resolving issues, we're here to support
            you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
