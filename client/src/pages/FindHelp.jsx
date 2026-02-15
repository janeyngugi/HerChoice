import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Phone, MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';

// Fix for Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const FindHelp = () => {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/resources`)
      .then(res => res.json())
      .then(data => {
        setResources(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch resources", err);
        setLoading(false);
      });
  }, []);

  const filteredResources = filter === 'All'
    ? resources
    : resources.filter(r => r.type === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Find Help Near You</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', 'Hospital', 'Shelter', 'Therapy', 'Police'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === type
                ? 'bg-brand-purple text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 h-[600px]">
        {/* List View */}
        <div className="overflow-y-auto pr-2 space-y-4">
          {loading ? (
            <p>Loading resources...</p>
          ) : filteredResources.length === 0 ? (
            <p>No resources found.</p>
          ) : (
            filteredResources.map(resource => (
              <div key={resource.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{resource.name}</h3>
                    <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-semibold ${resource.type === 'Hospital' ? 'bg-red-100 text-red-800' :
                        resource.type === 'Shelter' ? 'bg-green-100 text-green-800' :
                          resource.type === 'Police' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                      }`}>
                      {resource.type}
                    </span>
                  </div>
                  <a href={`tel:${resource.phone}`} className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 text-green-600">
                    <Phone size={20} />
                  </a>
                </div>

                <p className="text-gray-600 mt-3 text-sm">{resource.description}</p>

                <div className="mt-4 flex items-center text-gray-500 text-sm gap-2">
                  <MapPin size={16} />
                  {resource.address}
                </div>

                <button className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">
                  <Navigation size={16} /> Get Directions
                </button>
              </div>
            ))
          )}
        </div>

        {/* Map View */}
        <div className="h-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <MapContainer center={[-1.286389, 36.817223]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredResources.map(resource => (
              resource.latitude && resource.longitude && (
                <Marker key={resource.id} position={[resource.latitude, resource.longitude]}>
                  <Popup>
                    <strong>{resource.name}</strong><br />
                    {resource.type}<br />
                    {resource.phone}
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default FindHelp;
