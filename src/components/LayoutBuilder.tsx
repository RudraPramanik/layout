
import React, { useState } from 'react';
import Partition from './Partition';

const getRandomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

const LayoutBuilder = () => {
  const [partitions, setPartitions] = useState([{ id: 1, color: getRandomColor(), children: [], direction: 'V', width: '80vw', height: '80vh' }]);
  const maxSplits = 10;
  const splitCounts = {};

  const handleSplit = (id, direction) => {
    if (splitCounts[id] >= maxSplits) return;
    splitCounts[id] = (splitCounts[id] || 0) + 1;

    setPartitions((prevPartitions) => {
      const newPartitions = JSON.parse(JSON.stringify(prevPartitions));
      const partition = findPartition(newPartitions, id);

      const newWidth = direction === 'V' ? '50%' : '100%';
      const newHeight = direction === 'H' ? '50%' : '100%';

      const newPartition1 = { id: generateId(), color: partition.color, children: [], direction, width: newWidth, height: newHeight };
      const newPartition2 = { id: generateId(), color: getRandomColor(), children: [], direction, width: newWidth, height: newHeight };

      partition.children = [newPartition1, newPartition2];

      return newPartitions;
    });
  };

  const handleRemove = (id) => {
    setPartitions((prevPartitions) => removePartition(prevPartitions, id));
  };

  const findPartition = (partitions, id) => {
    for (const partition of partitions) {
      if (partition.id === id) return partition;
      if (partition.children.length > 0) {
        const found = findPartition(partition.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const removePartition = (partitions, id) => {
    return partitions.filter((partition) => {
      if (partition.id === id) return false;
      if (partition.children.length > 0) {
        partition.children = removePartition(partition.children, id);
      }
      return true;
    });
  };

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const renderPartitions = (partitions) => {
    return partitions.map((partition) => (
      <Partition
        key={partition.id}
        id={partition.id}
        color={partition.color}
        direction={partition.direction}
        width={partition.width}
        height={partition.height}
        onSplit={handleSplit}
        onRemove={handleRemove}
      >
        {partition.children.length > 0 && renderPartitions(partition.children)}
      </Partition>
    ));
  };

  return <div className="p-4 w-[80vw] h-[80vh] border">{renderPartitions(partitions)}</div>;
};

export default LayoutBuilder;

