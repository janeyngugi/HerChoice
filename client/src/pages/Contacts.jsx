import React, { useState, useEffect } from 'react';
import { Phone, Plus, Trash2, User, ShieldAlert } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { motion } from 'framer-motion';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newContact, setNewContact] = useState({ name: '', role: '', phone: '' });

  const fetchContacts = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/contacts`)
      .then(res => res.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch contacts", err);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact)
      });
      setNewContact({ name: '', role: '', phone: '' });
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Emergency Contacts</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Keep your trusted circle close. Add contacts who should be notified in case of an emergency.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-primary/10 p-2 rounded-lg">
              <ShieldAlert className="text-primary h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Saved Contacts</h2>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : contacts.length === 0 ? (
              <Card className="text-center py-8 border-dashed border-2 border-slate-200 shadow-none">
                <User className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No emergency contacts added yet.</p>
              </Card>
            ) : (
              contacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="flex justify-between items-center p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <User size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{contact.name}</h3>
                        <p className="text-sm text-slate-500">{contact.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={`tel:${contact.phone}`} className="bg-green-50 p-2 rounded-lg text-green-600 hover:bg-green-100 transition-colors">
                        <Phone size={18} />
                      </a>
                      <button className="bg-red-50 p-2 rounded-lg text-red-500 hover:bg-red-100 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-secondary/10 p-2 rounded-lg">
                <Plus className="text-secondary h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Add New Contact</h2>
            </div>

            <form onSubmit={handleAdd} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={newContact.name}
                  onChange={e => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Role / Relationship</label>
                <input
                  type="text"
                  placeholder="e.g. Sister, Best Friend"
                  value={newContact.role}
                  onChange={e => setNewContact({ ...newContact, role: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 234 567 890"
                  value={newContact.phone}
                  onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full gap-2 mt-4">
                <Plus size={18} /> Add Contact
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contacts;
