import React, { useState, useEffect } from 'react';
import { Phone, Plus, Trash2 } from 'lucide-react';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newContact, setNewContact] = useState({ name: '', role: '', phone: '' });

  const fetchContacts = () => {
     fetch('http://localhost:3000/api/contacts')
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
           await fetch('http://localhost:3000/api/contacts', {
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Emergency Contacts</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-700">Saved Contacts</h2>
          <div className="space-y-4">
            {loading ? <p>Loading...</p> : contacts.map(contact => (
              <div key={contact.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.role}</p>
                </div>
                <div className="flex items-center gap-3">
                   <a href={`tel:${contact.phone}`} className="bg-green-100 p-2 rounded-full text-green-600 hover:bg-green-200">
                    <Phone size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
           <h2 className="text-xl font-bold mb-4 text-gray-700">Add New Contact</h2>
           <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
               <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                   <input
                    type="text"
                    required
                    value={newContact.name}
                    onChange={e => setNewContact({...newContact, name: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                   />
               </div>
               <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Role (e.g. Sister, Friend)</label>
                   <input
                    type="text"
                     value={newContact.role}
                    onChange={e => setNewContact({...newContact, role: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                   />
               </div>
               <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                   <input
                    type="tel"
                    required
                     value={newContact.phone}
                    onChange={e => setNewContact({...newContact, phone: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                   />
               </div>
               <button type="submit" className="w-full bg-brand-purple text-white py-2 rounded-md hover:bg-purple-700 flex justify-center items-center gap-2">
                   <Plus size={18} /> Add Contact
               </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
