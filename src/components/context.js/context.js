import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { frontend_url } from "../pages/front";
import { set } from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [isProfile, setIsProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const response = await axios.get(`${frontend_url}/userroutes/getmyprofile`, {
                    withCredentials: true,
                });

                if (response.data?.user) {
                    setProfile(response.data);
                    setIsProfile(true);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError(error);
                setProfile(null);
                setIsProfile(false);
            } finally {
                setLoading(false);
            }
        };

        fetchMyProfile();
    }, []);

    const [allProfiles, setAllProfiles] = useState([]);
    const [usercheckindata, setusercheckindata] = useState([]);
    const [loadingAllProfiles, setLoadingAllProfiles] = useState(true);
    const [errorAllProfiles, setErrorAllProfiles] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await axios.get(`${frontend_url}/userroutes/getallprofiles`, {
                    withCredentials: true,
                });

                if (response.data) {
                    setAllProfiles(response.data.allusers);
                    setusercheckindata(response.data.isUSerCheckin);
                } else {
                    setAllProfiles([]);
                }
            } catch (error) {
                console.error('Error fetching profiles:', error);
                setErrorAllProfiles(error);
            } finally {
                setLoadingAllProfiles(false);
            }
        };

        fetchProfiles();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                profile,
                loading,
                error,
                isProfile,
                allProfiles,
                loadingAllProfiles,
                errorAllProfiles,
                usercheckindata
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
