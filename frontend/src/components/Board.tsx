import Column from './Column';

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

interface BoardProps {
  columns: ColumnData[];
  onColumnNameChange: (id: string, name: string) => void;
  onAddCard: (columnId: string) => void;
  onDeleteCard: (cardId: string) => void;
}

export default function Board({ columns, onColumnNameChange, onAddCard, onDeleteCard }: BoardProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Kanban Board</h1>
      <div className="flex gap-4 overflow-x-auto">
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            name={column.name}
            cards={column.cards}
            onNameChange={onColumnNameChange}
            onAddCard={onAddCard}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </div>
    </div>
  );
}