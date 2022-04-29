import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { serializeAxiosError } from 'src/shared/reducers/reducer.utils';

const API_URL = process.env.API_URL;

const initialState = {
  loading: false,
  scheduleList: [],
  schedule: null, // Or schedule data
  errorMessage: null,
  updateSuccess: null,
};

export const getDoctorSchedules = createAsyncThunk(
  'schedule_manager/fetch_schedule_by_doctor_login',
  async login => {
    const res = await axios.get(`${API_URL}/examination-schedules/doctor/${login}`);
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

export const getSchedule = createAsyncThunk(
  'schedule_manager/fetch_schedule',
  async id => {
    const res = await axios.get(`${API_URL}/examination-schedules/${id}`);
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

/**
 * Update schedule
 * @param schedule {id: number, status: string}}
 */
export const partialUpdateSchedule = createAsyncThunk(
  'booking_manager/confirm_schedule',
  async schedule => {
    const res = await axios.patch(`${API_URL}/examination-schedules/${schedule.id}`, schedule);
    return res.data;
  },
  {
    serializeError: serializeAxiosError,
  }
);

const scheduleManageSlice = createSlice({
  name: 'schedule_manager',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDoctorSchedules.fulfilled, (state, action) => {
        state.scheduleList = action.payload;
        state.loading = false;
      })
      .addCase(getDoctorSchedules.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getDoctorSchedules.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Internal server error';
        state.loading = false;
      })
      .addCase(getSchedule.fulfilled, (state, action) => {
        state.schedule = action.payload;
        state.loading = false;
      })
      .addCase(getSchedule.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getSchedule.rejected, (state, action) => {
        state.errorMessage = action.error.message || 'Internal server error';
        state.loading = false;
      })
      .addCase(partialUpdateSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccess = true;
      })
      .addCase(partialUpdateSchedule.pending, state => {
        state.loading = true;
        state.errorMessage = null;
        state.updateSuccess = null;
      })
      .addCase(partialUpdateSchedule.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message || 'Internal server error';
        state.updateSuccess = false;
      });
  },
});

export default scheduleManageSlice.reducer;
