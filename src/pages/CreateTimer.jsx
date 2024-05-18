import React, { useState } from 'react';
import { useAction, createTimer } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const CreateTimerPage = () => {
  const [name, setName] = useState('');
  const [endTime, setEndTime] = useState('');
  const [design, setDesign] = useState('');

  const createTimerFn = useAction(createTimer);

  const handleCreateTimer = () => {
    createTimerFn({ name, endTime, design });
    setName('');
    setEndTime('');
    setDesign('');
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Timer Name'
        className='p-2 border rounded mb-4'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='datetime-local'
        className='p-2 border rounded mb-4'
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <input
        type='text'
        placeholder='Design'
        className='p-2 border rounded mb-4'
        value={design}
        onChange={(e) => setDesign(e.target.value)}
      />
      <button
        onClick={handleCreateTimer}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Timer
      </button>
      <Link to='/' className='block mt-4 text-blue-500 hover:underline'>Go back to Dashboard</Link>
    </div>
  );
}

export default CreateTimerPage;