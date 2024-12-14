import React from 'react';
import { X } from 'lucide-react';
import { EducationItem } from '../types';

interface Props {
  item: EducationItem;
  onClose: () => void;
}

export const VideoModal: React.FC<Props> = ({ item, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-4xl">
        <div className="p-4 flex justify-between items-center border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center mb-4">
            {/* Placeholder for video player */}
            <p className="text-gray-400">Video player will be implemented here</p>
          </div>
          
          <div className="text-gray-300">
            <h4 className="font-medium mb-2">About this lesson</h4>
            <p className="text-gray-400">{item.description}</p>
            
            <div className="mt-4 flex items-center gap-4">
              <span className="text-sm text-gray-500">{item.duration}</span>
              <span className="text-sm text-gray-500">{item.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};