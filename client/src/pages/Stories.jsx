import React, { useState, useEffect } from 'react';
import { BookOpen, User } from 'lucide-react';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/stories`)
      .then(res => res.json())
      .then(data => {
        setStories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch stories", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Survivor Stories</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Read stories of courage and resilience. You are not alone in this journey.
          Sharing our truth helps us heal and empowers others to speak up.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading stories...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map(story => (
            <div key={story.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-pink-100 p-2 rounded-full">
                  <User size={20} className="text-pink-600" />
                </div>
                <span className="font-semibold text-gray-700">{story.authorAlias}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{story.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                "{story.content}"
              </p>
            </div>
          ))}

          {/* Add Story Card */}
          <div className="bg-purple-50 p-8 rounded-2xl border-2 border-dashed border-purple-200 flex flex-col items-center justify-center text-center">
            <BookOpen size={48} className="text-purple-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-700 mb-2">Share Your Story</h3>
            <p className="text-sm text-gray-500 mb-4">
              Your story can inspire others. Share it anonymously with our community.
            </p>
            <button
              onClick={() => alert("Story submission feature coming soon!")}
              className="bg-white text-purple-600 border border-purple-200 px-6 py-2 rounded-full font-medium hover:bg-purple-600 hover:text-white transition"
            >
              Write a Story
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
