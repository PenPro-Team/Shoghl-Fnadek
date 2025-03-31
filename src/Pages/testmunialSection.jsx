import React from 'react';
import image1 from "../assets/IMG_20250226_140833.jpg";
import image2 from "../assets/IMG_20250226_141719.jpg";
const TestimonialSection = () => {
    const testimonials = [
        {
            id: 1,
            name: "Wade Warren",
            position: "Business Man",
            image: image1, // Replace with your image path
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
            rating: 5
        },
        {
            id: 2,
            name: "Mila Kunis",
            position: "Fashion Designer",
            image: image1, // Replace with your image path
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
            rating: 5
        }
    ];

    // Star rating component
    const StarRating = ({ rating }) => {
        return (
            <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < rating ? "text-orange-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    // Testimonial card component
    const TestimonialCard = ({ testimonial }) => {
        return (
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <StarRating rating={testimonial.rating} />
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex items-center">
                    <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/48"; // Fallback image
                        }}
                    />
                    <div>
                        <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-blue-600">{testimonial.position}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="py-12 px-4 md:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <span className="text-sm font-medium text-blue-800 uppercase tracking-wider">TESTIMONIAL</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-green-800 mt-2">What Our Customers Say</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map(testimonial => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;