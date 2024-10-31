import React, { useState, useEffect } from 'react';
import { LayoutGrid, Users, ClipboardList, MessageSquareText } from 'lucide-react';
import LeftPanel from './components/LeftPanel';
import ConversationArea from './components/ConversationArea';
import RecordPanel from './components/RecordPanel';
import { InterviewData, Person, SelectedText } from './types';

function App() {
  const [interviewer, setInterviewer] = useState<Person | null>(null);
  const [interviewee, setInterviewee] = useState<Person | null>(null);
  const [conversationSegments, setConversationSegments] = useState<InterviewData[]>([
    {
      id: 1,
      interviewer: { id: 1, name: '张主任', title: '部门主任' },
      interviewee: { id: 101, name: '王总', title: '总经理' },
      timestamp: new Date('2024-03-15T10:00:00'),
      content: '王总，您好。今天想和您聊一下关于公司未来发展战略的问题。您认为我们在数字化转型方面应该采取哪些措施？'
    },
    {
      id: 2,
      interviewer: { id: 1, name: '张主任', title: '部门主任' },
      interviewee: { id: 101, name: '王总', title: '总经理' },
      timestamp: new Date('2024-03-15T10:00:20'),
      content: '我认为数字化转型是公司发展的重中之重。首先，我们要加大技术投入，提升核心竞争力。其次，要注重人才培养，建立完善的培训体系。最后，要持续优化业务流程，提高运营效率。'
    },
    {
      id: 3,
      interviewer: { id: 1, name: '张主任', title: '部门主任' },
      interviewee: { id: 101, name: '王总', title: '总经理' },
      timestamp: new Date('2024-03-15T10:00:40'),
      content: '对于具体实施步骤，我建议先从基础设施改造开始，包括云平台建设和数据中心升级。同时要注意数据安全，建立完善的安全保障体系。'
    },
    {
      id: 4,
      interviewer: { id: 1, name: '张主任', title: '部门主任' },
      interviewee: { id: 101, name: '王总', title: '总经理' },
      timestamp: new Date('2024-03-15T10:01:00'),
      content: '在人才培养方面，我们要建立专门的数字化人才培养计划，包括技术培训和管理能力提升。同时要建立激励机制，吸引和留住优秀人才。'
    }
  ]);
  const [selectedTexts, setSelectedTexts] = useState<SelectedText[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (isRecording && interviewer && interviewee) {
      const interval = setInterval(() => {
        const newSegment: InterviewData = {
          id: Date.now(),
          interviewer,
          interviewee,
          timestamp: new Date(),
          content: '模拟的谈话内容...' // In real app, this would come from speech recognition
        };
        setConversationSegments(prev => [...prev, newSegment]);
      }, 20000);

      return () => clearInterval(interval);
    }
  }, [isRecording, interviewer, interviewee]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-6 py-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <LayoutGrid className="w-6 h-6" />
            <h1 className="text-xl font-semibold">谈话管理系统</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Users className="w-5 h-5" />
            <ClipboardList className="w-5 h-5" />
            <MessageSquareText className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 flex gap-6 h-[calc(100vh-5rem)]">
        <LeftPanel
          interviewer={interviewer}
          setInterviewer={setInterviewer}
          interviewee={interviewee}
          setInterviewee={setInterviewee}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
        />
        <ConversationArea
          segments={conversationSegments}
          setSelectedTexts={setSelectedTexts}
          isRecording={isRecording}
        />
        <RecordPanel
          selectedTexts={selectedTexts}
          setSelectedTexts={setSelectedTexts}
        />
      </main>
    </div>
  );
}

export default App;