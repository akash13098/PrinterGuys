import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shirt, Palette, Truck, Award, Star, Zap } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Shirt className="h-12 w-12" />,
      title: "Premium Quality",
      description: "High-quality fabrics and printing that lasts"
    },
    {
      icon: <Palette className="h-12 w-12" />,
      title: "Custom Designs",
      description: "Upload yourvdesigns with our easy-to-use tools"
    },
    {
      icon: <Truck className="h-12 w-12" />,
      title: "Fast Delivery",
      description: "Quick turnaround times and reliable shipping"
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: "Satisfaction Guaranteed",
      description: "100% satisfaction guarantee on all orders"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Custom Printed T-Shirt",
      price: 599,
      image: "https://images.unsplash.com/photo-1589902860314-e910697dea18?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      name: "Premium Hoodie",
      price: 699,
      image: "https://images.unsplash.com/photo-1685354218016-3899c9ef79ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGN1c3RvbSUyMGhvb2RpZXN8ZW58MHx8MHx8fDA%3D"
    },
    {
      id: 3,
      name: "Designer T-Shirt",
      price: 399,
      image: "https://images.unsplash.com/photo-1627225925683-1da7021732ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGN1c3RvbSUyMHQlMjBzaGlydHN8ZW58MHx8MHx8fDA%3D"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg')"

        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Create Custom Apparel &{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Premium Products
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Design unique t-shirts and hoodies with our custom printing service, or choose from our premium ready-made collection. Quality guaranteed, fast shipping, and complete satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/customizer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Start Designing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Shop Now
                <Shirt className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PrinterGuys?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with premium materials to deliver exceptional custom apparel
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6 mb-4 group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300">
                  <div className="text-purple-600 flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular items
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="aspect-w-1 aspect-h-1 w-full h-64 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">₹{product.price}</span>
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400">5000+</div>
              <div className="text-xl">Happy Customers</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400">15000+</div>
              <div className="text-xl">Orders Completed</div>
            </div>
            <div className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400">4.9</div>
              <div className="text-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-400 mr-2" />
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to get your custom apparel
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Palette className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Design</h3>
              <p className="text-gray-600">Choose your size an color and upload your own design using our customizer tool</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Print</h3>
              <p className="text-gray-600">We print your design using premium materials and state-of-the-art technology</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-100 to-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Truck className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Deliver</h3>
              <p className="text-gray-600">Fast and secure delivery right to your doorstep within 4-7 business days</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
