
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../Slice/userSlice"

const AppStore = configureStore({
    reducer:{

        "user": userReducer
    }

})

export default AppStore;