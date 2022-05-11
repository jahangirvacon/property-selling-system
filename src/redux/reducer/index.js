let initialState = {
  isLoading: false,
  searchText: '',
  bookingList: [],
}

export default function reducer(currentState = initialState, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...currentState,
        isLoading: true,
      }
    case "LOADED":
      return {
        ...currentState,
        isLoading: false,
      }
    case "BOOKINGS_LOADED":
      return {
        ...currentState,
        isLoading: false,
        bookingList: action.payload
      }
      case "TEXT_SEARCHED":
        return {
          ...currentState,
          searchText: action.payload,
          isLoading: true
        }
    default:
      return currentState
  }
}
