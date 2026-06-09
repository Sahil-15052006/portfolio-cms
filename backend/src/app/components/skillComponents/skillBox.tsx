import { X } from 'lucide-react';

interface Skill {
  _id: string;
  name: string;
  type: string;
}

interface Props {
  skillType: string;
  typeSkills: Skill[];
  handleDelete: (id: string) => void;
}

export default function SkillBox({
  skillType,
  typeSkills,
  handleDelete,
}: Props) {

  return (
    <div className="p-6 rounded-xl border border-white/10 bg-[#1e1e1e]/40 backdrop-blur-lg min-h-[200px]">

      <div className="flex items-center gap-2 mb-4">

        <div className="w-2 h-2 rounded-full bg-blue-400" />

        <h3 className="text-lg font-semibold text-slate-100 capitalize">
          {skillType}
        </h3>

      </div>

      <div className="flex flex-wrap gap-2">

        {typeSkills.length === 0 ? (

          <p className="text-sm text-slate-500">
            No skills added yet
          </p>

        ) : (

          typeSkills.map((skill) => (

            <div
              key={skill._id}
              className="group flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/15 transition-colors duration-200"
            >

              <button className="text-sm text-slate-200 hover:text-white">
                {skill.name}
              </button>

              <button
                onClick={() => handleDelete(skill._id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-slate-400 hover:text-red-400" />
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
