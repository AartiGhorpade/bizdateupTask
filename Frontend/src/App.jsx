import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import AllTasks from './AllTasks';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [inputData, setInputData] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(false);

  const PORT = 'http://localhost:4001';

  // Fetch tasks from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('Task')) || [];
    setTasks(storedData);
  }, []);

  // Handles adding a new task and saving it to the backend
  const submitHandler = async () => {
    if (!inputData.trim()) {
      toast.error('Please Enter The Task'); 
      return;
    };

    const newTask = { task: inputData, done: false };
    try {
      const res = await axios.post(`${PORT}/storeTask`, newTask); // Send new task to server
      const respData = res?.data?.tasks;
      localStorage.setItem('Task', JSON.stringify(respData)); // Update localStorage with new tasks
      setTasks(respData);
      toast.success('Task Added Successfully');
      setInputData(''); // Clear input field
    } catch (e) {
      console.log('Error adding task:', e);
      toast.error('Something Went Wrong');
    }
  };

  // Handles toggling the completion status of a task
  const taskDoneHandler = async (ind) => {
    const updatedTasks = tasks.map((task, id) =>
      id === ind ? { ...task, done: !task.done } : task // Update task's 'done' status
    );

    try {
      await axios.post(`${PORT}/updateTasks`, updatedTasks); // Update tasks on server
      setTasks(updatedTasks);
      localStorage.setItem('Task', JSON.stringify(updatedTasks)); 
      if (updatedTasks[ind].done) {
        toast.success('Hurreyyy!! You Completed The Task'); // Show success toast
      } else {
        toast.error('Your Task Is Incomplete'); // Show error toast
      }
    } catch (e) {
      console.error('Failed to update task:', e); 
      toast.error('Something Went Wrong');
    }
  };

  // Handles deleting a task by index
  const deleteHandler = async (ind) => {
    const updatedTasks = tasks.filter((_, id) => id !== ind); // Remove task from list

    try {
      await axios.delete(`${PORT}/deleteTasks`, { data: updatedTasks }); 
      setTasks(updatedTasks);
      toast.success('Task Deleted Successfully'); 
    } catch (e) {
      toast.error('Something Went Wrong');
    }
  };

  // Render the main task 
  return (
    <section className="main-section">
      <div className="container">
        <div className="card">
          <input
            type="text"
            placeholder="Enter Task Here..."
            className="form-control"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)} // Update inputData state
          />
          <div className="d-flex justify-content-around mt-4">
            <button className="btn add-btn" onClick={submitHandler}>
              Add Task
            </button>
            <button className="btn add-btn" onClick={() => setShowTasks(!showTasks)}>
              {showTasks ? 'Hide Tasks' : 'View Tasks'} {/* Toggle task visibility */}
            </button>
          </div>
        </div>

        {/* Show all tasks if 'showTasks' is true */}
        {showTasks && <AllTasks tasks={tasks} taskDoneHandler={taskDoneHandler} deleteHandler={deleteHandler} />}
        <Toaster toastOptions={{
          duration: 1000, 
        }} />
      </div>
    </section>
  );
}

export default App;
