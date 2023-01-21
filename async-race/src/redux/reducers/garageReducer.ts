import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Car } from "../../classes/Car";
import { getCars, createCar } from "./garageActions";

interface InitialState {
  cars: Car[];
  page: number;
  limit: number;
  create: CreateInput;
  carToUpdate: number;
}

interface CreateInput {
  name: string;
  color: string;
}

const initialState: InitialState = {
  cars: [],
  page: 1,
  limit: 7,
  create: {
    name: "",
    color: "#ffffff",
  },
  carToUpdate: 0,
};

export const garageSlice = createSlice({
  name: "garage",
  initialState,
  reducers: {
    setCarName(
      state: InitialState,
      action: PayloadAction<string>,
    ): InitialState {
      return {
        ...state,
        create: {
          ...state.create,
          name: action.payload,
        },
      };
    },
    setCarColor(
      state: InitialState,
      action: PayloadAction<string>,
    ): InitialState {
      return {
        ...state,
        create: {
          ...state.create,
          color: action.payload,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCars.fulfilled, (state, action) => ({
      ...state,
      cars: action.payload,
    }));
    builder.addCase(createCar.fulfilled, (state, action) => ({
      ...state,
      cars: [...state.cars, action.payload],
      create: {
        name: "",
        color: "#ffffff",
      },
    }));
  },
});

export const { setCarName, setCarColor } = garageSlice.actions;

export default garageSlice.reducer;
