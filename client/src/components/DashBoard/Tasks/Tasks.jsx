import React, { useState, useEffect } from "react";

import "./Tasks.css";
import "./TaskModals/Modals.css";
import { TasksContext } from "./context";

import AddTaskListForm from "./TaskModals/AddTaskListModal";
import EditTaskListForm from "./TaskModals/EditTaskListModal";
import AddTaskForm from "./TaskModals/AddTaskModal";
import EditTaskForm from "./TaskModals/EditTaskModal";

import TaskList from "./TasksDisplayContent/TasksList";

const Tasks = () => {
  //adding dummy data for display reasons
  const [tasks, setTasks] = useState([
    {
      taskTitle: "My Tasks",
      taskList: [
        {
          taskName: "Campus Build",
          taskDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada proin libero nunc consequat interdum. Nisi est sit amet facilisis.",
          taskCompleted: false,
        },
      ],
    },
  ]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState();

  const [taskListAddForm, showTaskListAddForm] = useState(false);
  const [taskListEditForm, showTaskListEditForm] = useState(false);
  const [taskAddForm, showTaskAddForm] = useState(false);
  const [taskEditForm, showTaskEditForm] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState();
  const [currentTaskSubIndex, setCurrentTaskSubIndex] = useState();

  useEffect(() => {
    //finding out if current user has past saved data
    const users = JSON.parse(localStorage.getItem("user-details"));
    const currentLoggedUser = JSON.parse(localStorage.getItem("current-user"));
    const currentUser = users.filter(
      (item) => item.emailID === currentLoggedUser.emailID
    );

    if (currentUser[0].tasks[0] !== undefined) setTasks(currentUser[0].tasks);
  }, []);

  const addTaskList = () => {
    if (taskTitle !== "") {
      setTasks((prev) => [
        ...prev,
        {
          taskTitle: taskTitle,
          taskList: [],
          taskCompleted: false,
        },
      ]);
      showTaskListAddForm(false);
      setTaskTitle("");
    }
  };
  const editTaskList = (index) => {
    const taskLists = [...tasks];
    const taskList = taskLists[index];
    taskList.taskTitle = taskTitle;
    taskLists[index] = taskList;
    setTasks(taskLists);
    showTaskListEditForm(false);
  };
  const deleteTaskList = (index) => {
    const taskLists = [...tasks];
    taskLists.splice(index, 1);
    setTasks(taskLists);
    setTaskTitle("");
    showTaskListEditForm(false);
  };

  const addTask = (index) => {
    if (taskName !== "") {
      const tasksList = [...tasks];
      const task = tasksList[index];
      task.taskList.push({
        taskName: taskName,
        taskDescription: taskDescription,
        taskDate: taskDate,
        taskCompleted: false,
      });
      tasksList[index] = task;
      setTasks(tasksList);
      showTaskAddForm(false);
      setTaskName("");
      setTaskDescription("");
      setTaskDate("");
    }
  };

  const editTask = (index, subIndex) => {
    const tasksList = [...tasks];
    const task = tasksList[index];
    const subTask = task.taskList[subIndex];
    subTask.taskName = taskName;
    subTask.taskDescription = taskDescription;
    subTask.taskDate = taskDate;
    task.taskList[subIndex] = subTask;
    tasksList[index] = task;
    setTasks(tasksList);
    setTaskName("");
    setTaskDescription("");
    setTaskDate("");
    showTaskEditForm(false);
  };

  const deleteTask = (index, subIndex) => {
    const tasksList = [...tasks];
    const task = tasksList[index];
    task.taskList.splice(subIndex, 1);
    setTasks(tasksList);
    showTaskEditForm(false);
    setTaskName("");
    setTaskDescription("");
    setTaskDate("");
  };

  const taskCompleted = (index, subIndex) => {
    const tasksList = [...tasks];
    const task = tasksList[index];
    const subTask = task.taskList[subIndex];
    subTask.taskCompleted = !subTask.taskCompleted;
    task.taskList[subIndex] = subTask;
    tasksList[index] = task;
    setTasks(tasksList);
  };

  const saveData = () => {
    //saving tasks state in localStorage inside user's credentials object
    const users = JSON.parse(localStorage.getItem("user-details"));
    const currentLoggedUser = JSON.parse(localStorage.getItem("current-user"));
    const currentUser = users.filter(
      (item) => item.emailID === currentLoggedUser.emailID
    );
    currentUser[0].tasks = [...tasks];
    const newUsers = users.filter(
      (item) => item.emailID !== currentLoggedUser.emailID
    );
    newUsers.push(currentUser[0]);
    localStorage.setItem("user-details", JSON.stringify(newUsers));
    alert("Data successfully saved");
  };

  return (
    <>
      {/*Context to all the child components*/}
      <TasksContext.Provider
        value={{
          taskName,
          taskDescription,
          taskDate,
          taskTitle,

          setTaskName,
          setTaskDescription,
          setTaskDate,
          setTaskTitle,

          currentTaskIndex,
          currentTaskSubIndex,
          setCurrentTaskIndex,
          setCurrentTaskSubIndex,

          addTaskList,
          editTaskList,
          deleteTaskList,

          addTask,
          editTask,
          deleteTask,

          showTaskEditForm,
          showTaskAddForm,
          showTaskListAddForm,
          showTaskListEditForm,

          taskCompleted,
        }}
      >
        <div className="task-main-container">
          {tasks.map((item, index) => {
            const completedTasks = item.taskList.filter(
              (item) => item.taskCompleted === true
            );
            return (
              <TaskList
                item={item}
                index={index}
                completedTasks={completedTasks}
                key={index}
              />
            );
          })}
        </div>
        {/*Form Modals*/}
        {taskAddForm && <AddTaskForm />}
        {taskEditForm && <EditTaskForm />}
        {taskListAddForm && <AddTaskListForm />}
        {taskListEditForm && <EditTaskListForm />}
        <div className="task-sticky-buttons-container">
          <button>
            <i
              className="fa fa-plus"
              onClick={() => showTaskListAddForm(true)}
            />
          </button>
          <button>
            <i className="fa fa-save" onClick={saveData} />
          </button>
        </div>
      </TasksContext.Provider>
    </>
  );
};

export default Tasks;
