import React from 'react';

interface PartitionProps {
  id: string;
  color: string;
  onSplit: (id: string, direction: 'V' | 'H') => void;
  onRemove: (id: string) => void;
  direction: 'V' | 'H';
  children: React.ReactNode[];
  width: string;
  height: string;
}

const Partition: React.FC<PartitionProps> = ({ id, color, onSplit, onRemove, direction, children, width, height }) => {
  return (
    <div className={`relative border flex ${direction === 'V' ? 'flex-row' : 'flex-col'}`} style={{ backgroundColor: color, width, height }}>
      {!children.length && (
        <div className="absolute inset-0 flex justify-center items-center z-10 space-x-1">
          <button className="bg-blue-500 text-white p-1" onClick={() => onSplit(id, 'V')}>V</button>
          <button className="bg-green-500 text-white p-1" onClick={() => onSplit(id, 'H')}>H</button>
          <button className="bg-red-500 text-white p-1" onClick={() => onRemove(id)}>-</button>
        </div>
      )}
      {children.length > 0 && (
        <div className="flex w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default Partition;
