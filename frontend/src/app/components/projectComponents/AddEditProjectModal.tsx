import { useEffect, useState } from "react";

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string;
  imageURL: string;
  githubURL: string;
  demoURL: string;
}

interface Props {
  editingProject: Project | null;
  handleClose: () => void;
  handleSave: (formData: FormData) => Promise<void>;
  loading: boolean;
}

export default function AddEditProjectModal({
  editingProject,
  handleClose,
  handleSave,
  loading,
}: Props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [githubURL, setGithubURL] = useState("");
  const [demoURL, setDemoURL] = useState("");

  useEffect(() => {
    if (editingProject) {

      setTitle(editingProject.title);
      setDescription(editingProject.description);
      setTags(editingProject.tags);
      setGithubURL(editingProject.githubURL);
      setDemoURL(editingProject.demoURL);

    } else {
      setTitle("");
      setDescription("");
      setTags("");
      setImage(null);
      setGithubURL("");
      setDemoURL("");
    }
  }, [editingProject]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("githubURL", githubURL);
    formData.append("demoURL", demoURL);
    formData.append("tags", tags);
    if (image) {
      formData.append("image", image);
    }

    await handleSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#111111]/95 border border-white/10 rounded-xl p-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold text-slate-100 mb-6">
          {editingProject ? "Edit Project" : "Add New Project"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100"
          />

          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Project description"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100 resize-none"
          />

          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="React, Node, MongoDB"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100"
          />

          <input
            type="url"
            value={githubURL}
            onChange={(e) => setGithubURL(e.target.value)}
            placeholder="Github URL"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100"
          />

          <input
            type="url"
            value={demoURL}
            onChange={(e) => setDemoURL(e.target.value)}
            placeholder="Demo URL"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-slate-100"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
