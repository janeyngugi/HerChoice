
import React, { useState } from 'react';
import { Send, AlertTriangle, CheckCircle, MapPin, Loader2, Activity, Home as HomeIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ReportIncident = () => {
  const [formData, setFormData] = useState({
    type: 'Physical',
    description: '',
    latitude: '',
    longitude: '',
    isAnonymous: true,
    needsMedical: false,
    needsShelter: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/reports`, {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Report Submitted</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for speaking up. Your report helps us understand and prevent violence.
            Your data is safe and anonymous.
          </p>

          {(formData.needsMedical || formData.needsShelter) && (
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8 text-left">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <AlertTriangle size={20} /> Recommended Resources
              </h3>
              <div className="space-y-3">
                {formData.needsMedical && (
                  <Link to="/help" className="block p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors flex items-center gap-3">
                    <div className="bg-red-50 p-2 rounded-full">
                      <Activity size={20} className="text-red-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Find Nearby Hospitals</span>
                      <span className="text-xs text-slate-500">Get medical attention immediately</span>
                    </div>
                  </Link>
                )}
                {formData.needsShelter && (
                  <Link to="/help" className="block p-3 bg-white rounded-lg border border-blue-200 hover:border-blue-400 transition-colors flex items-center gap-3">
                    <div className="bg-green-50 p-2 rounded-full">
                      <HomeIcon size={20} className="text-green-600" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Find Safe Shelters</span>
                      <span className="text-xs text-slate-500">Locate safe housing near you</span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}

          <Button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                type: 'Physical',
                description: '',
                latitude: '',
                longitude: '',
                isAnonymous: true,
                needsMedical: false,
                needsShelter: false
              });
            }}
            variant="primary"
            className="w-full"
          >
            Submit Another Report
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Report an Incident</h1>
        <p className="text-slate-600">Help us map and prevent gender-based violence. Your safety is our priority.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg border-t-4 border-t-primary">
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3 mb-8">
            <AlertTriangle className="text-blue-600 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-blue-800">
              <strong>Emergency Warning:</strong> If you are in immediate danger, please call 1195 or 999 immediately.
              This form is for data collection and pattern analysis, not immediate emergency response.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm flex items-center gap-2">
              <AlertTriangle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Type of Abuse</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-slate-50"
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">Description (Optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="What happened? Please exclude names if you wish to remain anonymous."
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-slate-50 resize-y"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Immediate Needs</label>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-slate-50">
                  <input
                    type="checkbox"
                    name="needsMedical"
                    id="needsMedical"
                    checked={formData.needsMedical}
                    onChange={handleChange}
                    className="h-5 w-5 text-primary focus:ring-primary border-slate-300 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <label htmlFor="needsMedical" className="font-medium text-slate-800 cursor-pointer block">Do you need medical attention?</label>
                    <p className="text-xs text-slate-500">We will recommend nearby hospitals.</p>
                  </div>
                  <Ambulance size={20} className="text-slate-400" />
                </div>

                <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg bg-slate-50">
                  <input
                    type="checkbox"
                    name="needsShelter"
                    id="needsShelter"
                    checked={formData.needsShelter}
                    onChange={handleChange}
                    className="h-5 w-5 text-primary focus:ring-primary border-slate-300 rounded cursor-pointer"
                  />
                  <div className="flex-1">
                    <label htmlFor="needsShelter" className="font-medium text-slate-800 cursor-pointer block">Do you need a safe place to stay?</label>
                    <p className="text-xs text-slate-500">We will recommend safe shelters.</p>
                  </div>
                  <HomeIcon size={20} className="text-slate-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={getLocation}
                  disabled={gettingLocation}
                  className="w-full justify-center gap-2 h-12"
                >
                  {gettingLocation ? <Loader2 className="animate-spin" size={18} /> : <MapPin size={18} />}
                  {gettingLocation ? 'Getting location...' : formData.latitude ? 'Location Updated' : 'Use Current Location'}
                </Button>
              </div>
              {formData.latitude && (
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <CheckCircle size={12} /> Coordinates captured: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 py-2">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
                id="anon"
                className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded cursor-pointer"
              />
              <label htmlFor="anon" className="text-sm text-slate-700 cursor-pointer select-none">
                Submit this report anonymously
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full gap-2 shadow-lg shadow-primary/25"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default ReportIncident;
