import { useEffect, useState } from "react";
import { Plus, Briefcase } from "lucide-react";
import ProjectCard from "./projectComponents/ProjectCard";
import AddEditProjectModal from "./projectComponents/AddEditProjectModal";
import { usePortfolio } from "../context/PortfolioContext";
import toast, { Toaster } from "react-hot-toast";

export type Project = {
  _id: string;
  title: string;
  description: string;
  tags: string;
  imageURL: string;
  githubURL: string;
  demoURL: string;
};

export default function ProjectsSection() {
  const { loading, setLoading, API } = usePortfolio();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
  try {
      const res = await fetch(`${API}/projects`,{
        method:'GET',
        credentials:'include'
      })
      const data=await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      // console.log(data)
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(`ERROR : ${error}`);
      toast.error('Failed to fetch projects')
    }
  };

  useEffect(()=>{
    fetchProjects();
  },[]);

  const handleOpen = (project?: Project) => {
    if (project) {
      setEditingProject(project);
    } else {
      setEditingProject(null);
    }
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  };

const handleSave = async (formData: FormData) => {
  try {
    setLoading(true);

    const res = await fetch(
      editingProject
        ? `${API}/projects/${editingProject._id}`
        : `${API}/projects`,
      {
        method: editingProject ? "PATCH" : "POST",
        credentials: "include",
        body: formData,
      }
    );

    const data=await res.json()

    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }


    await fetchProjects();

    toast.success(editingProject? "Updated" :"Created")
    handleClose();

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const handleDelete = async (id: string) => {
  try {
    const res = await fetch(`${API}/projects/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data=await res.json()

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    await fetchProjects();

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="bg-[#111111]/70 backdrop-blur-xl border border-white/10 rounded-xl p-8">
      <Toaster position="bottom-center"/>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-400" />

          <h2 className="text-2xl font-semibold text-slate-100">Projects</h2>
        </div>

        <button
          onClick={() => handleOpen()}
          className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded sm:rounded-lg "
        >
          <Plus className="w-4 h-4" />
          Add <span className="hidden sm:block">Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">No projects added yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              handleOpen={handleOpen}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <AddEditProjectModal
          editingProject={editingProject}
          handleClose={handleClose}
          handleSave={handleSave}
          loading={loading}
        />
      )}
    </div>
  );
}
