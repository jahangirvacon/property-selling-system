import React, { useState, useEffect } from "react"

const useLogInSignupHandler = (showView) => {
  const [isShowLogIn, setIsShowLogIn] = useState(true)

  useEffect(() => {
    showView()
  }, [isShowLogIn])

  return {
    isShowLogIn,
    setIsShowLogIn,
  }
}

export default useLogInSignupHandler
