import { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import '../assets/css/viewtask.css'
import { Link } from 'react-router-dom';

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState('')
  // Fetch tasks from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('Task')) || [];
    setTasks(storedData);
  }, []);

  const PORT = 'https://bizdateuptask-1.onrender.com';

  // handles search
  const searchHandler = (e) => {
    setSearchInput(e.target.value.toLowerCase())
  }

  const filteredTasks = tasks.filter(data =>
    data.task.toLowerCase().includes(searchInput)
  );

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
      await axios.delete(`${PORT}/deleteTasks`, { data: updatedTasks }); // Notify the server
      setTasks(updatedTasks);
      localStorage.setItem('Task', JSON.stringify(updatedTasks)); // Update localStorage
      toast.success('Task Deleted Successfully');
    } catch (e) {
      toast.error('Something Went Wrong');
      console.log(e);
    }
  };

  return (
    <div className="mt-5 container">
      {tasks?.length === 0 ? (
        <p className="no-task-title">
          No task available. <Link to="/add-task">Add</Link> some task!
        </p>
      ) : (
        <>
          <p className="main-title">Tasks</p>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search Here..." onChange={searchHandler} />
            <span className="input-group-text" id="basic-addon2"><span className="material-symbols-outlined">
              search
            </span></span>
          </div>
          <div className='mt-4'>
            {filteredTasks.length > 0 ? filteredTasks.map((data, ind) => (
              <div key={ind} className="d-flex align-items-center mb-2 tasks-list">
                <input
                  type="checkbox"
                  className="me-3"
                  checked={data?.done}
                  onChange={() => taskDoneHandler(ind)}
                />
                <p style={{ textDecoration: data?.done ? 'line-through' : 'none', margin: 0 }}>
                  {data?.task}
                </p>
                <button className="btn ms-auto p-0 delete-btn" onClick={() => deleteHandler(ind)}>
                  Delete
                </button>
              </div>
            )) : <h6>No data found</h6>}</div>
        </>
      )}
      <Toaster
        toastOptions={{
          duration: 1200,
        }}
        containerStyle={{
          top: 50,
        }}
      />
    </div>

  )
}

export default ViewTask