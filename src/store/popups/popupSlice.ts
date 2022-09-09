import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { PopupTypes } from "../../types/PopupTypes";

const DEFAULT_TIMEOUT = 5000;

type Popup = {
  message: string;
  type: PopupTypes;
  key: string;
  show: boolean;
  removeAfterMs: number;
};

type PopupList = Array<Popup>;

interface IPopupState {
  popups: PopupList;
}

const initialState: IPopupState = {
  popups: [],
};

export const popupsSlice = createSlice({
  name: "popupList",
  initialState,
  reducers: {
    addPopup(state, action: PayloadAction<Partial<Popup>>) {
      const { message, type, key, removeAfterMs } = action.payload;
      state.popups.push({
        message: message ?? "message",
        type: type ?? PopupTypes.ERROR,
        key: key ?? uuidv4(),
        show: true,
        removeAfterMs: removeAfterMs ?? DEFAULT_TIMEOUT,
      });
    },
    removePopup(state, { payload: { key } }) {
      state.popups.forEach((p) => {
        if (p.key === key) {
          p.show = false;
        }
      });
    },
  },
});

export const { addPopup, removePopup } = popupsSlice.actions;
export default popupsSlice.reducer;
