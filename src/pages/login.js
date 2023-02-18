import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import axiosInstance from "axiosInstance";
const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [cookies, setCookie] = useCookies(["token"]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        axiosInstance
            .post("users/login", { email, password })
            .then((res) => {
                if (res.data.status === "success") {
                    console.log(res.data);
                    setCookie("token", res.data.token, { path: "/" });
                }
            })
            .catch((err) => {});
    };

    return (
        <div className="loginpage">
            <div className="container">
                <h3>Welcome Back</h3>
                <p>Sign in to your account</p>
                <form method="post" onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-card">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            ref={emailRef}
                            placeholder="your@email.com"
                        />
                    </div>
                    <div className="input-card">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            ref={passwordRef}
                            placeholder="********"
                        />
                    </div>
                    <div className="button">
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </div>
                </form>
                <div className="urls mt-3">
                    <a
                        href="#"
                        className="d-block w-f text-decoration-underline"
                    >
                        Forgot Password?
                    </a>
                    <a
                        href="#"
                        className="d-block w-f text-decoration-underline"
                    >
                        Create an Account
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
