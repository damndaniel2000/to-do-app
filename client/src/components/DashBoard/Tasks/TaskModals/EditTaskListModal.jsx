import React, { useState, useContext } from "react";
import { TasksContext } from "../context";

const EditTaskListForm = () => {
  const task = useContext(TasksContext);
  const [error, setError] = useState("");
  return (
    <div className="background-blur">
      <div className="task-form-modal">
        <div className="task-form-edit-header">
          <i
            className="fa fa-trash"
            onClick={() => task.deleteTaskList(task.currentTaskIndex)}
          />
          <i
            className="fa fa-close"
            onClick={() => {
              task.showTaskListEditForm(false);
              task.setTaskTitle("");
            }}
          />
        </div>
        <input
          value={task.taskTitle}
          placeholder="New Task List Name"
          onChange={(e) => task.setTaskTitle(e.target.value)}
        />
        <p className="task-errors">{error}</p>
        <button
          onClick={() => {
            console.log();
            if (task.taskTitle !== "") task.editTaskList(task.currentTaskIndex);
            else setError("This field cannot be empty");
          }}
        >
          Make Changes
        </button>
      </div>
    </div>
  );
};

export default EditTaskListForm;
