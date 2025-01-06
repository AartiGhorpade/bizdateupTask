import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import '../assets/css/addtask.css'
import axios from 'axios'
const AddTask = () => {

  const [inputData, setInputData] = useState('');

  const PORT = 'http://localhost:4001';


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
      toast.success('Task Added Successfully');
      setInputData(''); // Clear input field
    } catch (e) {
      console.log('Error adding task:', e);
      toast.error('Something Went Wrong');
    }
  };

  return (
    <section className='main-section pt-5'>
      <div className="container">
        <div className="card pt-5">
          <label>Task Name</label>
          <input
            type="text"
            placeholder="Enter Task Here..."
            className="form-control"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)} // Update inputData state
          />
          <div className="mt-4">
            <button className="btn add-btn" onClick={submitHandler}>
              Add Task
            </button>
          </div>
        </div>
      </div>
      <Toaster toastOptions={{
        duration: 1200,
      }} containerStyle={{
        top: 50,
      }} />

    </section>
  )
}

export default AddTask