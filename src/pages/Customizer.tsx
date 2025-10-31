// src/pages/Customizer.tsx
import React, { useRef, useState } from "react";
import { Upload, Save, ShoppingCart, Image as ImageIcon } from "lucide-react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const Customizer: React.FC = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedProduct, setSelectedProduct] = useState("tshirt");
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const productColors = {
    white: "#FFFFFF",
    black: "#000000",
    navy: "#1E3A8A",
    gray: "#6B7280",
    red: "#DC2626",
  };

  const handleMultipleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedImages(files);
    }
  };

  const uploadFilesToStorage = async (files: File[]) => {
    if (!user) throw new Error("Not logged in");
    const urls: (string | null)[] = [];

    for (const file of files) {
      try {
        const fileName = `${user.id}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from("designs").upload(fileName, file);
        if (uploadError) {
          console.error("Upload error:", uploadError.message);
          urls.push(null);
          continue;
        }
        const { data: urlData } = supabase.storage.from("designs").getPublicUrl(fileName);
        const publicUrl = urlData?.publicUrl ?? null;
        urls.push(publicUrl);
      } catch (err) {
        console.error("Unexpected uploadFilesToStorage error:", err);
        urls.push(null);
      }
    }

    return urls.filter(Boolean) as string[];
  };

  const saveDesignsToSupabase = async () => {
    if (!user) {
      alert("Please login first!");
      return;
    }
    if (uploadedImages.length === 0) {
      alert("Please upload at least one design!");
      return;
    }

    setIsProcessing(true);
    try {
      const publicUrls = await uploadFilesToStorage(uploadedImages);
      if (publicUrls.length === 0) {
        alert("Upload failed. Try again.");
        return;
      }

      const inserts = publicUrls.map((image_url) => ({
        user_id: user.id,
        image_url,
        color: selectedColor,
        size: selectedSize,
        quantity,
        created_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from("designs").insert(inserts);
      if (error) {
        console.error("Designs metadata insert error:", error);
        alert("Failed to save design metadata. Check console.");
      } else {
        alert("Designs uploaded & saved to profile!");
        setUploadedImages([]);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    if (uploadedImages.length === 0) {
      alert("Please upload at least one design!");
      return;
    }

    setIsProcessing(true);
    try {
      const publicUrls = await uploadFilesToStorage(uploadedImages);
      if (publicUrls.length === 0) {
        alert("Image upload failed!");
        return;
      }

      const price = selectedProduct === "tshirt" ? 529 : 729;

      const customItem = {
        id: `custom-${Date.now()}`,
        name: selectedProduct === "tshirt" ? "Custom T-Shirt" : "Custom Hoodie",
        price,
        color: selectedColor,
        size: selectedSize,
        quantity,
        images: publicUrls,
        image: publicUrls[0],
      };

      await Promise.resolve(addToCart(customItem));

      alert("Design added to cart!");
      setUploadedImages([]);
    } catch (err) {
      console.error("handleAddToCart error:", err);
      alert("Failed to add to cart. See console.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <section className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Upload Your Custom Designs</h1>
        <p className="text-xl text-gray-200">Add your designs with product details below</p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Upload Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <ImageIcon className="h-6 w-6 mr-2" /> Upload Designs
          </h2>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors flex flex-col items-center space-y-2"
            disabled={isProcessing}
          >
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="text-gray-600">Click to upload image</span>
            <span className="text-sm text-gray-400">If you have multiple design please upload one after and add to cart</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            
            onChange={handleMultipleUpload}
            className="hidden"
            disabled={isProcessing}
          />

          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {uploadedImages.map((file, index) => (
                <div key={index} className="p-2 border rounded-lg">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="uploaded design"
                    className="w-full h-32 object-contain"
                  />
                  <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h2>

          {/* Product Type Selection */}
          <div>
            <label className="block mb-2 font-semibold">Select Product</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedProduct("tshirt")}
                className={`px-6 py-2 rounded-lg border transition-all ${
                  selectedProduct === "tshirt"
                    ? "bg-purple-600 text-white"
                    : "border-gray-300 hover:border-purple-300"
                }`}
              >
                T-Shirt
              </button>
              <button
                onClick={() => setSelectedProduct("hoodie")}
                className={`px-6 py-2 rounded-lg border transition-all ${
                  selectedProduct === "hoodie"
                    ? "bg-purple-600 text-white"
                    : "border-gray-300 hover:border-purple-300"
                }`}
              >
                Hoodie
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Select Color</label>
              <div className="flex space-x-3">
                {Object.entries(productColors).map(([name, color]) => (
                  <button
                    key={name}
                    onClick={() => setSelectedColor(name)}
                    className={`w-10 h-10 rounded-full border-4 transition-all ${
                      selectedColor === name
                        ? "border-purple-600 scale-110"
                        : "border-gray-300 hover:border-purple-300"
                    }`}
                    style={{ backgroundColor: color }}
                    disabled={isProcessing}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Size</label>
              <div className="flex space-x-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedSize === size
                        ? "bg-purple-600 text-white"
                        : "border-gray-300 hover:border-purple-300"
                    }`}
                    disabled={isProcessing}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center space-x-2"
            disabled={isProcessing}
          >
            <ShoppingCart className="h-5 w-5" />{" "}
            <span>{isProcessing ? "Processing..." : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customizer;
