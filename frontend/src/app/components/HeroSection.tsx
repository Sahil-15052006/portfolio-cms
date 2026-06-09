import { useEffect, useState } from 'react';
import { Save, User, FileText } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface ProfileDetails {
  name: string;
  title: string;
  bio: string;
  profilePicURL: string;
  resumeURL: string;
}

export default function HeroSection() {

  const API = (import.meta as any).env.VITE_BACKEND_API;

  // for preview
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
    name: "",
    title: '',
    bio: '',
    profilePicURL: '',
    resumeURL: '',
  });

  // for upload
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

  const clearFields = () => {
      setName('');
      setTitle('');
      setBio('');
      setProfilePicFile(null);
      setResumeFile(null);
  }

  const fetchProfile = async () => {
      try {
        const res = await fetch(`${API}/profile`, {
          credentials: 'include',
        });
        if (!res.ok) {
          toast.error('Failed to load profile');
          return;
        }
        const data = await res.json();

        setProfileDetails({
          name: data.name,
          title: data.title,
          bio: data.bio,
          profilePicURL: data.profilePicURL,
          resumeURL: data.resumeURL,
        });



      } catch (err) {
        toast.error('Failed to load profile');
        console.error(err);
      }
    };

  useEffect(() => {
    fetchProfile();
  }, []);

  const [loading, setLoading] = useState(false);

  const updateProfile = async () => {
    try {

      setLoading(true);

      const form = new FormData();
      form.append('name', name);
      form.append('title', title);
      form.append('bio', bio);

      if (profilePicFile) {
        form.append('profilePic', profilePicFile);
      }
      if (resumeFile) {
        form.append('resume', resumeFile);
      }

      const res = await fetch(`${API}/profile/update`, {
        method: 'PATCH',
        body: form,
        credentials: 'include',
      });

      if (!res.ok) {
        toast.error('Failed to update profile');
        return;
      }

      const updatedProfile = await res.json();

      await fetchProfile();
      clearFields();

      toast.success('updated');

    } catch (err) {

      toast.error('Failed to update profile');
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111111]/70 backdrop-blur-xl border border-white/10 rounded-xl p-8">
      <Toaster position="bottom-center" />

      <div className="flex items-center gap-2 mb-6">
        <User className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-semibold text-slate-100">Hero Section</h2>
      </div>

      <div className="mb-8 text-center">
        <div className="max-w-2xl mx-auto">
          <label className="block text-start text-sm font-medium text-slate-300 mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicFile(e.target.files?.[0] || null)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-2 text-sm text-slate-500">Upload an image file (JPG, PNG, etc.)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName( e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Professional Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Full Stack Developer"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="A brief description about yourself"
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-slate-400" />
            <label className="block text-sm font-medium text-slate-300">Resume/CV</label>
          </div>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-2 text-sm text-slate-500">Upload a PDF or document file</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={updateProfile}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-medium rounded-lg transition-colors duration-200"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="mt-8 p-6 bg-[#1e1e1e]/40 backdrop-blur-lg border border-white/10 rounded-xl">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Preview</h3>
        <div className="text-center py-8">
          <img
            src={profileDetails.profilePicURL}
            alt="Preview"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
          <h2 className="text-3xl font-bold text-slate-100 mb-2">{profileDetails.name}</h2>
          <p className="text-xl text-blue-400 mb-4">{profileDetails.title}</p>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">{profileDetails.bio}</p>

          {profileDetails.resumeURL && (


              <a
                href={profileDetails.resumeURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 mb-2 text-center text-sm font-medium text-blue-400 hover:underline w-full justify-center">
                  <FileText className="w-4 h-4 " />
                  <label className="block text-sm font-medium">Resume/CV</label>
              </a>


          )}
        </div>
      </div>
    </div>
  );
}
