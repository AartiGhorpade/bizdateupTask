import express from 'express'
import cors from 'cors'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
app.use(cors())
app.use(express.json())

let tasks = []
const PORT = process.env.PORT || 3002;
app.get('/', (req, resp) => {
    resp.send('working')
})

app.post('/storeTask', async (req, resp) => {
    try {
        tasks.push(req.body)
        resp.status(201).send({ message: 'Task Added Successfully', tasks })
    } catch (e) {
        resp.status(500).send({ message: 'Failed to add tasks' });
    }
})
app.post('/updateTasks', async (req, resp) => {
    try {
        tasks = req.body;
        resp.status(200).send({ message: 'Task updated successfully', tasks });
    } catch (e) {
        resp.status(500).send({ message: 'Failed to update tasks' });
    }
});

app.delete('/deleteTasks', async (req, resp) => {
    try {
        const { taskIndex } = req.body;
        tasks.splice(taskIndex, 1);
        resp.status(200).send({ message: 'Task deleted successfully', tasks });
    } catch (e) {
        resp.status(500).send({ message: 'Failed to delete task' });
    }
});



app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
})