import { useEffect, useState } from 'react';
import { supabase, CustomDesign } from '../lib/supabase';
import { Check, X, Image as ImageIcon } from 'lucide-react';

export default function Designs() {
  const [designs, setDesigns] = useState<CustomDesign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDesigns();
  }, []);

  async function loadDesigns() {
    try {
      const { data, error } = await supabase
        .from('custom_designs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDesigns(data || []);
    } catch (error) {
      console.error('Error loading designs:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateDesignStatus(designId: string, newStatus: 'approved' | 'rejected') {
    try {
      const currentUser = await supabase.auth.getUser();

      const { error } = await supabase
        .from('custom_designs')
        .update({
          status: newStatus,
          reviewed_at: new Date().toISOString(),
          reviewed_by: currentUser.data.user?.id,
        })
        .eq('id', designId);

      if (error) throw error;

      setDesigns(
        designs.map((design) =>
          design.id === designId
            ? { ...design, status: newStatus, reviewed_at: new Date().toISOString() }
            : design
        )
      );
    } catch (error) {
      console.error('Error updating design:', error);
      alert('Failed to update design status');
    }
  }

  const statusColors = {
    pending: 'bg-orange-100 text-orange-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Custom Designs</h1>
        <p className="text-slate-600">Review and approve user-submitted designs</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designs.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500">
              No designs found
            </div>
          ) : (
            designs.map((design) => (
              <div
                key={design.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-slate-100 relative">
                  {design.design_url ? (
                    <img
                      src={design.design_url}
                      alt="Custom design"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-16 w-16 text-slate-300" />
                    </div>
                  )}
                  <span
                    className={`absolute top-2 right-2 text-xs px-3 py-1 rounded-full font-medium ${
                      statusColors[design.status]
                    }`}
                  >
                    {design.status}
                  </span>
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-sm text-slate-600">
                      {new Date(design.created_at).toLocaleString()}
                    </p>
                  </div>

                  {design.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateDesignStatus(design.id, 'approved')}
                        className="flex-1 bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => updateDesignStatus(design.id, 'rejected')}
                        className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
