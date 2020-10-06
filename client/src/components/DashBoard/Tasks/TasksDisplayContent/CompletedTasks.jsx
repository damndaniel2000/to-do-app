import React, { useContext } from "react";
import { TasksContext } from "../context";

const Demo = (props) => {
  const task = useContext(TasksContext);
  return (
    <>
      <div
        className="task-list-item-container"
        style={{ color: "green" }}
        key={props.subIndex}
      >
        <button
          style={{
            color: "green",
            border: "solid 1px green",
            backgroundColor: "#fff",
          }}
          onClick={() => task.taskCompleted(props.index, props.subIndex)}
        >
          <i className="fa fa-check" />
        </button>
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
    </>
  );
};

export default Demo;
