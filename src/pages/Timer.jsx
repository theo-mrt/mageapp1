import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction, getTimer, updateTimer } from 'wasp/client/operations';

const TimerPage = () => {
  const { timerId } = useParams();
  const { data: timer, isLoading, error } = useQuery(getTimer, { id: parseInt(timerId) });
  const updateTimerFn = useAction(updateTimer);
  const [newName, setNewName] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateTimer = () => {
    updateTimerFn({
      id: parseInt(timerId),
      name: newName,
      endTime: timer.endTime,
      design: timer.design
    });
    setNewName('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{timer.name}</h1>
      <p className='mb-2'>End Time: {timer.endTime}</p>
      <p className='mb-4'>Design: {timer.design}</p>
      <input
        type='text'
        placeholder='New Name'
        className='px-1 py-2 border rounded text-lg'
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button
        onClick={handleUpdateTimer}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded mt-2'
      >
        Update Timer
      </button>
      <Link to={`/create`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>Create Timer</Link>
    </div>
  );
}

export default TimerPage;