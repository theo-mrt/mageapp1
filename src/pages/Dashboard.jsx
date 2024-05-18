import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getTimers, deleteTimer } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: timers, isLoading, error } = useQuery(getTimers);
  const deleteTimerFn = useAction(deleteTimer);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {timers.map((timer) => (
        <div
          key={timer.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{timer.name}</div>
          <div>{timer.endTime}</div>
          <div>
            <button
              onClick={() => deleteTimerFn({ timerId: timer.id })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
            <Link
              to={`/timer/${timer.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;