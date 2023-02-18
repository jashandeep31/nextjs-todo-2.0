import Navbar from "@/components/Navbar";
import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "@/context/AuthContext";
import axiosInstance from "axiosInstance";
const Home = () => {
    const AuthContextData = useContext(AuthContext);
    const [Tasks, setTasks] = useState([]);
    const fetchTasks = async () => {
        const res = await axiosInstance.get("/tasks");
        setTasks(res.data.data.tasks);
    };
    const NewTaskRef = useRef();

    const handleAddTask = async (e) => {
        e.preventDefault();
        const res = await axiosInstance.post("/tasks", {
            title: NewTaskRef.current.value,
            description: "description",
        });
        NewTaskRef.current.value = "";
        setTasks([res.data.data.task, ...Tasks]);
    };

    useEffect(() => {
        if (AuthContextData.userCheckingStatus === "authenticated") {
            fetchTasks();
        }
    }, [AuthContextData.userCheckingStatus]);

    if (AuthContextData.userCheckingStatus === "checking") {
        return <h1>Check user status</h1>;
    }
    if (AuthContextData.userCheckingStatus === "verifying") {
        return <h1>verfying the token</h1>;
    }
    if (AuthContextData.userCheckingStatus === "notauthenticated") {
        return <h1>not authenticated</h1>;
    }
    if (AuthContextData.userCheckingStatus === "authenticated") {
        const TaskRender = () =>
            Tasks.map((task, index) => {
                return (
                    <div className="task" key={index}>
                        <div className="box">
                            {task.completed ? (
                                <i
                                    className="bx bxs-check-square"
                                    onClick={(e) => {
                                        axiosInstance
                                            .patch(`/tasks/${task._id}`, {
                                                completed: false,
                                            })
                                            .then((res) => {
                                                fetchTasks();
                                            });
                                    }}
                                ></i>
                            ) : (
                                <i
                                    className="bx bx-checkbox"
                                    onClick={(e) => {
                                        axiosInstance
                                            .patch(`/tasks/${task._id}`, {
                                                completed: true,
                                            })
                                            .then((res) => {
                                                fetchTasks();
                                            });
                                    }}
                                ></i>
                            )}
                        </div>
                        <p
                            className={`${
                                task.completed
                                    ? "text-decoration-line-through"
                                    : ""
                            }`}
                        >
                            {task.title}{" "}
                        </p>
                        <div className="delete">
                            <i
                                className="bx bx-trash"
                                onClick={() => {
                                    axiosInstance
                                        .delete(`/tasks/${task._id}`)
                                        .then((res) => {
                                            fetchTasks();
                                        });
                                }}
                            ></i>
                        </div>
                    </div>
                );
            });
        return (
            <section id="Home">
                <Navbar />
                <div className="main-container">
                    <div className="container">
                        <h2 className="title">Tasks</h2>
                        <p className="tagline">
                            Focus on being productive instead of busy.
                        </p>
                        <div className="tasks">
                            <TaskRender />
                        </div>
                        <form
                            onSubmit={(e) => {
                                handleAddTask(e);
                            }}
                        >
                            <div className="d-flex justify-content-center">
                                <h3>Add Task</h3>
                            </div>
                            <input
                                type="text"
                                placeholder="Add a task"
                                ref={NewTaskRef}
                            />
                        </form>
                    </div>
                </div>
            </section>
        );
    }
};

export default Home;
