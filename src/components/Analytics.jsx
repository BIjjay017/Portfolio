// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { TrendingUp, Code2, Database, Brain } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line no-unused-vars
const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="card text-center"
  >
    <div className={`inline-flex p-3 rounded-full ${color} mb-4`}>
      <Icon size={24} className="text-white" />
    </div>
    <h3 className="text-3xl font-bold mb-2">{value}</h3>
    <p className="text-gray-600 dark:text-gray-400">{label}</p>
  </motion.div>
);

const Analytics = ({ data }) => {
  const barData = {
    labels: data.focusAreas.map(area => area.name),
    datasets: [
      {
        label: 'Focus Distribution (%)',
        data: data.focusAreas.map(area => area.value),
        backgroundColor: [
          'rgba(125, 211, 252, 0.7)', // Light sky blue
          'rgba(134, 239, 172, 0.7)', // Light green
          'rgba(125, 211, 252, 0.5)', // Lighter sky blue
          'rgba(134, 239, 172, 0.5)'  // Lighter green
        ],
        borderColor: [
          'rgb(125, 211, 252)', // Light sky blue
          'rgb(134, 239, 172)', // Light green
          'rgb(56, 189, 248)',  // Sky blue
          'rgb(74, 222, 128)'   // Green
        ],
        borderWidth: 2
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#9CA3AF'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#9CA3AF'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#9CA3AF'
        }
      }
    }
  };

  return (
    <section id="analytics" className="section-container">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">
          Development <span className="gradient-text">Analytics</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={TrendingUp}
            label={data.stats[0].label}
            value={data.stats[0].value}
            color="bg-gradient-to-br from-primary-blue to-blue-600"
          />
          <StatCard
            icon={Code2}
            label={data.stats[1].label}
            value={data.stats[1].value}
            color="bg-gradient-to-br from-primary-green to-green-600"
          />
          <StatCard
            icon={Database}
            label={data.stats[2].label}
            value={data.stats[2].value}
            color="bg-gradient-to-br from-primary-blue to-primary-green"
          />
          <StatCard
            icon={Brain}
            label={data.stats[3].label}
            value={data.stats[3].value}
            color="bg-gradient-to-br from-orange-500 to-orange-700"
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="card">
            <h3 className="text-2xl font-bold mb-6">Focus Areas</h3>
            <div className="h-64">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="card">
              <h4 className="text-xl font-bold mb-4">Technology Stack Distribution</h4>
              <div className="space-y-4">
                {data.focusAreas.map((area, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{area.name}</span>
                      <span className="text-primary-blue">{area.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${area.value}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary-blue to-primary-green"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card">
              <h4 className="text-xl font-bold mb-4">Current Focus</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                  Building RAG applications with LLMs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-green rounded-full"></div>
                  Advanced Data Science techniques
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
                  Full-stack development with modern frameworks
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Analytics;