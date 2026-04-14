'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Card from './Card';

interface CardData {
  id: string;
  title: string;
  details: string;
}

interface ColumnProps {
  id: string;
  name: string;
  cards: CardData[];
  onNameChange: (id: string, name: string) => void;
  onAddCard: (columnId: string) => void;
  onDeleteCard: (cardId: string) => void;
}

export default function Column({ id, name, cards, onNameChange, onAddCard, onDeleteCard }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="bg-gray-100 p-4 rounded min-w-[250px] max-w-[250px]">
      <input
        value={name}
        onChange={(e) => onNameChange(id, e.target.value)}
        className="w-full bg-transparent border-none outline-none text-lg font-bold mb-4"
        placeholder="Column name"
      />

      <div
        ref={setNodeRef}
        className={`min-h-[300px] space-y-2 ${isOver ? 'bg-blue-50' : ''}`}
      >
        <SortableContext items={cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              details={card.details}
              onDelete={onDeleteCard}
            />
          ))}
        </SortableContext>
      </div>

      <button
        onClick={() => onAddCard(id)}
        className="w-full mt-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        + Add Card
      </button>
    </div>
  );
}