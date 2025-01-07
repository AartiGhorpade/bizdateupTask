import express from 'express'
import cors from 'cors'
const app = express()
import dotenv from 'dotenv'
dotenv.config()


app.use(cors())
app.use(express.json()) // Parse JSON request bodies

let tasks = [] // Because of no db used array used here
const PORT = process.env.PORT || 3002;

// Root route to check if the server is working
app.get('/', (req, resp) => {
    resp.send('working')
})

// to store a new task
app.post('/storeTask', async (req, resp) => {
    try {
        tasks.push(req.body)
        resp.status(201).send({ message: 'Task Added Successfully', tasks }) // Send success response
    } catch (e) {
        resp.status(500).send({ message: 'Failed to add tasks' });
    }
})

// to see all the tasks at backend only
app.get('/storedTasks', async (req, resp) => {
    try {
        resp.send(tasks)
    } catch (e) {
        resp.status(500).send({ message: 'Failed to add tasks' });
    }
})

//  to update the tasks 
app.post('/updateTasks', async (req, resp) => {
    try {
        tasks = req.body;
        resp.status(200).send({ message: 'Task updated successfully', tasks });
    } catch (e) {
        resp.status(500).send({ message: 'Failed to update tasks' });
    }
});

//  to delete a specific task
app.delete('/deleteTasks', async (req, resp) => {
    try {
        const { taskIndex } = req.body;
        tasks.splice(taskIndex, 1); // Remove the task from the tasks array
        resp.status(200).send({ message: 'Task deleted successfully', tasks });
    } catch (e) {
        resp.status(500).send({ message: 'Failed to delete task' });
    }
});

// Start the server 
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})
