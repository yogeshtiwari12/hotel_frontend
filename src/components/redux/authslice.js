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
            allUsers: response.data,
            // userCheckInData: response.data?.isUSerCheckin || [],
        };
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});


export const fetchhoteldata = createAsyncThunk("auth/fetchhoteldata", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${frontend_url}/hotelroutes/hoteldetail`, {
            withCredentials: true,
        });

        return {
            hoteldata: response.data.total_price,
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
                state.userCheckInData = action.payload.userCheckInData;
            })
            .addCase(fetchhoteldata.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchhoteldata.fulfilled, (state, action) => {
                state.loading = false;
                state.hoteldata = action.payload.hoteldata;
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