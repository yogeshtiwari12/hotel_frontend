import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { frontend_url } from "../pages/front";


export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${frontend_url}/userroutes/getmyprofile`, {
            withCredentials: true,
        });
        return response.data || null;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});


export const fetchAllProfiles = createAsyncThunk("auth/fetchAllProfiles", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${frontend_url}/userroutes/getallprofiles`, {
            withCredentials: true,
        });

        return {
            allUsers: response.data?.allusers || [],
            totalUsers: response.data?.totalusers || 0,
            // userCheckInData: response.data?.isUSerCheckin || [],
        };
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});


export const fetchhoteldata = createAsyncThunk("auth/fetchhoteldata", async (_, { rejectWithValue }) => {
    try {
        const [hotelResponse, usersResponse] = await Promise.all([
            axios.get(`${frontend_url}/hotelroutes/hoteldetail`, {
                withCredentials: true,
            }),
            axios.get(`${frontend_url}/userroutes/getallprofiles`, {
                withCredentials: true,
            }),
        ]);

        return {
            hoteldata: hotelResponse.data?.total_price || 0,
            totalBookings: hotelResponse.data?.total_bookings || 0,
            checkedInCount: hotelResponse.data?.checked_in_count || 0,
            total_users: usersResponse.data?.totalusers || 0,
        };
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        profile: null,
        isAuthenticated: false, 
        isProfile: false,
        loading: false,
        error: null,
        allProfiles: [],
        userCheckInData: [],
        loadingAllProfiles: false,
        errorAllProfiles: null,
        hoteldata: null,
        totalBookings: 0,
        checkedInCount: 0,
        total_users: 0,
    },
   
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
                state.isProfile = !!action.payload;
                state.isAuthenticated = !!action.payload; 
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                if (!state.profile) {
                    state.isAuthenticated = false; 
                }
            })
            .addCase(fetchAllProfiles.pending, (state) => {
                state.loadingAllProfiles = true;
                state.errorAllProfiles = null;
            })
            .addCase(fetchAllProfiles.fulfilled, (state, action) => {
                state.loadingAllProfiles = false;
                state.allProfiles = action.payload.allUsers;
                state.total_users = action.payload.totalUsers;
                state.userCheckInData = action.payload.userCheckInData;
            })
            .addCase(fetchhoteldata.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchhoteldata.fulfilled, (state, action) => {
                state.loading = false;
                state.hoteldata = action.payload.hoteldata;
                state.totalBookings = action.payload.totalBookings;
                state.checkedInCount = action.payload.checkedInCount;
                state.total_users = action.payload.total_users;
                
            })
            .addCase(fetchhoteldata.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(fetchAllProfiles.rejected, (state, action) => {
                state.loadingAllProfiles = false;
                state.errorAllProfiles = action.payload;
            });

            
    },
});


export default authSlice.reducer;