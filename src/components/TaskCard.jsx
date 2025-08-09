import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteTask } from '../services/tasks';
import { useState } from 'react';

const TaskCard = ({ task, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = () => {
    return task.status === 'Completed'
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800';
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      setDeleting(true);
      await deleteTask(task._id);
      if (onDelete) onDelete(task._id); // 🔁 Remove the card from parent state
    } catch (err) {
      console.error('Failed to delete task:', err);
      alert('Failed to delete task');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-5 mb-4 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
      title={`Task: ${task.title}`}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <div className="flex space-x-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor()} select-none`}
          >
            {task.priority}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor()} select-none`}
          >
            {task.status}
          </span>
        </div>
      </div>

      <p className="text-gray-600 mt-3 line-clamp-3">{task.description}</p>

      <div className="mt-5 flex justify-between items-center text-sm text-gray-500">
        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        <div className="flex items-center gap-3">
          <Link
            to={`/edit-task/${task._id}`}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            aria-label={`Edit task ${task.title}`}
            onClick={(e) => e.stopPropagation()}
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
            aria-label={`Delete task ${task.title}`}
            disabled={deleting}
          >
            <TrashIcon className="h-4 w-4 mr-1" />
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
