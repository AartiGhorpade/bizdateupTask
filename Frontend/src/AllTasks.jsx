const AllTasks = ({ tasks, taskDoneHandler, deleteHandler }) => {
    return (
        <div className="mt-4">
            {tasks?.length === 0 ? (
                <h4>No task available. Add some task!</h4>
            ) : (
                tasks?.map((data, ind) => (
                    <div key={ind} className="d-flex align-items-center mb-2 tasks-list ">
                        <input
                            type="checkbox"
                            className="me-2"
                            checked={data?.done}
                            onChange={() => taskDoneHandler(ind)}
                        />
                        <p style={{ textDecoration: data?.done ? 'line-through' : 'none', margin: 0 }}>
                            {data?.task}
                        </p>

                        <button className="btn ms-auto p-0 delete-btn" onClick={() => deleteHandler(ind)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default AllTasks;
