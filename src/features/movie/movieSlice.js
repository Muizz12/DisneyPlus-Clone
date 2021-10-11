import { createSlice } from "@reduxjs/toolkit";
const initialState={
    r:null,
    ND:null,
    o:null,
    T:null,

}
const movieSlice=createSlice({
    name:'movie',
    initialState,
    reducers:{
        setMovies:(state,action)=>{
            state.r=action.payload.r;
            state.ND=action.payload.ND;
            state.o=action.payload.o;
            state.T=action.payload.T;
        }
    }
});

export const {setMovies}=movieSlice.actions
export const selectRecommend=state=>state.move.r;
export const selectOriginal=state=>state.move.o;
export const SelectDisney=state=>state.move.ND;
export const Selecttrending=state=>state.move.T;
console.log('sras',selectRecommend);

export default movieSlice.reducer
;