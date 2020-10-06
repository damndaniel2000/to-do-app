import React, { useContext, useState } from "react";
import { TasksContext } from "../context";

const EditTaskForm = () => {
  const task = useContext(TasksContext);
  const [error, setError] = useState("");
  return (
    <div className="background-blur">
      <div className="task-form-modal">
        <div className="task-form-edit-header">
          <i
            className="fa fa-trash"
            onClick={() =>
              task.deleteTask(task.currentTaskIndex, task.currentTaskSubIndex)
            }
          />
          <i
            className="fa fa-close"
            onClick={() => {
              task.showTaskEditForm(false);
              task.setTaskName("");
              task.setTaskDescription("");
              task.setTaskDate("");
            }}
          />
        </div>
        <input
          placeholder="Task"
          value={task.taskName}
          onChange={(e) => task.setTaskName(e.target.value)}
        />
        <p className="task-errors" style={{ marginTop: "2px" }}>
          {error}
        </p>
        <textarea
          placeholder="Add Details"
          rows="6"
          value={task.taskDescription}
          onChange={(e) => task.setTaskDescription(e.target.value)}
        />
        <input
          type="date"
          value={task.taskDate}
          onChange={(e) => task.setTaskDate(e.target.value)}
        />
        <button
          onClick={() => {
            if (task.taskName !== "")
              task.editTask(task.currentTaskIndex, task.currentTaskSubIndex);
            else setError("This field cannot be empty");
          }}
        >
          Make Changes
        </button>
      </div>
    </div>
  );
};

export default EditTaskForm;
