import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [profile, setProfile] = useState(null); // Holds the logged-in user's profile
    const [loading, setLoading] = useState(true); // Indicates if profile is being fetched
    const [error, setError] = useState(null); // Error handling for profile fetch
    const [isProfile, setIsProfile] = useState(false); // Tracks if a valid profile exists

 
    useEffect(() => {
        const fetchMyProfile = async () => {
            try {
                const response = await axios.get('http://localhost:4000/userroutes/getmyprofile', {
                    withCredentials: true,
                });
                

                // console.log("single user profile ",response.data)
                if (response.data?.user) {
                    setProfile(response.data);
                    setIsProfile(true); // Profile exists
                } else {
                    setProfile(null);
                    setIsProfile(false); // No profile
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError(error);
                setProfile(null);
                setIsProfile(false); // Treat as logged-out
            } finally {
                setLoading(false); // Loading complete
            }
        };

        fetchMyProfile();
    }, []);

    // Fetch all user profiles
    const [allProfiles, setAllProfiles] = useState([]); // Holds all user profiles
    const [loadingAllProfiles, setLoadingAllProfiles] = useState(true); // Indicates if all profiles are being fetched
    const [errorAllProfiles, setErrorAllProfiles] = useState(null); // Error handling for fetching all profiles

    useEffect(() => {
        const fetchProfiles = async () => {
            console.log(allProfiles)
            try {
                const response = await axios.get('http://localhost:4000/userroutes/getallprofiles', {
                    withCredentials: true,
                });

                if (response.data?.allusers) {
                    // console.log
                    setAllProfiles(response.data.allusers);
                } else {
                    setAllProfiles([]);
                }
            } catch (error) {
                console.error('Error fetching profiles:', error);
                setErrorAllProfiles(error);
            } finally {
                setLoadingAllProfiles(false); // Loading complete
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
