import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Phone, MapPin, Navigation, Search } from 'lucide-react';
import L from 'leaflet';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { motion } from 'framer-motion';

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
    // Mock data for presentation (Kenyan context)
    const mockResources = [
      {
        id: 1,
        name: "Kenyatta National Hospital - GBV Center",
        type: "Hospital",
        phone: "020 2726300",
        address: "Hospital Rd, Nairobi",
        description: "Comprehensive medical and psychological support for survivors of gender-based violence.",
        latitude: -1.3015,
        longitude: 36.8016
      },
      {
        id: 2,
        name: "Usikimye",
        type: "Shelter",
        phone: "+254 718 158 400",
        address: "Nairobi",
        description: "Shelter and rescue center for victims of domestic violence and SGBV.",
        latitude: -1.2921,
        longitude: 36.8219
      },
      {
        id: 3,
        name: "Kilimani Police Station",
        type: "Police",
        phone: "020 2723123",
        address: "Kilimani, Nairobi",
        description: "Gender Desk available for reporting cases of violence and abuse.",
        latitude: -1.2957,
        longitude: 36.7909
      },
      {
        id: 4,
        name: "GVRC - Gender Violence Recovery Centre",
        type: "Hospital",
        phone: "020 2716300",
        address: "Argwings Kodhek Rd, Nairobi (Nairobi Women's Hospital)",
        description: "Specialized medical treatment and psychosocial support for survivors.",
        latitude: -1.2985,
        longitude: 36.7905
      },
      {
        id: 5,
        name: "FIDA Kenya",
        type: "Therapy",
        phone: "0800 720 501",
        address: "Amboseli Road, Off Gitanga Road, Nairobi",
        description: "Legal aid and counseling services for women.",
        latitude: -1.2841,
        longitude: 36.7725
      },
      {
        id: 6,
        name: "Nairobi City County Gender Department",
        type: "Therapy",
        phone: "+254 722 000 000",
        address: "City Hall Way, Nairobi",
        description: "Social services and support for gender mainstreaming and protection.",
        latitude: -1.2864,
        longitude: 36.8260
      }
    ];

    setResources(mockResources);
    setLoading(false);

    /*
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
    */
  }, []);

  const filteredResources = filter === 'All'
    ? resources
    : resources.filter(r => r.type === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Find Help Near You</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Locate safe shelters, hospitals, and support centers in your area. You are not alone in this journey.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {['All', 'Hospital', 'Shelter', 'Therapy', 'Police'].map(type => (
          <Button
            key={type}
            variant={filter === type ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter(type)}
            className="rounded-full"
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-200px)] min-h-[600px]">
        {/* List View */}
        <div className="lg:col-span-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-slate-500">Finding nearby resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
              <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No resources found matching your criteria.</p>
            </div>
          ) : (
            filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:border-primary/30 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{resource.name}</h3>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium 
                        ${resource.type === 'Hospital' ? 'bg-red-50 text-red-600' :
                          resource.type === 'Shelter' ? 'bg-green-50 text-green-600' :
                            resource.type === 'Police' ? 'bg-blue-50 text-blue-600' :
                              'bg-purple-50 text-purple-600'
                        }`}>
                        {resource.type}
                      </span>
                    </div>
                    <a href={`tel:${resource.phone}`} className="bg-green-50 p-2 rounded-full text-green-600 hover:bg-green-100 transition-colors">
                      <Phone size={18} />
                    </a>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{resource.description}</p>

                  <div className="flex items-center text-slate-500 text-sm gap-2 mb-4">
                    <MapPin size={16} className="shrink-0" />
                    <span className="truncate">{resource.address}</span>
                  </div>

                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Navigation size={16} /> Get Directions
                  </Button>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Map View */}
        <div className="lg:col-span-2 h-full rounded-2xl overflow-hidden shadow-md border border-slate-200 relative z-0">
          <MapContainer center={[-1.286389, 36.817223]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredResources.map(resource => (
              resource.latitude && resource.longitude && (
                <Marker key={resource.id} position={[resource.latitude, resource.longitude]}>
                  <Popup>
                    <div className="p-1">
                      <strong className="block text-slate-900 mb-1">{resource.name}</strong>
                      <span className="text-slate-500 text-xs">{resource.type}</span>
                      <br />
                      <a href={`tel:${resource.phone}`} className="text-primary text-sm font-medium mt-1 inline-block">
                        {resource.phone}
                      </a>
                    </div>
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
