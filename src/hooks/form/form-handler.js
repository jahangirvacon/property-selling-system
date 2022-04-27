import React, { useState } from "react"

const useFormHandler = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues)
  const [formErrors, setErrors] = useState(undefined)

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    callback()
  }
  const handleInputChange = (event) => {
    event.persist()
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }))
  }

  return {
    inputs,
    formErrors,
    handleSubmit,
    handleInputChange,
    setErrors,
  }
}

export default useFormHandler
