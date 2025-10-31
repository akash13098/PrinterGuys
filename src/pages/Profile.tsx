// src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../contexts/AuthContext";
import Orders from "../admin/Orders";

type OrderType = any;
type DesignType = {
  id: string;
  user_id?: string;
  name?: string;
  image_url?: string;
  created_at?: string;
  [k: string]: any;
};



const formatCurrency = (val: number | null | undefined) => {
  if (val == null || Number.isNaN(Number(val))) return "₹0";
  return Number(val).toLocaleString("en-IN", { style: "currency", currency: "INR" });
};

const parseItems = (raw: any) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("Failed parsing order.items:", err, raw);
    return [];
  }
};

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "designs" | "security">("orders");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [designs, setDesigns] = useState<DesignType[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingDesigns, setLoadingDesigns] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  // Profile editable fields
  const [name, setName] = useState<string>(user?.user_metadata?.name ?? "");
  const [email, setEmail] = useState<string>(user?.email ?? "");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [saveProcessing, setSaveProcessing] = useState(false);

  // Security fields
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityProcessing, setSecurityProcessing] = useState(false);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setDesigns([]);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      return;
    }

    setName(user.user_metadata?.name ?? "");
    setEmail(user.email ?? "");
    fetchProfileRow();
    fetchOrders();
    fetchDesigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Fetch user's profile row (optional fields like phone/address if stored in users table)
  const fetchProfileRow = async () => {
    if (!user) return;
    setProfileLoading(true);
    try {
      const { data, error } = await supabase.from("users").select("*").eq("id", user.id).single();
      if (error && error.code !== "PGRST116") {
        // PGRST116: no rows — ignore
        console.warn("users fetch error:", error.message);
      }
      if (data) {
        setName(data.name ?? (user.user_metadata?.name ?? ""));
        setPhone((data.phone ?? "") as string);
        setAddress((data.address ?? "") as string);
      }
    } catch (err) {
      console.error("fetchProfileRow error:", err);
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    try {
      const { data, error } = await supabase
        .from<OrderType>("orders")
        .select("*")
        .eq("user_id", user.id)
        
      if (error) {
        console.error("Error fetching orders:", error.message);
      } else {
        setOrders(data ?? []);
        console.log("Fetched orders for profile:", data);
      }
    } catch (err) {
      console.error("Unexpected fetchOrders error:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchDesigns = async () => {
    if (!user) return;
    setLoadingDesigns(true);
    try {
      const { data, error } = await supabase
        .from<DesignType>("designs")
        .select("*")
        .eq("user_id", user.id)
       
      if (error) {
        // if designs table doesn't exist or RLS blocks, show gentle message
        console.warn("fetchDesigns error (maybe no table):", error.message);
        setDesigns([]);
      } else {
        setDesigns(data ?? []);
      }
    } catch (err) {
      console.error("Unexpected fetchDesigns error:", err);
      setDesigns([]);
    } finally {
      setLoadingDesigns(false);
    }
  };

  // Save profile (updates auth metadata name + users table upsert for phone/address)
  const handleSaveProfile = async () => {
    if (!user) return;
    setSaveProcessing(true);
    try {
      // 1) Update auth user metadata for name (this updates the auth user metadata)
      const { data: updUser, error: updErr } = await supabase.auth.updateUser({
        data: { name: name },
      });
      if (updErr) {
        console.warn("supabase.auth.updateUser error:", updErr.message);
        // still proceed to upsert users table
      } else {
        console.log("Auth user metadata updated:", updUser);
      }

      // 2) Upsert into users table (phone/address)
      const { error } = await supabase
        .from("users")
        .upsert({ id: user.id, email: user.email, name, phone, address, created_at: new Date().toISOString() }, { onConflict: "id" });

      if (error) {
        console.warn("users upsert error (maybe missing columns):", error.message);
        alert("Profile saved partially. If you want to store phone/address, add columns 'phone' and 'address' to users table in Supabase.");
      } else {
        alert("✅ Profile saved successfully.");
      }
    } catch (err) {
      console.error("handleSaveProfile error:", err);
      alert("Failed to save profile.");
    } finally {
      setSaveProcessing(false);
    }
  };

  // Security: change email
  const handleChangeEmail = async () => {
    if (!user) return;
    if (!newEmail) {
      alert("Enter a new email.");
      return;
    }
    setSecurityProcessing(true);
    try {
      const { data, error } = await supabase.auth.updateUser({ email: newEmail });
      if (error) {
        console.error("updateUser email error:", error.message);
        alert("Failed to update email: " + error.message);
      } else {
        alert("✅ Email update requested. Verify the new email if required.");
        setNewEmail("");
        // refresh local email
        setEmail(newEmail);
      }
    } catch (err) {
      console.error("handleChangeEmail error:", err);
      alert("Failed to change email.");
    } finally {
      setSecurityProcessing(false);
    }
  };

  // Security: change password
  const handleChangePassword = async () => {
    if (!user) return;
    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setSecurityProcessing(true);
    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        console.error("updateUser password error:", error.message);
        alert("Failed to update password: " + error.message);
      } else {
        alert("✅ Password changed successfully.");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error("handleChangePassword error:", err);
      alert("Failed to change password.");
    } finally {
      setSecurityProcessing(false);
    }
  };

  const handleDeleteDesign = async (designId: string) => {
    if (!user) return;
    if (!window.confirm("Delete this design? This cannot be undone.")) return;
    try {
      const { error } = await supabase.from("designs").delete().match({ id: designId, user_id: user.id });
      if (error) {
        console.error("delete design error:", error.message);
        alert("Failed to delete design.");
      } else {
        setDesigns((d) => d.filter((x) => x.id !== designId));
        alert("Design deleted.");
      }
    } catch (err) {
      console.error("handleDeleteDesign error:", err);
      alert("Failed to delete design.");
    }
  };

  const openDesign = (d: DesignType) => {
    const url = d.image_url || d.url || d.file_url || d.image || "";
    if (!url) {
      alert("No preview available for this design.");
      return;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Account</h2>

      <div className="mb-6 flex gap-2">
        <button onClick={() => setActiveTab("profile")} className={`px-4 py-2 rounded ${activeTab === "profile" ? "bg-purple-600 text-white" : "bg-white border"}`}>Profile</button>
        <button onClick={() => setActiveTab("orders")} className={`px-4 py-2 rounded ${activeTab === "orders" ? "bg-purple-600 text-white" : "bg-white border"}`}>Orders</button>
       
        <button onClick={() => setActiveTab("security")} className={`px-4 py-2 rounded ${activeTab === "security" ? "bg-purple-600 text-white" : "bg-white border"}`}>Security</button>
      </div>

      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Edit Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600">Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Email (readonly)</label>
              <input value={email} readOnly className="w-full p-2 border rounded mt-1 bg-gray-50" />
              <p className="text-xs text-gray-500 mt-1">To change email go to Security tab.</p>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border rounded mt-1" />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm text-gray-600">Address</label>
              <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border rounded mt-1" />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={handleSaveProfile} disabled={saveProcessing} className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50">
              {saveProcessing ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={async () => { await fetchProfileRow(); alert("Profile reloaded"); }} className="px-4 py-2 border rounded">Reload</button>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div>
          <h3 className="text-lg font-medium mb-3">My Orders</h3>
          {loadingOrders ? <p>Loading orders…</p> : orders.length === 0 ? <p>No orders yet.</p> : (
            <div className="space-y-4">
              {orders.map((order) => {
                const items = parseItems(order.items);
                const computedTotal =
                  order.total ??
                  items.reduce((acc: number, it: any) => {
                    const price = Number(it.price ?? it.unitPrice ?? it.amount ?? 0);
                    const qty = Number(it.quantity ?? it.qty ?? 1);
                    return acc + price * qty;
                  }, 0);

                return (
                  <div key={order.id} className="border rounded-lg p-4 bg-white shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{order.name ?? order.email ?? "Customer"}</h4>
                        {order.address && <p className="text-sm text-gray-600">{order.address}</p>}
                        <p className="text-sm text-gray-500 mt-1">Order ID: <span className="font-mono">{order.id}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-semibold">{order.status ?? "Pending"}</p>
                        <p className="text-xs text-gray-500 mt-2">{order.created_at ? new Date(order.created_at).toLocaleString() : ""}</p>
                      </div>
                    </div>
                  
  

                    <div>
                      <h5 className="font-medium mb-2">Items</h5>
                      {items.length === 0 ? (
                        <p className="text-sm text-gray-500">No item details available for this order.</p>
                      ) : (
                        <ul className="space-y-2">
                         {items.map((it: any, idx: number) => {
  const itemName = it.name ?? it.product_name ?? it.title ?? "Item";
  const qty = Number(it.quantity ?? it.qty ?? 1);
  const unitPrice = Number(it.price ?? it.unitPrice ?? it.amount ?? 0);
  const lineTotal = unitPrice * qty;
  
  const designImage = it.designUrl || it.image || it.image_url || "";

  return (
    <li key={idx} className="flex items-center gap-4">
      {designImage ? (
        <img src={designImage} alt={itemName} className="w-14 h-14 object-cover rounded" />
      ) : (
        <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
          No image
        </div>
      )}
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <p className="font-medium">{itemName}</p>
            {it.size && <p className="text-sm text-gray-500">Size: {it.size}</p>}
            {it.color && <p className="text-sm text-gray-500">Color: {it.color}</p>}
          </div>
          <div className="text-right">
            <p className="text-sm">Qty: {qty}</p>
            <p className="font-semibold">{formatCurrency(lineTotal)}</p>
          </div>
        </div>
      </div>
    </li>
  );
})}

                        </ul>
                      )}
                    </div>

                    <div className="mt-4 flex justify-between items-center border-t pt-3">
                      <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <p className="font-medium">{order.paymentMethod ?? "—"}</p>
                        {order.phone && <p className="text-sm text-gray-600 mt-1">Phone: {order.phone}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Order Total</p>
                        <p className="text-xl font-bold">{formatCurrency(Number(computedTotal))}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === "designs" && (
        <div>
          <h3 className="text-lg font-medium mb-3">Saved Designs</h3>

          {loadingDesigns ? (
            <p>Loading designs…</p>
          ) : designs.length === 0 ? (
            <div>
              <p className="text-sm text-gray-500">No saved designs yet.</p>
              <p className="text-xs text-gray-500 mt-2">If you used the customizer, ensure it inserts into 'designs' table with user_id.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {designs.map((d) => (
                <div key={d.id} className="border rounded p-3 bg-white">
                  <div className="h-44 bg-gray-50 mb-3 overflow-hidden rounded">
                    {d.image_url ? (
                      <img src={d.image_url} alt={d.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No preview</div>
                    )}
                  </div>
                  <p className="font-medium">{d.name ?? "Design"}</p>
                  <p className="text-xs text-gray-500">{d.created_at ? new Date(d.created_at).toLocaleString() : ""}</p>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => openDesign(d)} className="px-3 py-1 bg-purple-600 text-white rounded text-sm">View</button>
                    <button onClick={() => handleDeleteDesign(d.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm border">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "security" && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Security & Account</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Change Email</label>
              <input placeholder="New email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="w-full p-2 border rounded mt-1" />
              <button onClick={handleChangeEmail} disabled={securityProcessing} className="mt-2 px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50">{securityProcessing ? "Processing..." : "Update Email"}</button>
            </div>

            <div>
              <label className="text-sm text-gray-600">Change Password</label>
              <input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 border rounded mt-1" />
              <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 border rounded mt-1" />
              <button onClick={handleChangePassword} disabled={securityProcessing} className="mt-2 px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50">{securityProcessing ? "Processing..." : "Update Password"}</button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-gray-500">Note: Changing email may require verification. Changing password will update your account immediately if allowed by your Supabase project settings.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
