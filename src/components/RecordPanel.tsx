import React, { useState } from 'react';
import { Edit2, Trash2, Save, X } from 'lucide-react';
import { SelectedText } from '../types';

interface RecordPanelProps {
  selectedTexts: SelectedText[];
  setSelectedTexts: (texts: SelectedText[]) => void;
}

const RecordPanel: React.FC<RecordPanelProps> = ({
  selectedTexts,
  setSelectedTexts,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (text: SelectedText) => {
    setEditingId(text.id);
    setEditText(text.text);
  };

  const handleSave = () => {
    setSelectedTexts(
      selectedTexts.map((text) =>
        text.id === editingId ? { ...text, text: editText } : text
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setSelectedTexts(selectedTexts.filter((text) => text.id !== id));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '有价值谈话记录':
        return 'blue';
      case '优点':
        return 'green';
      case '缺点':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="w-96 bg-white rounded-xl shadow-md flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">谈话记录选择</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {selectedTexts.map((text) => (
          <div
            key={text.id}
            className={`border-l-4 border-${getCategoryColor(
              text.category
            )}-500 bg-gray-50 rounded-lg p-4`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm font-medium text-${getCategoryColor(
                  text.category
                )}-600`}
              >
                {text.category}
              </span>
              <div className="flex items-center space-x-2">
                {editingId === text.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(text)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(text.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
            {editingId === text.id ? (
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            ) : (
              <p className="text-gray-700">{text.text}</p>
            )}
            <div className="mt-2 text-sm text-gray-500">
              {text.timestamp.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordPanel;