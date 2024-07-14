// src/App.js
import React, { useState } from 'react';
import DnDContext from './DnDContext';
import Block from './components/Block';
import useAutoScroll from './hooks/useAutoScroll';

import './styles.css';

const initialTasks =[
  { id: 1, content: 'Task 1' },
  { id: 2, content: 'Task 2' },
  { id: 3, content: 'Task 3' },
  { id: 4, content: 'Task 4' },
  { id: 5, content: 'Task 5' },
  { id: 6, content: 'Task 6' },
  { id: 7, content: 'Task 7' },
  { id: 8, content: 'Task 8' },
  { id: 9, content: 'Task 9' },
  { id: 10, content: 'Task 10' },
];


const App = () => {
  const [tasks, setTasks] = useState({
    Today: [],
    Tomorrow: [],
    'This Week': [],
    'Next Week': [],
    Unplanned: initialTasks,
  });

  useAutoScroll();

  const onDropTask = (item, targetBlock) => {
    const { id, content } = item;
    
    // Remove task from the source block
    const updatedSourceTasks = Object.keys(tasks).reduce((acc, key) => {
      if (key !== 'Unplanned') {
        const filteredTasks = tasks[key].filter(task => task.id !== id);
        acc[key] = filteredTasks;
      }
      return acc;
    }, {});

    // Add task to the target block
    setTasks(prevTasks => ({
      ...updatedSourceTasks,
      [targetBlock]: [...prevTasks[targetBlock], { id, content }],
      Unplanned: targetBlock === 'Unplanned' ? [...prevTasks.Unplanned, { id, content }] : prevTasks.Unplanned.filter(task => task.id !== id)
    }));
  };
  
  return (
    <DnDContext>
      <div className="container">
        <Block title="Today" tasks={tasks.Today} onDropTask={onDropTask} />
        <Block title="Tomorrow" tasks={tasks.Tomorrow} onDropTask={onDropTask} />
        <Block title="This Week" tasks={tasks['This Week']} onDropTask={onDropTask} />
        <Block title="Next Week" tasks={tasks['Next Week']} onDropTask={onDropTask} />
        <Block title="Unplanned" tasks={tasks.Unplanned} onDropTask={onDropTask} style={{ gridColumn: 'span 2' }} />
      </div>
    </DnDContext>
  );
};

export default App;