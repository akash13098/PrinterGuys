import { useEffect, useState } from 'react';
import { supabase, ContactMessage } from '../lib/supabase';
import { Search, Check, Trash2 } from 'lucide-react';

export default function Messages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, showResolved]);

  async function loadMessages() {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterMessages() {
    let filtered = messages;

    if (!showResolved) {
      filtered = filtered.filter(msg => !msg.is_resolved);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        msg =>
          msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  }

  async function toggleResolved(messageId: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_resolved: !currentStatus })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(
        messages.map(msg =>
          msg.id === messageId ? { ...msg, is_resolved: !currentStatus } : msg
        )
      );
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Failed to update message status');
    }
  }

  async function deleteMessage(messageId: string) {
    const confirmed = window.confirm('Are you sure you want to delete this message?');
    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      setMessages(messages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  }

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
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Contact Messages</h1>
        <p className="text-slate-600">Manage customer inquiries and feedback</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showResolved"
              checked={showResolved}
              onChange={(e) => setShowResolved(e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            <label htmlFor="showResolved" className="text-sm text-slate-700">
              Show resolved
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No messages found</div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-5 rounded-lg border transition-all ${
                  message.is_resolved
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-white border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-800">{message.name}</h3>
                      {message.is_resolved && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{message.email}</p>
                    <p className="text-xs text-slate-500">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleResolved(message.id, message.is_resolved)}
                      className={`p-2 rounded-lg transition-colors ${
                        message.is_resolved
                          ? 'text-slate-400 hover:bg-slate-200'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                      title={message.is_resolved ? 'Mark as unresolved' : 'Mark as resolved'}
                    >
                      <Check className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-700 whitespace-pre-wrap">{message.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
