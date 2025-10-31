import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Test route
app.get("/", (req, res) => {
  res.send("PrinterGuys backend is running 🚀");
});

// Order route
app.post("/api/order", async (req, res) => {
  try {
    const { name, email, address, items, total, user_id } = req.body;

    const payload = {
      name,
      email,
      address,
      items,
      total,
      status: "Pending",
      ...(user_id ? { user_id } : {}), // attach user_id if provided
    };

    const { data, error } = await supabase
      .from("orders")
      .insert([payload])
      .select();

    if (error) throw error;
    res.status(200).json({ success: true, order: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message || "Failed to place order" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


