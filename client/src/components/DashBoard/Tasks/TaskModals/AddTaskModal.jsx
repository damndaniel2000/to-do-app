import React, { useState, useContext } from "react";
import { TasksContext } from "../context";

const AddTaskForm = () => {
  const task = useContext(TasksContext);
  const [error, setError] = useState("");
  return (
    <div className="background-blur">
      <div className="task-form-modal">
        <div className="task-form-close-header">
          <i
            className="fa fa-close"
            onClick={() => {
              task.showTaskAddForm(false);
              task.setTaskName("");
              task.setTaskDescription("");
              task.setTaskDate();
            }}
          />
        </div>

        <input
          value={task.taskName}
          placeholder="Task"
          onChange={(e) => task.setTaskName(e.target.value)}
        />
        <p className="task-errors" style={{ marginTop: "2px" }}>
          {error}
        </p>
        <textarea
          rows="6"
          value={task.taskDescription}
          placeholder="Task Details"
          onChange={(e) => task.setTaskDescription(e.target.value)}
        />
        <input
          type="date"
          value={task.taskDate}
          onChange={(e) => task.setTaskDate(e.target.value)}
        />
        <button
          onClick={() => {
            if (task.taskName !== "") task.addTask(task.currentTaskIndex);
            else setError("This field cannot be empty");
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;
