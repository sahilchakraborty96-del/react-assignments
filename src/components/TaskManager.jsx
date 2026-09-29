import { useState, useEffect } from 'react';

const initialTasks = [
  {
    id: 1,
    title: 'Complete React Internal Assessment',
    category: 'Academic',
    priority: 'High',
    dueDate: '2026-10-05',
    completed: false
  },
  {
    id: 2,
    title: 'Update GitHub repository README',
    category: 'Academic',
    priority: 'Medium',
    dueDate: '2026-10-06',
    completed: true
  },
  {
    id: 3,
    title: 'Organize project design assets',
    category: 'Personal',
    priority: 'Low',
    dueDate: '2026-10-08',
    completed: false
  }
];

export default function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('react_assignment_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('react_assignment_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      category,
      priority,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      completed: false
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
    setDueDate('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = (id) => {
    if (!editTitle.trim()) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, title: editTitle.trim() } : t));
    setEditingId(null);
  };

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    const statusMatch = 
      filterStatus === 'All' ? true :
      filterStatus === 'Active' ? !task.completed : task.completed;
    const priorityMatch = 
      filterPriority === 'All' ? true : task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="assignment-container">
      {/* Overview & Progress */}
      <div className="task-overview-card">
        <div className="progress-info">
          <div>
            <h3>Task Completion Status</h3>
            <p>{completedCount} of {tasks.length} tasks completed</p>
          </div>
          <span className="percent-badge">{progressPercent}%</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      {/* Task Creation Form */}
      <form onSubmit={handleAddTask} className="task-form">
        <h3>Create New Task</h3>
        <div className="task-form-inputs">
          <input
            type="text"
            placeholder="Task description..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="task-input-title"
            required
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Academic">Academic</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button type="submit" className="btn">Add Task</button>
        </div>
      </form>

      {/* Filter and Control Bar */}
      <div className="task-filter-bar">
        <div className="filter-group">
          <span>Status:</span>
          {['All', 'Active', 'Completed'].map(status => (
            <button
              key={status}
              type="button"
              className={`filter-chip ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span>Priority:</span>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Task Items List */}
      <div className="task-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
                className="task-checkbox"
              />

              <div className="task-main-info">
                {editingId === task.id ? (
                  <div className="edit-inline-wrap">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="edit-inline-input"
                    />
                    <button onClick={() => saveEdit(task.id)} className="btn-table edit">Save</button>
                  </div>
                ) : (
                  <span className="task-name">{task.title}</span>
                )}

                <div className="task-meta">
                  <span className="task-tag category">{task.category}</span>
                  <span className={`task-tag priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                  <span className="task-tag date">📅 {task.dueDate}</span>
                </div>
              </div>

              <div className="task-actions">
                {editingId !== task.id && (
                  <button onClick={() => startEdit(task)} className="btn-table edit">Edit</button>
                )}
                <button onClick={() => deleteTask(task.id)} className="btn-table delete">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-tasks">No tasks matching your selected filters.</div>
        )}
      </div>
    </div>
  );
}