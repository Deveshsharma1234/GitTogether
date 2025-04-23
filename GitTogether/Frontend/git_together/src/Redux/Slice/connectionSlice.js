import { createSlice } from "@reduxjs/toolkit";

const connectionRequestSlice = createSlice(
    {
        name: "connection",
        initialState : null,
        reducers :{
            connectionRequest : (state,action)=>{
                return action.payload;
            },
            removeConnectionsRequest: (state, action) => {
                if (state && state.pendingRequests) {
                    state.pendingRequests = state.pendingRequests.filter(
                        (r) => r._id !== action.payload
                    );
                }
            }
            
        }
    }
)

export const {connectionRequest,removeConnectionsRequest} = connectionRequestSlice.actions;
export default connectionRequestSlice.reducer;