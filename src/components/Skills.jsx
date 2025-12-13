// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
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
    whileHover={{ scale: 1.05 }}
    className="card"
  >
    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      {title}
    </h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium"
        >
          {skill}
        </span>
      ))}
    </div>
  </motion.div>
);

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
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
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
          
          <div className="card">
            <h3 className="text-2xl font-bold mb-6 text-center">Skill Radar</h3>
            <div className="h-80">
              <Radar data={chartData} options={chartOptions} />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center mt-6">
              Versatile skill set spanning full-stack development, data science, and machine learning
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;