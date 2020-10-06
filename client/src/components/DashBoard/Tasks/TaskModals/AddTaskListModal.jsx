import React, { useState, useContext } from "react";
import { TasksContext } from "../context";

const AddTaskListForm = () => {
  const task = useContext(TasksContext);
  const [error, setError] = useState("");
  return (
    <div className="background-blur">
      <div className="task-form-modal">
        <div className="task-form-close-header">
          <i
            className="fa fa-close"
            onClick={() => {
              task.showTaskListAddForm(false);
              task.setTaskTitle("");
            }}
          />
        </div>
        <input
          value={task.taskTitle}
          placeholder="Task List Name"
          onChange={(e) => task.setTaskTitle(e.target.value)}
        />
        <p className="task-errors">{error}</p>
        <button
          onClick={() => {
            console.log();
            if (task.taskTitle !== "") task.addTaskList();
            else setError("This field cannot be empty");
          }}
        >
          Add Task List
        </button>
      </div>
    </div>
  );
};

export default AddTaskListForm;
