import React, { useRef, useEffect } from 'react';
import { Clock, User, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { InterviewData, SelectedText } from '../types';

interface ConversationAreaProps {
  segments: InterviewData[];
  setSelectedTexts: (texts: SelectedText[]) => void;
  isRecording: boolean;
}

const ConversationArea: React.FC<ConversationAreaProps> = ({
  segments,
  setSelectedTexts,
  isRecording,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [segments]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    const selectedText = selection.toString();
    if (selectedText) {
      const menu = document.createElement('div');
      menu.className = 'fixed bg-white shadow-lg rounded-full py-2 px-3 z-50 flex items-center space-x-2 border border-gray-100';
      menu.style.left = `${rect.left + (rect.width / 2) - 75}px`; // Center the menu
      menu.style.top = `${rect.bottom + 8}px`;
      
      const categories = [
        { name: '有价值谈话记录', color: 'blue', icon: MessageSquare },
        { name: '优点', color: 'green', icon: ThumbsUp },
        { name: '缺点', color: 'red', icon: ThumbsDown }
      ];

      categories.forEach(category => {
        const button = document.createElement('button');
        button.className = `w-8 h-8 flex items-center justify-center rounded-full hover:bg-${category.color}-50 text-${category.color}-600 transition-colors duration-200`;
        button.innerHTML = `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${category.icon === MessageSquare ? '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>' : 
            category.icon === ThumbsUp ? '<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>' :
            '<path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>'}
        </svg>`;
        button.title = category.name;
        button.onclick = () => {
          setSelectedTexts(prev => [...prev, {
            id: Date.now(),
            text: selectedText,
            category: category.name,
            timestamp: new Date()
          }]);
          document.body.removeChild(menu);
        };
        menu.appendChild(button);
      });

      // Add a small arrow at the top of the menu
      const arrow = document.createElement('div');
      arrow.className = 'absolute -top-2 left-1/2 transform -translate-x-1/2';
      arrow.innerHTML = '<div class="w-3 h-3 bg-white rotate-45 transform origin-center border-t border-l border-gray-100"></div>';
      menu.appendChild(arrow);

      document.body.appendChild(menu);

      const cleanup = () => {
        if (document.body.contains(menu)) {
          document.body.removeChild(menu);
        }
        document.removeEventListener('click', cleanup);
      };

      setTimeout(() => {
        document.addEventListener('click', cleanup);
      }, 0);
    }
  };

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">谈话记录区域</h2>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onMouseUp={handleTextSelection}
      >
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-blue-600">
                  <User className="w-4 h-4 mr-1" />
                  <span className="font-medium">
                    {segment.interviewer.name} → {segment.interviewee.name}
                  </span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>
                    {segment.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed selection:bg-blue-100">
              {segment.content}
            </p>
          </div>
        ))}
        {isRecording && (
          <div className="text-center text-blue-600 animate-pulse">
            正在记录...
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationArea;