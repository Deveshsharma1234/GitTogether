import { createSlice } from "@reduxjs/toolkit";

const connectionRequestSlice = createSlice(
    {
        name: "connection",
        initialState : null,
        reducers :{
            connectionRequest : (state,action)=>{
                return action.payload;
            },
            removeConnectionsRequest : (state,action)=>{
                return null;
            }
        }
    }
)

export const{connectionRequest,removeConnectionsRequest}= connectionRequestSlice.actions
export default connectionRequestSlice.reducer;