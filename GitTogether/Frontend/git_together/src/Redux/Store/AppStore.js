
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../Slice/userSlice"
import connectionRequestReducer from "../Slice/connectionSlice"

const AppStore = configureStore({
    reducer:{

        "user": userReducer,
        "connectionRequests": connectionRequestReducer
    }

})

export default AppStore;