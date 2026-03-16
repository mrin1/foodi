import  { store } from "../../hooks/redux-toolkit/store/store"



export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
