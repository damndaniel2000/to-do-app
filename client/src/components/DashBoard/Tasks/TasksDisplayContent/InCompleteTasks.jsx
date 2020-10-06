import React, { useContext } from "react";
import { TasksContext } from "../context";

const Tasks = (props) => {
  const task = useContext(TasksContext);
  return (
    <div className="task-list-item-container" key={props.subIndex}>
      <button
        onClick={() => task.taskCompleted(props.index, props.subIndex)}
      ></button>
      <div className="task-name">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div> {props.item.taskName} </div>
          <i
            className="fa fa-pencil"
            onClick={() => {
              task.setCurrentTaskIndex(props.index);
              task.setCurrentTaskSubIndex(props.subIndex);
              task.showTaskEditForm(true);
              task.setTaskName(props.item.taskName);
              task.setTaskDescription(props.item.taskDescription);
              task.setTaskDate(props.item.taskDate);
            }}
          />
        </div>
        <div className="task-description">{props.item.taskDescription}</div>
        {props.item.taskDate !== undefined && (
          <div className="task-date">{props.item.taskDate}</div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
