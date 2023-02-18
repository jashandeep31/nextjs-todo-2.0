import React, { useEffect, useState } from "react";
import axiosInstance, { baseURL } from "axiosInstance";
import AuthContext from "./AuthContext";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthState = (props) => {
    const [userCheckingStatus, setuserCheckingStatus] = useState("checking");
    const [tokenCookies, settokenCookies] = useCookies(["token"]);
    const [userData, setuserData] = useState();
    useEffect(() => {
        return () => {
            if (tokenCookies.token) {
                setuserCheckingStatus("verifying");
                axiosInstance
                    .post("/users/verify")
                    .then((res) => {
                        setuserCheckingStatus("authenticated");
                        setuserData(res.data.data.user);
                    })
                    .catch((err) => {
                        setuserCheckingStatus("notauthenticated");
                    });
            } else {
                setuserCheckingStatus("notauthenticated");
            }
        };
    }, []);

    if (userCheckingStatus === "authenticated") {
    }

    return (
        <AuthContext.Provider value={{ userCheckingStatus }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
