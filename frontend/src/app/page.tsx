'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Board from '@/components/Board';

interface CardData {
  id: string;
  title: string;
  details: string;
}

interface ColumnData {
  id: string;
  name: string;
  cards: CardData[];
}

// Dummy data
const initialColumns: ColumnData[] = [
  {
    id: 'col-1',
    name: 'Column 1',
    cards: [
      { id: 'card-1', title: 'Task 1', details: 'This is the first task' },
      { id: 'card-2', title: 'Task 2', details: 'Another important task' },
    ],
  },
  {
    id: 'col-2',
    name: 'Column 2',
    cards: [
      { id: 'card-3', title: 'Feature A', details: 'Implement new feature' },
    ],
  },
  {
    id: 'col-3',
    name: 'Column 3',
    cards: [
      { id: 'card-4', title: 'Bug Fix', details: 'Fix the login issue' },
      { id: 'card-5', title: 'Review Code', details: 'Code review for PR #123' },
    ],
  },
  {
    id: 'col-4',
    name: 'Column 4',
    cards: [],
  },
  {
    id: 'col-5',
    name: 'Column 5',
    cards: [
      { id: 'card-6', title: 'Deploy', details: 'Deploy to production' },
    ],
  },
];

export default function Home() {
  const [columns, setColumns] = useState<ColumnData[]>(initialColumns);

  const handleColumnNameChange = (columnId: string, newName: string) => {
    setColumns(prev => prev.map(col =>
      col.id === columnId ? { ...col, name: newName } : col
    ));
  };

  const handleAddCard = (columnId: string) => {
    const newCard: CardData = {
      id: `card-${Date.now()}`,
      title: 'New Card',
      details: 'Add details here',
    };
    setColumns(prev => prev.map(col =>
      col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
    ));
  };

  const handleDeleteCard = (cardId: string) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      cards: col.cards.filter(card => card.id !== cardId),
    })));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the card and its current column
    let activeCard: CardData | null = null;
    let sourceColumnId: string | null = null;

    for (const column of columns) {
      const card = column.cards.find(c => c.id === activeId);
      if (card) {
        activeCard = card;
        sourceColumnId = column.id;
        break;
      }
    }

    if (!activeCard || !sourceColumnId) return;

    // Check if dropped on a column
    const targetColumn = columns.find(col => col.id === overId);
    if (targetColumn) {
      // Move card to the target column
      setColumns(prev => prev.map(col => {
        if (col.id === sourceColumnId) {
          return { ...col, cards: col.cards.filter(c => c.id !== activeId) };
        }
        if (col.id === overId) {
          return { ...col, cards: [...col.cards, activeCard!] };
        }
        return col;
      }));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Board
        columns={columns}
        onColumnNameChange={handleColumnNameChange}
        onAddCard={handleAddCard}
        onDeleteCard={handleDeleteCard}
      />
    </DndContext>
  );
}
