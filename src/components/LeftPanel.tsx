import React, { useState } from 'react';
import { User, Users, ChevronDown, PlayCircle, StopCircle } from 'lucide-react';
import { Person } from '../types';

interface LeftPanelProps {
  interviewer: Person | null;
  setInterviewer: (person: Person | null) => void;
  interviewee: Person | null;
  setInterviewee: (person: Person | null) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  interviewer,
  setInterviewer,
  interviewee,
  setInterviewee,
  isRecording,
  setIsRecording,
}) => {
  const [activeTab, setActiveTab] = useState<'comprehensive' | 'research'>('comprehensive');

  const interviewers = [
    { id: 1, name: '张主任', title: '部门主任' },
    { id: 2, name: '李经理', title: '人事经理' },
  ];

  const comprehensiveEval = {
    '领导班子': [
      { id: 101, name: '王总', title: '总经理' },
      { id: 102, name: '赵副总', title: '副总经理' },
    ],
    '领导人员': [
      { id: 201, name: '陈经理', title: '部门经理' },
      { id: 202, name: '刘主管', title: '技术主管' },
    ],
    '外部董事': [
      { id: 301, name: '张董事', title: '外部董事' },
      { id: 302, name: '周董事', title: '外部董事' },
    ],
    '意见建议': [
      { id: 401, name: '孙工', title: '高级工程师' },
      { id: 402, name: '吴工', title: '系统架构师' },
    ],
  };

  const specialResearch = {
    '三级正': [
      { id: 501, name: '郑经理', title: '三级正职' },
      { id: 502, name: '王经理', title: '三级正职' },
    ],
    '三级副': [
      { id: 601, name: '李副经理', title: '三级副职' },
      { id: 602, name: '张副经理', title: '三级副职' },
    ],
    '四级正': [
      { id: 701, name: '刘主管', title: '四级正职' },
      { id: 702, name: '陈主管', title: '四级正职' },
    ],
    '四级副': [
      { id: 801, name: '周副主管', title: '四级副职' },
      { id: 802, name: '吴副主管', title: '四级副职' },
    ],
    '青年骨干': [
      { id: 901, name: '郭工程师', title: '青年骨干' },
      { id: 902, name: '马工程师', title: '青年骨干' },
    ],
  };

  return (
    <div className="w-80 bg-white rounded-xl shadow-md flex flex-col">
      {/* Interviewer Selection */}
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <User className="w-5 h-5 mr-2 text-blue-600" />
          谈话人选择
        </h2>
        <select
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={interviewer?.id || ''}
          onChange={(e) => {
            const selected = interviewers.find(i => i.id === Number(e.target.value));
            setInterviewer(selected || null);
          }}
        >
          <option value="">请选择谈话人</option>
          {interviewers.map(person => (
            <option key={person.id} value={person.id}>
              {person.name} - {person.title}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'comprehensive'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('comprehensive')}
        >
          综合考评
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'research'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('research')}
        >
          专题调研
        </button>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'comprehensive' ? (
          <div className="p-4">
            {Object.entries(comprehensiveEval).map(([category, people]) => (
              <div key={category} className="mb-4">
                <div className="flex items-center text-gray-700 mb-2">
                  <ChevronDown className="w-4 h-4 mr-1" />
                  <span className="font-medium">{category}</span>
                </div>
                <div className="ml-6 space-y-2">
                  {people.map(person => (
                    <button
                      key={person.id}
                      onClick={() => setInterviewee(person)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        interviewee?.id === person.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {person.name} - {person.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4">
            {Object.entries(specialResearch).map(([category, people]) => (
              <div key={category} className="mb-4">
                <div className="flex items-center text-gray-700 mb-2">
                  <ChevronDown className="w-4 h-4 mr-1" />
                  <span className="font-medium">{category}</span>
                </div>
                <div className="ml-6 space-y-2">
                  {people.map(person => (
                    <button
                      key={person.id}
                      onClick={() => setInterviewee(person)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        interviewee?.id === person.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {person.name} - {person.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recording Control */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => setIsRecording(!isRecording)}
          disabled={!interviewer || !interviewee}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center space-x-2 ${
            !interviewer || !interviewee
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : isRecording
              ? 'bg-red-50 text-red-600 hover:bg-red-100'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {isRecording ? (
            <>
              <StopCircle className="w-5 h-5" />
              <span>停止记录</span>
            </>
          ) : (
            <>
              <PlayCircle className="w-5 h-5" />
              <span>开始记录</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;