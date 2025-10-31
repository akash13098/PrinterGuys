export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'tshirt' | 'hoodie';
  description: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 599,
    image: "https://images.unsplash.com/photo-1589902860314-e910697dea18?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: 'tshirt',
    description: "Premium 100% cotton t-shirt with comfortable fit. Perfect for custom printing or casual wear.",
    colors: ['Black', 'White', 'Navy', 'Gray', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 156
  },
  {
    id: 2,
    name: "Premium Hoodie",
    price: 699,
    image: "https://images.unsplash.com/photo-1685354218016-3899c9ef79ad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGN1c3RvbSUyMGhvb2RpZXN8ZW58MHx8MHx8fDA%3D",
    category: 'hoodie',
    description: "Warm and cozy hoodie made from soft cotton blend. Features kangaroo pocket and adjustable hood.",
    colors: ['Black', 'Gray', 'Navy', 'Maroon'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "Designer Print T-Shirt",
    price: 399,
    image: "https://images.unsplash.com/photo-1627225925683-1da7021732ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGN1c3RvbSUyMHQlMjBzaGlydHN8ZW58MHx8MHx8fDA%3D",
    category: 'tshirt',
    description: "Stylish designer t-shirt with unique print. Made from premium cotton for maximum comfort.",
    colors: ['White', 'Black', 'Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7,
    reviews: 203
  },
  {
    id: 4,
    name: "Vintage Style T-Shirt",
    price: 499,
    image: "https://images.unsplash.com/photo-1564859227552-81fde4a1df0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGN1c3RvbSUyMHQlMjBzaGlydHN8ZW58MHx8MHx8fDA%3D",
    category: 'tshirt',
    description: "Retro-inspired t-shirt with vintage wash finish. Soft and comfortable for everyday wear.",
    colors: ['Vintage Black', 'Vintage White', 'Vintage Blue'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.6,
    reviews: 127
  },
  {
    id: 5,
    name: "Vintage Hoodie",
    price: 799,
    image: "https://images.unsplash.com/photo-1630269470848-337134b23b06?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGN1c3RvbSUyMGhvb2RpZXN8ZW58MHx8MHx8fDA%3D",
    category: 'hoodie',
    description: "Athletic hoodie perfect for workouts and casual wear. Moisture-wicking fabric keeps you comfortable.",
    colors: ['Black', 'Gray', 'Navy', 'White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviews: 94
  },
  {
    id: 6,
    name: "Graphic T-Shirt",
    price: 499,
    image: "https://images.unsplash.com/photo-1627902499416-0a47580dfac8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGN1c3RvbSUyMHQlMjBzaGlydHN8ZW58MHx8MHx8fDA%3D",
    category: 'tshirt',
    description: "Eye-catching graphic tee with modern design. High-quality print that won't fade or crack.",
    colors: ['Black', 'White', 'Red', 'Blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviews: 178
  },
  {
    id: 7,
    name: "Zip-Up Hoodie",
    price: 799,
    image: "https://images.unsplash.com/photo-1643216668091-dceb566954e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGN1c3RvbSUyMGhvb2RpZXN8ZW58MHx8MHx8fDA%3D",
    category: 'hoodie',
    description: "Versatile zip-up hoodie with full front zipper. Perfect for layering and easy to wear.",
    colors: ['Black', 'Gray', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 67
  },
  {
    id: 8,
    name: "Cool T-Shirt",
    price: 599,
    image: "https://images.unsplash.com/photo-1678872844677-d650b788709b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGN1c3RvbSUyMHQlMjBzaGlydHN8ZW58MHx8MHx8fDA%3D",
    category: 'tshirt',
    description: "Classic polo shirt with collar and button placket. Perfect for semi-casual occasions.",
    colors: ['White', 'Black', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 145
  },

   {
    id: 9,
    name: "Crazy T-Shirt",
    price: 499,
    image: "https://images.unsplash.com/photo-1660997351262-6c31d8a35b6c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fHByaW50ZWQlMjB0c2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    category: 'tshirt',
    description: "Classic t-shirt and a perfect for semi-casual occasions.",
    colors: ['White', 'Black', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 3.5,
    reviews: 195
  },

   {
    id: 10,
    name: "Classy Hoodie",
    price: 699,
    image: "https://images.unsplash.com/photo-1612649924546-65aa67a6fdf9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHByaW50ZWQlMjBxdW90ZSUyMGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    category: 'hoodie',
    description: " Perfect for semi-casual occasions.",
    colors: ['White', 'Black', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.3,
    reviews: 185
  },

   {
    id: 11,
    name: "Swello T-shirt",
    price: 699,
    image: "https://images.unsplash.com/photo-1643881080002-afdc695936e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=709",
    category: 'tshirt',
    description: "Classic polo shirt with collar and button placket. Perfect for semi-casual occasions.",
    colors: ['White', 'Black', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 145
  },

   {
    id: 12,
    name: "Cool Hoodie",
    price: 699,
    image: "https://images.unsplash.com/photo-1608053874785-fc090a84eb2f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHByaW50ZWQlMjBob29kaWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    category: 'hoodie',
    description: " Perfect for layering and easy to wear.",
    colors: ['White', 'Black', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 202
  },

   {
    id: 13,
    name: "Motivation T-short",
    price: 499,
    image: "https://images.unsplash.com/photo-1644263755671-49b07f7624a6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    category: 'tshirt',
    description: "Perfect for semi-casual occasions.",
    colors: ['White', 'Black', 'Navy', 'Red','yellow'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.5,
    reviews: 120
  },

   {
    id: 14,
    name: "Lifestyle T-shirt ",
    price: 499,
    image: "https://images.unsplash.com/photo-1739001411231-4fc0f4140259?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHByaW50ZWQlMjB0c2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
    category: 'tshirt',
    description: "Perfect for semi-casual occasions.",
    colors: ['White', 'Black', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 185
  },

   {
    id: 15,
    name: "Quote T-shirt",
    price: 399,
    image: "https://images.unsplash.com/photo-1582142839970-2b9e04b60f65?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHQlMjBzaGlydHMlMjB3aXRoJTIwcXVvdGVzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    category: 'tshirt',
    description: "Simple words, powerful message. Wear this reminder of self-belief and confidence wherever life takes you.",
    colors: ['White', 'Black', 'Navy', 'Red','yellow'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 145
  },

   {
    id: 16,
    name: "Quote Hoodie",
    price: 699,
    image: "https://images.unsplash.com/photo-1678354678718-290d097abafc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHQlMjBzaGlydHMlMjB3aXRoJTIwcXVvdGVzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    category: 'hoodie',
    description: "Simple words, powerful message. Wear this reminder of self-belief and confidence wherever life takes you.",
    colors: ['White', 'Black', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 145
  },

   {
    id: 17,
    name: "Essential Everyday T-Shirt",
    price: 499,
    image: "https://images.pexels.com/photos/6256328/pexels-photo-6256328.jpeg",
    category: 'tshirt',
    description: "Lightweight and breathable, perfect for work, play, or lounging at home.",
    colors: ['White', 'Black', 'Navy', 'Red','yellow'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 145
  },

   {
    id: 18,
    name: "Crazy T-shirt",
    price: 499,
    image: "https://images.pexels.com/photos/4791174/pexels-photo-4791174.jpeg",
    category: 'tshirt',
    description: "Made from ultra-soft cotton for everyday comfort. Simple, timeless, and effortlessly cool.",
    colors: ['White', 'Black', 'Navy', 'Red','yellow'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.3,
    reviews: 100
  },

   {
    id: 19,
    name: "Relaxed Fit T-Shirt",
    price: 499,
    image: "https://images.pexels.com/photos/30095400/pexels-photo-30095400.jpeg",
    category: 'tshirt',
    description: "A laid-white fit that gives you room to move. Stay comfy and stylish all day long.",
    colors: ['White', 'Black', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.7,
    reviews: 223
  },

   {
    id: 20,
    name: "Premium Cotton T-shirt",
    price: 599,
    image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    category: 'tshirt',
    description: "Crafted with 100% combed cotton for a smooth feel and long-lasting",
    colors: ['White', 'Black', 'Navy', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.9,
    reviews: 250
  }

  






  
];