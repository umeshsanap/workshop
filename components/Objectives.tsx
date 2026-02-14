
import React from 'react';
import { Award, Lightbulb, UserCheck } from 'lucide-react';

export const Objectives: React.FC = () => {
  const goals = [
    {
      icon: <Award className="w-8 h-8 text-[#f5a623]" />,
      title: 'Deliver Excellence',
      desc: 'Build and deliver high-quality software and solutions that meet client needs and drive business success.',
      color: '#f5a623',
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-[#00d4ff]" />,
      title: 'Innovate & Lead',
      desc: 'Stay at the forefront of technology, adopt best practices, and innovate to create lasting value.',
      color: '#00d4ff',
    },
    {
      icon: <UserCheck className="w-8 h-8 text-[#2ecc71]" />,
      title: 'Grow Our People',
      desc: 'Invest in talent, foster a culture of learning, and build teams that grow with the company.',
      color: '#2ecc71',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-14">
        <div
          className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: 'rgba(245, 166, 35, 0.1)', border: '1px solid rgba(245, 166, 35, 0.3)', color: '#f5a623' }}
        >
          Our Goals
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Goals of <span className="text-[#00d4ff]">FutureBright</span> IT Solutions
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          What we aim for—quality, innovation, and people.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {goals.map((goal, idx) => (
          <div
            key={idx}
            className={`flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className="glass rounded-2xl p-8 flex flex-col items-center text-center border transition-all duration-300 hover:scale-[1.02] w-full max-w-md"
              style={{
                borderColor: `${goal.color}30`,
                boxShadow: `0 0 30px ${goal.color}15`,
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{
                  background: `${goal.color}20`,
                  boxShadow: `0 0 24px ${goal.color}30`,
                }}
              >
                {goal.icon}
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{ fontFamily: 'Orbitron, sans-serif', color: goal.color }}
              >
                {goal.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {goal.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
