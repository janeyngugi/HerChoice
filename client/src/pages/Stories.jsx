import React, { useState, useEffect } from 'react';
import { BookOpen, User, Quote, PenTool, X, Send, Loader2, CheckCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    authorAlias: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock data for presentation (Kenyan context)
    const mockStories = [
      {
        id: 1,
        title: "Finding My Voice in Nairobi",
        authorAlias: "Wangari",
        content: "I never thought I would be able to speak up about what happened to me. Growing up in a small estate in Nairobi, silence was the norm. But after finding this community, I realized I wasn't alone. The counseling sessions at the local center gave me the strength to report my abuser. Today, I am studying law to help other women find their justice."
      },
      {
        id: 2,
        title: "Hope After the Storm",
        authorAlias: "Amani",
        content: "The support I received from the helpline saved my life. I was trapped in a situation in Mombasa that felt hopeless. One call changed everything. The operator listened without judgment and guided me to a safe shelter appropriately named 'Salama House'. I am now rebuilding my life and starting a small business. There is always hope."
      },
      {
        id: 3,
        title: "Breaking the Cycle",
        authorAlias: "Adhiambo",
        content: "For years, I thought it was my fault. In Kisumu, traditions sometimes weigh heavy on us. But education opened my eyes. I attended a workshop about GBV and realized abuse is never acceptable. I stood up for myself and my daughters. It was the hardest thing I've ever done, but now we are free and safe."
      },
      {
        id: 4,
        title: "A New Beginning",
        authorAlias: "Nanjala",
        content: "Leaving was terrifying, but staying would have been fatal. With the help of a local NGO in Eldoret, I found the courage to pack my bags. The journey hasn't been easy, but waking up without fear is a blessing I cherish every day. My scars are healing, and I am learning to love myself again."
      },
      {
        id: 5,
        title: "Strength in Sisterhood",
        authorAlias: "Fatuma",
        content: "I found strength in the stories of others. Knowing that women in Kilifi and across Kenya were fighting similar battles gave me courage. We are not victims; we are survivors. Together, we can change the narrative and create a safer world for the next generation of girls."
      }
    ];

    setStories(mockStories);
    setLoading(false);

    /* 
    // Original fetch logic commented out for presentation
    fetch(`/api/stories`)
      .then(res => res.json())
      .then(data => {
        setStories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch stories", err);
        setLoading(false);
      });
    */
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to submit story');

      setSubmitSuccess(true);
      setFormData({ title: '', authorAlias: '', content: '' });
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowModal(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Survivor Stories</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Stories of courage, resilience, and hope. Sharing our truth empowers us all.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border border-primary/10 h-full flex flex-col items-center justify-center text-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <PenTool size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Share Your Story</h3>
              <p className="text-slate-600 mb-6 text-sm">
                Your voice matters. Sharing your experience can help others feel less alone and inspire hope.
              </p>
              <Button
                onClick={() => setShowModal(true)}
                variant="primary"
                className="w-full sm:w-auto"
              >
                Write a Story
              </Button>
            </div>
          </motion.div>

          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-secondary/10 p-2 rounded-full">
                    <User size={16} className="text-secondary" />
                  </div>
                  <span className="font-semibold text-slate-900 text-sm">{story.authorAlias || 'Anonymous'}</span>
                </div>

                <div className="mb-4 relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-slate-100 -z-10" />
                  <h3 className="text-lg font-bold mb-2 text-slate-800 group-hover:text-primary transition-colors">{story.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm line-clamp-6">
                    {story.content}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Submission Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            >
              {submitSuccess ? (
                <div className="p-12 text-center">
                  <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Story Submitted</h3>
                  <p className="text-slate-600">
                    Thank you for sharing your truth. Your story has been submitted for review and will be published shortly.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900">Share Your Story</h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                      <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Give your story a title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Alias (Optional)</label>
                      <input
                        type="text"
                        name="authorAlias"
                        value={formData.authorAlias}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        placeholder="Anonymous"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Your Story</label>
                      <textarea
                        name="content"
                        required
                        rows="6"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                        placeholder="Write your story here..."
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        className="w-full gap-2"
                        disabled={submitting}
                      >
                        {submitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                        {submitting ? 'Submitting...' : 'Submit Story'}
                      </Button>
                      <p className="text-xs text-slate-500 text-center mt-3">
                        Your story will be reviewed before being published to ensure community guidelines are met.
                      </p>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stories;
