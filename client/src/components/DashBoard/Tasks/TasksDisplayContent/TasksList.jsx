import React, { useContext } from "react";
import { TasksContext } from "../context";

import CompletedTasks from "./CompletedTasks";
import InCompleteTasks from "./InCompleteTasks";

const TaskList = (props) => {
  const task = useContext(TasksContext);
  return (
    <div key={props.index}>
      <div className="task-container">
        <div className="task-title-container">
          <p className="task-title">{props.item.taskTitle}</p>
          <i
            className="fa fa-navicon"
            onClick={() => {
              task.showTaskListEditForm(true);
              task.setCurrentTaskIndex(props.index);
              task.setTaskTitle(props.item.taskTitle);
            }}
          />
        </div>
        <div className="task-list-container">
          <div className="task-add-container">
            <button
              className="task-add-button"
              onClick={() => {
                task.showTaskAddForm(true);
                task.setCurrentTaskIndex(props.index);
              }}
            >
              <i className="fa fa-plus" />
            </button>
            <div style={{ color: "blue" }}>
              <b>Add a task</b>
            </div>
          </div>
        </div>
        {props.item.taskList !== undefined &&
          props.item.taskList.map((item, subIndex) => {
            if (!item.taskCompleted)
              return (
                <InCompleteTasks
                  item={item}
                  index={props.index}
                  subIndex={subIndex}
                  key={subIndex}
                />
              );
            else return null;
          })}
        {props.completedTasks.length !== 0 && (
          <>
            <div className="task-completed-header">
              Completed ({props.completedTasks.length})
            </div>
            {props.item.taskList !== undefined &&
              props.item.taskList.map((item, subIndex) => {
                if (item.taskCompleted)
                  return (
                    <CompletedTasks
                      index={props.index}
                      subIndex={subIndex}
                      item={item}
                      key={subIndex}
                    />
                  );
                else return null;
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;
