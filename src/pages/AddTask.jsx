import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { createTask } from '../services/tasks';
import { motion } from 'framer-motion';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask({
        title,
        description,
        dueDate,
        priority,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-8 max-w-3xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Task</h1>
        {error && <div className="text-red-500 mb-6 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 mb-2 font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 mb-2 font-medium">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-gray-700 mb-2 font-medium">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-gray-700 mb-2 font-medium">
              Priority
            </label>
            <select
              id="priority"
              className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTask;
