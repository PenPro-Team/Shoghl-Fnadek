import React, { Component } from "react";
import contactus_axiosInstance from "../axiosinstances/contactus";
import ceramicImage from "../images/1.jpg";
import contactHeroImage from "../images/contact-01.jpg"; // Add this import

const secondaryColor = "#025048";

class Contactus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      },
      touched: {},
      errors: {},
      isSubmitting: false,
      submitSuccess: false,
      faqItems: [
        {
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking on the 'Sign Up' button in the header and following the instructions.",
          isOpen: false,
        },
        {
          question: "How do I reset my password?",
          answer:
            "To reset your password, click on the 'Forgot Password' link on the login page and follow the instructions sent to your email.",
          isOpen: false,
        },
        {
          question: "How can I contact support?",
          answer:
            "You can contact support via the contact form on this page, or by emailing us directly at info@shoghlfnadek.com.",
          isOpen: false,
        },
        {
          question: "What types of jobs are listed on Shoghl Fnadek?",
          answer:
            "Shoghl Fnadek lists a wide variety of jobs, primarily focusing on the hospitality and tourism sectors. This includes positions in hotels, resorts, restaurants, and related industries.",
          isOpen: false,
        },
        {
          question: "Is it free to apply for jobs on Shoghl Fnadek?",
          answer:
            "Yes, it is completely free for job seekers to apply for jobs listed on Shoghl Fnadek. Our services are designed to connect you with potential employers at no cost.",
          isOpen: false,
        },
      ],
    };
  }

  validateForm = () => {
    const { name, email, phone, message } = this.state.formData;
    const errors = {};

    // Name validation
    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    // Email validation without HTML5
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    // Phone validation (Egyptian numbers)
    const phoneRegex = /^(\+20|0)?1[0125]\d{8}$/;
    if (phone && !phoneRegex.test(phone)) {
      errors.phone = "Invalid Egyptian phone number";
    }

    // Message validation
    if (!message.trim()) {
      errors.message = "Message is required";
    } else if (message.length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    return errors;
  };

  handleBlur = (field) => {
    this.setState((prevState) => ({
      touched: { ...prevState.touched, [field]: true },
    }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]: "",
      },
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validateForm();

    if (Object.keys(errors).length === 0) {
      this.setState({ isSubmitting: true });

      try {
        // Log the data being sent
        console.log("Sending form data:", this.state.formData);

        const response = await contactus_axiosInstance.post("/contactus/", {
          name: this.state.formData.name,
          email: this.state.formData.email,
          phone: this.state.formData.phone || null,
          subject: this.state.formData.subject || "",
          message: this.state.formData.message,
        });

        console.log("Response:", response);

        if (response.status === 201 || response.status === 200) {
          this.setState({
            isSubmitting: false,
            submitSuccess: true,
            formData: {
              name: "",
              email: "",
              phone: "",
              subject: "",
              message: "",
            },
            touched: {},
          });
        }
      } catch (error) {
        // More detailed error logging
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });

        this.setState({
          isSubmitting: false,
          errors: {
            submit:
              error.response?.data?.detail ||
              error.response?.data?.message ||
              "Network error occurred. Please try again later.",
          },
        });
      }
    } else {
      this.setState({ errors });
    }
  };

  toggleFAQ = (index) => {
    this.setState((prevState) => {
      const updatedFaqItems = prevState.faqItems.map((item, i) => {
        if (i === index) {
          return { ...item, isOpen: !item.isOpen };
        } else {
          return { ...item, isOpen: false }; // Close other FAQs
        }
      });
      return { faqItems: updatedFaqItems };
    });
  };

  render() {
    const { formData, errors, isSubmitting, submitSuccess, touched, faqItems } =
      this.state;

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Hero Section */}
        <div
          className="pt-16 pb-16 relative" // تقليل ال padding-bottom
          style={{ backgroundColor: secondaryColor, color: "white" }}
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl opacity-90">
                  We're here to help with your career journey
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-end">
                <div className="relative w-full max-w-[460px] transform translate-y-24">
                  {" "}
                  {/* زيادة قيمة translate-y */}
                  <img
                    src={contactHeroImage}
                    alt="Contact Hero"
                    className="w-full h-auto rounded-lg shadow-2xl" // تحسين الظل
                    fetchpriority="high"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="container mx-auto px-6 pt-32 pb-16">
          {" "}
          {/* زيادة ال padding-top */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className="flex-shrink-0"
                      style={{ backgroundColor: "rgba(2, 80, 72, 0.15)" }}
                    >
                      <div className="rounded-full p-3">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke={secondaryColor}
                          viewBox="0 0 24 24"
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
                      <h3 className="text-lg font-semibold text-gray-800">
                        Phone
                      </h3>
                      <p className="text-gray-600 hover:text-blue-600 transition-colors">
                        <a href="tel:+201023335554">+20 102 333 5554</a>
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
                          stroke={secondaryColor}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Email
                      </h3>
                      <p className="text-gray-600 hover:text-blue-600 transition-colors">
                        <a href="mailto:info@shoghlfnadek.com">
                          info@shoghlfnadek.com
                        </a>
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
                          stroke={secondaryColor}
                          viewBox="0 0 24 24"
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
                      <h3 className="text-lg font-semibold text-gray-800">
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
                          stroke={secondaryColor}
                          viewBox="0 0 24 24"
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
                      <h3 className="text-lg font-semibold text-gray-800">
                        Working Hours
                      </h3>
                      <p className="text-gray-600">
                        Sunday - Thursday: 10:00 AM - 6:00 PM
                      </p>
                      <p className="text-gray-600">Friday - Saturday: Closed</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Follow Us
                    </h3>
                    <div className="flex space-x-4">
                      <a
                        href="https://www.facebook.com/profile.php?id=100063959018807"
                        className="p-3 rounded-full hover:bg-blue-200 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: "rgba(2, 80, 72, 0.15)" }}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: secondaryColor }}
                        >
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                {submitSuccess ? (
                  <div
                    className="p-6 rounded-lg"
                    style={{ backgroundColor: "rgba(2, 80, 72, 0.05)" }}
                  >
                    <h3
                      className="font-semibold text-lg mb-2"
                      style={{ color: secondaryColor }}
                    >
                      Thank you for contacting us!
                    </h3>
                    <p className="text-green-700">
                      We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={this.handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={this.handleChange}
                        onBlur={() => this.handleBlur("name")}
                        className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        style={{ focusRingColor: secondaryColor }}
                        placeholder="Enter your full name"
                      />
                      {touched.name && errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={this.handleChange}
                        onBlur={() => this.handleBlur("email")}
                        className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        style={{ focusRingColor: secondaryColor }}
                        placeholder="Enter your email address"
                      />
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={this.handleChange}
                        onBlur={() => this.handleBlur("phone")}
                        className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        style={{ focusRingColor: secondaryColor }}
                        placeholder="Enter your phone number"
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={this.handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition-all border-gray-300"
                        style={{ focusRingColor: secondaryColor }}
                        placeholder="Enter message subject"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={this.handleChange}
                        onBlur={() => this.handleBlur("message")}
                        rows="4"
                        className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        style={{ focusRingColor: secondaryColor }}
                        placeholder="Enter your message"
                      ></textarea>
                      {touched.message && errors.message && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {errors.submit && (
                      <div className="mb-4">
                        <p className="text-red-500 text-sm">{errors.submit}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      style={{ backgroundColor: secondaryColor }}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-md"
                >
                  <button
                    className="flex items-center justify-between w-full py-4 px-6 bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 focus:outline-none transition-all duration-500"
                    onClick={() => this.toggleFAQ(index)}
                  >
                    <span>{item.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-600 transform transition-transform duration-500 ease-in-out ${
                        item.isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden bg-white`}
                    style={{
                      maxHeight: item.isOpen ? "1000px" : "0",
                      opacity: item.isOpen ? 1 : 0,
                      transform: `translateY(${item.isOpen ? "0" : "-10px"})`,
                      transition: "all 700ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="p-6 text-gray-700">{item.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

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
      </div>
    );
  }
}

export default Contactus;
