// import { GURDWARA_API_BASE_URL } from "../config"
// import store from "../store"

const GURDWARA_API_BASE_URL = "https://gurdwara-backend.herokuapp.com/v1"

// const GURDWARA_API_BASE_URL = "http://localhost:4000/v1"

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdjOGNjZDA2ZjNmMjQ5MGE0ODRiNDAiLCJ1c2VybmFtZSI6Imhhc2VlYkB0ZXN0LmNvbSIsImVtYWlsIjoiaGFzZWViQHRlc3QuY29tIiwicGhvbmVOdW1iZXIiOiIwIiwiaWF0IjoxNjUyODAzNTgwLCJleHAiOjE2NTM1MjM1ODB9.4nCsylIDKoiRVemI4EbWZXfxTYT7Llt9zZlGNu2zlvY'

export const post = async ({ url, baseURL, body, contentType, shouldAuthenticate }) => {
  const method = "POST"
  console.log(process.env.GURDWARA_API_BASE_URL)
  const bodyString = JSON.stringify(body)
  // const {
  // 	user: { token },
  // } = window.store.getState();
//   const token = ""

  const response = await fetch(`${baseURL || GURDWARA_API_BASE_URL}${url}`, {
    body: bodyString,
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": contentType,
      ...(shouldAuthenticate ? { Authorization: `${token}` } : {}),
    },
  })
  const jsonResponse = await response.json()
  if (!response.ok) {
    throw jsonResponse
  }

  return jsonResponse
}

export const put = async ({ url, body, shouldAuthenticate }) => {
  const method = "PUT"
  const bodyString = JSON.stringify(body)
  // const {
  // 	user: { token }, testing
  // } = window.store.getState();
//   const token = ""

  return (
    await fetch(`${GURDWARA_API_BASE_URL}${url}`, {
      body: bodyString,
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(shouldAuthenticate ? { Authorization: `${token}` } : {}),
      },
    })
  ).json()
}

export const putFile = async ({ url, file }) => {
  const method = "PUT"

  return await fetch(`${url}`, {
    body: file,
    method,
    headers: {
      crossDomain: true,
      // Accept: file.type,
      // 'Content-Type': file.type,
      // 'Content-Type': 'application/octet-stream',
      "Access-Control-Allow-Origin": "*",
    },
  })
}

export const get = async ({ url, shouldAuthenticate }) => {
  const method = "GET"
  // const {
  // 	user: { token },
  // } = window.store.getState();
//   const token = ""
  return (
    await fetch(`${GURDWARA_API_BASE_URL}${url}`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(shouldAuthenticate ? { Authorization: `${token}` } : {}),
      },
    })
  ).json()
}

export const deleteReq = async ({ url, shouldAuthenticate }) => {
  const method = "DELETE"
  // const {
  // 	user: { token },
  // } = window.store.getState();
//   const token = ""
  return (
    await fetch(`${GURDWARA_API_BASE_URL}/${url}`, {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(shouldAuthenticate ? { Authorization: `${token}` } : {}),
      },
    })
  ).json()
}
