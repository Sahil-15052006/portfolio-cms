import { useEffect, useState } from 'react';
import { Plus, X, Code } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import SkillBox from './skillComponents/skillBox';
import AddSkillModal from './skillComponents/AddSkillModal';
import { usePortfolio } from '../context/PortfolioContext';


type SkillType = 'frontend' | 'backend' | 'database' | 'tools';

type Skill = {
  _id: string;
  name: string;
  type: SkillType;
};

export default function SkillsSection() {


  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {loading, setLoading, API} = usePortfolio();

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${API}/skills`, {
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();

      setSkills(data);

    } catch (error) {
      console.error(error);
      toast.error('Failed to load skills');
    }
  };

  useEffect(() => {
   fetchSkills();
  }, []);

  const skillTypes = new Set(skills.map((skill) => skill.type));

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) {
      return;
    }

    try {

      const res = await fetch(`${API}/skills/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      await fetchSkills();

      toast.success('Skill deleted');

    } catch (error) {

      console.error(error);

      toast.error('Failed to delete skill');
    }
  };

  return (
    <div className="bg-[#111111]/70 backdrop-blur-xl border border-white/10 rounded-xl p-8">

      <Toaster position="bottom-center" />

      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-2">
          <Code className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-semibold text-slate-100">
            Skills
          </h2>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded sm:rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          Add <span className="hidden sm:block">Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {Array.from(skillTypes).map((skillType) => {

          const typeSkills = skills.filter(
            (skill) => skill.type === skillType
          );

          return (
            <SkillBox
            key={skillType}
            skillType={skillType}
            typeSkills={typeSkills}
            handleDelete={handleDelete} />
          );
        })}
      </div>

      {isModalOpen && (

        <AddSkillModal
          handleClose={handleClose}
          fetchSkills={fetchSkills}
        />
      )}
    </div>
  );
}
