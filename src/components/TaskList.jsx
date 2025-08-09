import { useEffect, useState, useMemo } from 'react';
import { getTasks } from '../services/tasks';
import TaskCard from './TaskCard';
import { toast } from 'react-toastify';

const TaskList = ({ searchTerm, statusFilter, priorityFilter, sortOption }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data.tasks || []);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Delete handler passed to TaskCard
  const handleDelete = (deletedTaskId) => {
    setTasks((prevTasks) => prevTasks.filter(task => task._id !== deletedTaskId));
    toast.success('Task deleted successfully');
  };

  // Filter + sort tasks (memoized for performance)
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter(task => task.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter) {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }

    // Sorting
    if (sortOption) {
      if (sortOption === 'dueDate') {
        filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      } else if (sortOption === 'priority') {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      }
    }

    return filtered;
  }, [tasks, searchTerm, statusFilter, priorityFilter, sortOption]);

  if (loading) return <div className="text-gray-600">Loading tasks...</div>;
  if (filteredTasks.length === 0) return <div className="text-gray-500">No tasks found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTasks.map(task => (
        <TaskCard key={task._id} task={task} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TaskList;
