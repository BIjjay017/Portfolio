// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { container, fadeUp, pill } from '../utils/animations';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillCategory = ({ title, skills, color }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ scale: 1.03 }}
    className="card"
  >
    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      {title}
    </h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <motion.span
          key={index}
          variants={pill}
          whileHover={{ scale: 1.06 }}
          className="px-4 py-2 bg-slate-100/80 dark:bg-slate-700/80 rounded-full text-sm font-medium"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const SkillProgress = ({ radarData }) => {
  if (!radarData || !radarData.labels?.length) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">Skill data unavailable</div>
    );
  }

  return (
    <div className="space-y-3 mt-6">
      {radarData.labels.map((label, idx) => {
        const val = radarData.values?.[idx] ?? 0;
        return (
          <div key={label} className="flex items-center gap-4">
            <div className="w-32 text-sm text-gray-700 dark:text-gray-300">{label}</div>
            <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${val}%` }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="h-3 bg-primary-blue dark:bg-primary-blue-400 rounded-full"
              />
            </div>
            <div className="w-12 text-right text-sm text-gray-600 dark:text-gray-300">{val}%</div>
          </div>
        );
      })}
    </div>
  );
};

const Skills = ({ data }) => {
  const chartData = {
    labels: data.radarData.labels,
    datasets: [
      {
        label: 'Skill Proficiency',
        data: data.radarData.values,
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        borderColor: 'rgb(56, 189, 248)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(56, 189, 248)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: false
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#9CA3AF'
        }
      }
    }
  };

  return (
    <section id="skills" className="section-container">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="section-title">
          Technical <span className="gradient-text">Expertise</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <SkillCategory
              title="Programming Languages"
              skills={data.languages}
              color="bg-blue-500"
            />
            
            <SkillCategory
              title="Frameworks & Libraries"
              skills={data.frameworks}
              color="bg-green-500"
            />
            
            <SkillCategory
              title="Databases"
              skills={data.databases}
              color="bg-purple-500"
            />
            
            <SkillCategory
              title="Tools & Platforms"
              skills={data.tools}
              color="bg-yellow-500"
            />
          </div>
          
          <motion.div variants={fadeUp} className="card">
            <h3 className="text-2xl font-bold mb-6 text-center">Skill Radar</h3>
            <div className="h-80">
              <Radar data={chartData} options={chartOptions} />
            </div>

            {/* Add readable progress bars to show exact values */}
            <SkillProgress radarData={data.radarData} />

            <p className="text-gray-700 dark:text-gray-200 text-center mt-6">
              Versatile skill set spanning full-stack development, data science, and machine learning
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;