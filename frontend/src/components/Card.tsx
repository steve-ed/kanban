'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CardProps {
  id: string;
  title: string;
  details: string;
  onDelete: (id: string) => void;
}

export default function Card({ id, title, details, onDelete }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white p-3 rounded shadow cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          className="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
      <p className="text-sm text-gray-600">{details}</p>
    </div>
  );
}