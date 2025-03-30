import React, { Component } from "react";
import aboutHeroImage from "../images/about-03.jpg";
import ourStoryImage from "../images/our-story.jpg";
import ourJourneyImage from "../images/our-journey.jpg";
import ceramicImage from "../images/1.jpg";

const secondaryColor = "#025048";

class About extends Component {
  render() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Hero Section */}
        <div
          className="pt-16 pb-16 relative"
          style={{ backgroundColor: secondaryColor, color: "white" }}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-5xl font-bold mb-4">About Us</h1>
                <p className="text-xl opacity-90">
                  Connecting Talent with Opportunity in the Hotel Industry
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-end">
                <div className="relative w-full max-w-[460px] transform translate-y-24">
                  <img
                    src={aboutHeroImage}
                    alt="About Hero"
                    className="w-full h-auto rounded-lg shadow-2xl"
                    fetchpriority="high"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          {/* First Section - Gray */}
          <section
            className="w-full py-16"
            style={{ backgroundColor: "#f1f4f1" }}
          >
            <div className="container mx-auto px-6">
              {/* Text Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Left Column - Titles */}
                <div className="flex flex-col justify-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Our Story
                  </h2>
                  <h3 className="text-2xl md:text-3xl text-gray-700">
                    Explore CeramicShop and Our Ceramic Artistry
                  </h3>
                </div>

                {/* Right Column - Description */}
                <div className="flex items-center">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Step into the world of CeramicShop, where we're dedicated to
                    crafting elegant, functional ceramics that elevate your
                    everyday life. Our journey is a testament to the artistry
                    and craftsmanship that infuse each unique piece. Discover
                    our story, meet the talented artisans who bring these
                    creations to life, and experience the exceptional beauty
                    that our ceramics add to your surroundings. Explore the
                    heart and soul of our store, where every piece is a work of
                    art, designed to make your moments more beautiful and
                    special.
                  </p>
                </div>
              </div>

              {/* Full Width Image */}
              <div className="w-full h-[600px] overflow-hidden rounded-lg">
                <img
                  src={ourStoryImage}
                  className="w-full h-full "
                  alt="Our Story"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* Second Section - White */}
          <section
            className="w-full py-2"
            style={{ backgroundColor: "#ffffff" }}
          >
            <div className="container mx-auto px-2">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Column - Image */}
                <div className="relative h-[800px] md:h-full md:col-span-5 overflow-hidden order-2 md:order-1">
                  <img
                    src={ourJourneyImage}
                    className="absolute inset-0 w-full h-full object-cover object-center rounded-lg"
                    alt="Our Journey"
                    loading="lazy"
                  />
                </div>

                {/* Right Column - Content */}
                <div className="flex flex-col md:col-span-7 order-1 md:order-2">
                  <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                      Our Journey
                    </h2>
                    <h3 className="text-2xl md:text-3xl text-gray-700 mb-8">
                      Our Ceramic Odyssey Crafting Beauty and Quality.
                    </h3>
                    <div className="space-y-6">
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Our company story is a testament to the enduring love
                        for craftsmanship, where we combine our passion for
                        ceramics with an unwavering commitment to quality and
                        timeless beauty. Explore the journey that has led us to
                        become a trusted source for exquisite ceramic products.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        We're proud to share our story, which mirrors the growth
                        of a dream into a thriving destination for exceptional
                        creations, reflecting artistry and innovation.
                      </p>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Our dedication to crafting elegant, functional ceramic
                        pieces that enhance everyday living is at the heart of
                        our narrative, and it's a story we're excited to share
                        with you.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl text-gray-700 mb-4">
                      Our Mission
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      Our mission is to create exceptional ceramic pieces that
                      blend artistry and functionality, enriching lives through
                      beauty and craftsmanship.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl text-gray-700 mb-4">
                      Our Vision
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      Our vision is to be a global leader in ceramic artistry,
                      inspiring creativity and appreciation for the beauty of
                      handcrafted ceramics in every home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call-to-Action Section */}
          <div className="w-full" style={{ backgroundColor: secondaryColor }}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left side - Image */}
              <div className="relative h-[350px] md:h-[400px] overflow-hidden">
                <img
                  src={ceramicImage}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  alt="Ceramic Artistry"
                  loading="lazy"
                />
              </div>

              {/* Right side - Content */}
              <div className="flex flex-col items-center justify-center py-8 md:py-12 px-6 md:px-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 text-center leading-tight">
                  Uncover the World of Ceramic Artistry Start Your Journey Here!
                </h2>
                <a
                  href="#"
                  className="bg-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
                  style={{
                    color: secondaryColor,
                    borderColor: "white",
                    border: "2px solid white",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.border = "2px solid white";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.color = secondaryColor;
                    e.currentTarget.style.border = "2px solid white";
                  }}
                >
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>

          {/* Third Section - Gray */}
          <section
            className="w-full py-6"
            style={{ backgroundColor: "#f1f4f1" }}
          >
            <div className=" mx-auto px-4">
              <div className="mb-12">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Address Information */}
                  <div className="bg-white p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105 duration-300">
                    <div className="space-y-8">
                      <div className="flex items-start space-x-4">
                        <div
                          className="flex-shrink-0"
                          style={{ backgroundColor: "rgba(2, 80, 72, 0.15)" }}
                        >
                          <div className="rounded-full p-3">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              style={{ color: secondaryColor }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Address
                          </h3>
                          <p className="text-gray-600">
                            Teachers Club, in front of Hesham & Amr Library,
                            <br />
                            Bani Suef, Egypt
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div
                          className="flex-shrink-0"
                          style={{ backgroundColor: "rgba(2, 80, 72, 0.15)" }}
                        >
                          <div className="rounded-full p-3">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              style={{ color: secondaryColor }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Working Hours
                          </h3>
                          <p className="text-gray-600">
                            Sunday - Thursday: 10:00 AM - 6:00 PM
                          </p>
                          <p className="text-gray-600">
                            Friday - Saturday: Closed
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div
                          className="flex-shrink-0"
                          style={{ backgroundColor: "rgba(2, 80, 72, 0.15)" }}
                        >
                          <div className="rounded-full p-3">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              style={{ color: secondaryColor }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            Contact
                          </h3>
                          <p className="text-gray-600">
                            Phone: +20 102 333 5554
                          </p>
                          <p className="text-gray-600">
                            Email: info@shoghlfnadek.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="bg-white p-4 rounded-xl shadow-lg h-[500px] transform transition-transform hover:scale-105 duration-300">
                    <div
                      className="w-full h-full rounded-lg overflow-hidden border-4 border-opacity-20"
                      style={{ borderColor: secondaryColor }}
                    >
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3567.3461861746714!2d31.098371!3d29.069478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145a27d96947b6f5%3A0x2f6ab1c78c5e369c!2sTeachers%20Club%20Beni%20Suef!5e0!3m2!1sen!2seg!4v1711531248744!5m2!1sen!2seg"
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default About;
