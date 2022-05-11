import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducer from "./reducer"
import { fetchBookingList } from "./thunk"

const store = createStore(reducer, applyMiddleware(thunk))
store.dispatch(fetchBookingList)
export default store
