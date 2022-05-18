import { getBookingList } from "../../api"

export async function fetchBookingList(dispatch, getState) { 
  dispatch({ type: "LOADING" })
  const {searchText} = getState()
  const { response } = await getBookingList(searchText)
  dispatch({ type: "BOOKINGS_LOADED", payload: response })
}
