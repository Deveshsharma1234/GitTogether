
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../Slice/userSlice"
import connectionRequestReducer from "../Slice/connectionSlice"
import feedReducer from "../Slice/feedSlice"

const AppStore = configureStore({
    reducer:{

        "user": userReducer,
        "connectionRequests": connectionRequestReducer,
        "feed": feedReducer,
        
    }

})

export default AppStore;