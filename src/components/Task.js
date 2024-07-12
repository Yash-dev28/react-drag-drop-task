// src/components/Task.js
import React from 'react';
import { useDrag } from 'react-dnd';
import '../styles.css';

const Task = ({ task, onDragStart }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, content: task.content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  
  return (
    <div
      ref={drag}
      className="task"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {task.content}
    </div>
  );
};

export default Task;
