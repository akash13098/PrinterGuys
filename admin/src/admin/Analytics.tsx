import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type DateRange = '7days' | '30days' | 'all';

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>('30days');
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  async function loadAnalytics() {
    try {
      setLoading(true);

      const daysAgo = dateRange === '7days' ? 7 : dateRange === '30days' ? 30 : 365;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysAgo);

      let ordersQuery = supabase
        .from('orders')
        .select('total, created_at, status');

      if (dateRange !== 'all') {
        ordersQuery = ordersQuery.gte('created_at', startDate.toISOString());
      }

      const { data: orders } = await ordersQuery;

      if (orders) {
        const dateMap = new Map<string, { orders: number; revenue: number }>();

        orders.forEach(order => {
          const date = new Date(order.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });

          const current = dateMap.get(date) || { orders: 0, revenue: 0 };
          dateMap.set(date, {
            orders: current.orders + 1,
            revenue: current.revenue + Number(order.total)
          });
        });

        const ordersChartData = Array.from(dateMap.entries()).map(([date, data]) => ({
          date,
          orders: data.orders
        }));

        const revenueChartData = Array.from(dateMap.entries()).map(([date, data]) => ({
          date,
          revenue: data.revenue
        }));

        setOrdersData(ordersChartData);
        setRevenueData(revenueChartData);
      }

      const { data: orderItems } = await supabase
        .from('order_items')
        .select('product_name, quantity, price');

      if (orderItems) {
        const productMap = new Map<string, { quantity: number; revenue: number }>();

        orderItems.forEach(item => {
          const current = productMap.get(item.product_name) || { quantity: 0, revenue: 0 };
          productMap.set(item.product_name, {
            quantity: current.quantity + item.quantity,
            revenue: current.revenue + (item.quantity * Number(item.price))
          });
        });

        const topProductsData = Array.from(productMap.entries())
          .map(([name, data]) => ({
            name,
            quantity: data.quantity,
            revenue: data.revenue
          }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);

        setTopProducts(topProductsData);
      }

      const { data: userOrders } = await supabase
        .from('orders')
        .select('user_id, customer_name, total, profiles!orders_user_id_fkey(full_name)');

      if (userOrders) {
        const userMap = new Map<string, { name: string; total: number }>();

        userOrders.forEach((order: any) => {
          const userId = order.user_id || 'guest';
          const userName = order.profiles?.full_name || order.customer_name || 'Guest';
          const current = userMap.get(userId) || { name: userName, total: 0 };
          userMap.set(userId, {
            name: current.name,
            total: current.total + Number(order.total)
          });
        });

        const topUsersData = Array.from(userMap.entries())
          .map(([id, data]) => ({
            name: data.name,
            total: data.total
          }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);

        setTopUsers(topUsersData);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Analytics</h1>
          <p className="text-slate-600">Track your business performance</p>
        </div>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as DateRange)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Orders Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="orders" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Revenue Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff',
                }}
                formatter={(value: number) => `$${value.toFixed(2)}`}
              />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Top Products by Revenue</h2>
          <div className="space-y-3">
            {topProducts.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No data available</p>
            ) : (
              topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div>
                      <p className="font-medium text-slate-800">{product.name}</p>
                      <p className="text-sm text-slate-600">{product.quantity} sold</p>
                    </div>
                  </div>
                  <p className="font-semibold text-slate-800">
                    ${product.revenue.toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Top Customers by Spend</h2>
          <div className="space-y-3">
            {topUsers.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No data available</p>
            ) : (
              topUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <p className="font-medium text-slate-800">{user.name}</p>
                  </div>
                  <p className="font-semibold text-slate-800">
                    ${user.total.toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
