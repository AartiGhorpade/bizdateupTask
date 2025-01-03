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
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('Task')) || [];
    setTasks(storedData);
  }, []);

  const submitHandler = async () => {
    if (!inputData.trim()) {
      toast.error('Please Enter The Task');
      return;
    };

    const newTask = { task: inputData, done: false };
    try {
      const res = await axios.post(`${PORT}/storeTask`, newTask);
      const respData = res?.data?.tasks;
      localStorage.setItem('Task', JSON.stringify(respData));
      setTasks(respData);
      toast.success('Task Added Successfully');
      setInputData('');
    } catch (e) {
      console.log('Error adding task:', e);
      toast.error('Something Went Wrong');
    }
  };

  const taskDoneHandler = async (ind) => {
    const updatedTasks = tasks.map((task, id) =>
      id === ind ? { ...task, done: !task.done } : task
    );

    try {
      await axios.post(`${PORT}/updateTasks`, updatedTasks);
      setTasks(updatedTasks);
      localStorage.setItem('Task', JSON.stringify(updatedTasks));
      if (updatedTasks[ind].done) {
        toast.success('Hurreyyy!! You Completed The Task');
      } else {
        toast.error('Your Task Is Incomplete');
      }
    } catch (e) {
      console.error('Failed to update task:', e);
      toast.error('Something Went Wrong');
    }
  };

  const deleteHandler = async (ind) => {
    const updatedTasks = tasks.filter((_, id) => id !== ind);

    try {
      await axios.delete(`${PORT}/deleteTasks`, { data: updatedTasks });
      setTasks(updatedTasks);
      toast.success('Task Deleted Successfully');
    } catch (e) {
      toast.error('Something Went Wrong');
    }
  };


  return (
    <section className="main-section">
      <div className="container">
        <div className="card">
          <input
            type="text"
            placeholder="Enter Task Here..."
            className="form-control"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <div className="d-flex justify-content-around mt-4">
            <button className="btn add-btn" onClick={submitHandler}>
              Add Task
            </button>
            <button className="btn add-btn" onClick={() => setShowTasks(!showTasks)}>
              {showTasks ? 'Hide Tasks' : 'View Tasks'}
            </button>
          </div>
        </div>

        {showTasks && <AllTasks tasks={tasks} taskDoneHandler={taskDoneHandler} deleteHandler={deleteHandler} />}
        <Toaster toastOptions={{
          duration: 1000,
        }} />
      </div>
    </section>
  );
}

export default App;
