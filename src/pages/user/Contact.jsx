import React from "react";
import Title from "../../components/Title";

const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="contact"
          className="w-full md:w-1/2 object-cover"
        />

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Our Store</h2>
          <div className="flex flex-col gap-1">
            <p>
              <span className="font-semibold">Address:</span> Bogor, West Java, Indonesia
            </p>
            <p>
              <span className="font-semibold">Phone:</span> <a
                href="https://wa.me/6287845352397"
                target="_blank"
                rel="noopener noreferrer"
              >
                +6287845352397
              </a>
            </p>
            <p>
              <span className="font-semibold">Email:</span> faukiofficial@gmail.com
            </p>
            <p>
              <span className="font-semibold">Opening Hours:</span> Monday to
              Friday: 9:00 AM to 6:00 PM
            </p>
          </div>

          <h2 className="text-xl font-semibold">Careers at Tokobaju</h2>
          <p className="text-justify">
            We are always looking for talented individuals to join our team. If
            you're passionate about fashion and want to make a difference in the
            world, we'd love to hear from you! Apply now and let's create
            something amazing together!
          </p>
          <button className="border border-gray-400 py-1.5 px-3.5 w-fit">
            <a href="mailto:faukiofficial@gmail.com">Email Us</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
