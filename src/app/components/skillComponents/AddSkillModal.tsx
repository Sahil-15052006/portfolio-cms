
import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { toast , Toaster } from 'react-hot-toast';


interface AddSkillModalProps {
  handleClose: () => void;
  fetchSkills: () => Promise<void>;
}

export default function AddSkillModal({ handleClose, fetchSkills }: AddSkillModalProps) {

  const {loading, setLoading , API} = usePortfolio();

  const [skillName, setSkillName] = useState('');
  const [skillType, setSkillType] = useState('');

    // SAVE SKILL
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (skillName.trim() === '' || skillType.trim() === '') {
      toast.error('All fields are required');
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(`${API}/skills`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: skillName, type: skillType }),
        });

      await fetchSkills();

      toast.success(`${skillName} added in ${skillType} skill-stack`);

      handleClose();

    } catch (error) {

      console.error(error);
      toast.error('Failed to save skill');

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <Toaster position="bottom-center" />
          <div className="w-full max-w-md bg-[#111111]/95 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-slate-100 mb-6">
              Add New Skill
            </h3>

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., React"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                <input
                  type="text"
                  value={skillType}
                  onChange={(e) => setSkillType(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Frontend"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>

            </form>
          </div>
        </div>
  );
}
