import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { EducationItem } from '../types';
import { VideoModal } from './VideoModal';

interface Props {
  item: EducationItem;
}

export const ContentCard: React.FC<Props> = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div 
        className="flex-none w-80 group cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <div className="mt-2">
          <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-gray-400">{item.duration}</p>
        </div>
      </div>

      {showModal && (
        <VideoModal item={item} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};