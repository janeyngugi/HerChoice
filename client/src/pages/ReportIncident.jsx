import React, { useState } from 'react';
import { Send, AlertTriangle, CheckCircle } from 'lucide-react';

const ReportIncident = () => {
  const [formData, setFormData] = useState({
    type: 'Physical',
    description: '',
    latitude: '',
    longitude: '',
    isAnonymous: true
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [gettingLocation, setGettingLocation] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getLocation = () => {
    setGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
          setGettingLocation(false);
        },
        (err) => {
          console.error("Error getting location: ", err);
          setError("Could not get your location. Please enter it manually in description if needed.");
          setGettingLocation(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setGettingLocation(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setError(null);
      } else {
        throw new Error('Failed to submit report');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Report Submitted</h2>
        <p className="text-gray-600 mb-6">
          Thank you for speaking up. Your report helps us understand and prevent violence.
          Your data is safe and anonymous.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ type: 'Physical', description: '', latitude: '', longitude: '', isAnonymous: true });
          }}
          className="bg-brand-purple text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Submit Another Report
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6 text-brand-accent">
          <AlertTriangle size={32} />
          <h1 className="text-2xl font-bold text-gray-800">Report an Incident</h1>
        </div>

        <p className="text-gray-600 mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm">
          <strong>Your safety is priority.</strong> If you are in immediate danger, please call 999 or 1195 immediately.
          This form is for data collection to help prevent future violence. You can choose to remain completely anonymous.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type of Abuse</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none"
            >
              <option value="Physical">Physical Abuse</option>
              <option value="Sexual">Sexual Abuse</option>
              <option value="Emotional">Emotional/Verbal Abuse</option>
              <option value="Economic">Economic Abuse</option>
              <option value="Cyberbullying">Cyberbullying/Online Harassment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="What happened? (Do not include names if you wish to remain anonymous)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="flex gap-2">
               <button
                type="button"
                onClick={getLocation}
                disabled={gettingLocation}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2 transition"
               >
                 <MapPin size={18} />
                 {gettingLocation ? 'Getting location...' : formData.latitude ? 'Location Updated' : 'Use Current Location'}
               </button>
            </div>
            {formData.latitude && <p className="text-xs text-green-600 mt-1">Coordinates: {formData.latitude}, {formData.longitude}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleChange}
              id="anon"
              className="h-4 w-4 text-brand-purple focus:ring-brand-purple border-gray-300 rounded"
            />
            <label htmlFor="anon" className="text-sm text-gray-700">Submit Anonymously</label>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-purple text-white py-3 rounded-lg font-bold text-lg hover:bg-purple-700 transition shadow-md flex items-center justify-center gap-2"
          >
            Submit Report <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;
