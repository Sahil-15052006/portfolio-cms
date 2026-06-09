import {
  ExternalLink,
  Edit,
  Trash2,
} from 'lucide-react';

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
  project: Project;
  handleOpen: (project: Project) => void;
  handleDelete: (id: string) => void;
}

export default function ProjectCard({
  project,
  handleOpen,
  handleDelete,
}: Props) {

  const tagsArray=(project.tags || "").split(',');

  return (
    <div className="bg-[#1e1e1e]/60 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-200">

      {project.imageURL && (

        <img
          src={project.imageURL}
          alt={project.title}
          className="w-full h-48 object-cover"
        />

      )}

      <div className="p-5">

        <h3 className="text-lg font-semibold text-slate-100 mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-slate-400 mb-4 line-clamp-2">
          {project.description}
        </p>

        {(tagsArray || []).length > 0 && (

          <div className="flex flex-wrap gap-2 mb-4">

            {(tagsArray || []).map((tag, index) => (

              <span
                key={`${tag}-${index}`}
                className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md"
              >
                {tag}
              </span>

            ))}

          </div>

        )}

        <div className="flex items-center justify-between">

          <div className="flex gap-3">

            {project.githubURL && (

              <a
                href={project.githubURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >

                <ExternalLink className="w-4 h-4" />

                Code

              </a>

            )}

            {project.demoURL && (

              <a
                href={project.demoURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >

                <ExternalLink className="w-4 h-4" />

                Demo

              </a>

            )}

          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() => handleOpen(project)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >

              <Edit className="w-4 h-4 text-slate-400 hover:text-white" />

            </button>

            <button
              onClick={() => handleDelete(project._id)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >

              <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" />

            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
