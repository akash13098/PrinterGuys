import React from 'react';
import { Users, Award, Truck, Heart } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Award className="h-12 w-12" />,
      title: "Quality First",
      description: "We use only premium materials and state-of-the-art printing technology to ensure every product meets our high standards."
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Customer Focused",
      description: "Your satisfaction is our priority. We work closely with customers to bring their creative visions to life."
    },
    {
      icon: <Truck className="h-12 w-12" />,
      title: "Fast Delivery",
      description: "Quick turnaround times and reliable shipping ensure you get your custom apparel when you need it."
    },
    {
      icon: <Heart className="h-12 w-12" />,
      title: "Passion Driven",
      description: "We're passionate about helping people express themselves through custom apparel and quality clothing."
    }
  ];

  const team = [
    {
      name: "Aryan Kawade",
      role: "Founder & CEO",
      image: "https://images.pexels.com/p/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      name: "Shreyas ",
      role: "Head of Design",
      image: "https://images.pexels/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      name: "Parth",
      role: "Production Manager",
      image: "https://images.pexels.com/os/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About PrinterGuys
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            We're passionate about helping people express their creativity through custom apparel and premium clothing
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At PrinterGuys, we started with a vision to bring creativity and technology together. Our team is passionate about building powerful brand identities and engaging web experiences for our clients.

From startups to established brands, we work closely with every client to deliver impactful digital solutions that help them stand out. 
                  
              
                </p>
                <p>
                  We believe that everyone deserves to wear something unique that represents their personality, 
                  brand, or message. Whether you're an individual looking for a custom t-shirt or a business 
                  needing branded merchandise, we're here to bring your vision to life.
                </p>
                
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="PrinterGuys workshop"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6 mb-4 group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                  <div className="text-purple-600 flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind PrinterGuys
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            To empower individuals and businesses to express their unique identity through high-quality, 
            custom-printed apparel while providing exceptional customer service and maintaining sustainable 
            business practices that benefit our community and environment.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;