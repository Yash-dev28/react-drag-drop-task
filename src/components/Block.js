// src/components/Block.js
import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';
import '../styles.css';

const Block = ({ title, tasks, onDropTask, style }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => onDropTask(item, title),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const blockClass = title.toLowerCase().replace(' ', '-') + " block";

  return (
    <div
      ref={drop}
      className={`${blockClass} ${isOver ? 'block-over' : ''}`}
      style={style}
    >
      <h3>{title}</h3>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Block;
