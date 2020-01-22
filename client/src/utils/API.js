import axios from 'axios'

const setHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('hetic_student_token')
  }
  return headers
}

const tokenId = 'hetic_student_token'

const URL = `http://localhost:9000/api/v1`

export default {
  async login(body) {
    const response = await axios.post(`${URL}/users/login`, {
      email: body.email,
      password: body.password,
      role: body.role
    })
    localStorage.setItem(tokenId, response.data.token)
    return response.data
  },

  getAllUsers() {
    const headers = setHeaders()
    return axios.get(`${URL}/users/all`, {
      headers
    })
  },

  getUser(id) {
    const headers = setHeaders()

    if(id) {
      return axios.get(`${URL}/users/${id}`, {
        headers
      })
    }

    return axios.get(`${URL}/users/`, {
      headers
    })
  },

  createUser() {
    const headers = setHeaders()
    return axios.post(`${URL}/add-user`, {
      headers
    })
  },

  updateUser(id, body) {
    const headers = setHeaders()
    return axios.patch(`${URL}/users/${id}`, body, {
      headers
    })
  },
  deleteUser(id) {
    const headers = setHeaders()
    return axios.delete(`${URL}/users/${id}`, {
      headers
    })
  },

  getSkills() {
    const headers = setHeaders()
    return axios.get(`${URL}/skills`, {
      headers
    })
  },

  getSkill(id) {
    const headers = setHeaders()
    return axios.get(`${URL}/skills/${id}`, {
      headers
    })
  },

  createSkill() {
    const headers = setHeaders()
    return axios.post(`${URL}/skills`, {
      headers
    })
  },

  updateSkill(id) {
    const headers = setHeaders()
    return axios.patch(`${URL}/skills/${id}`, {
      headers
    })
  },

  deleteSkill(id) {
    const headers = setHeaders()
    return axios.delete(`${URL}/skills/${id}`, {
      headers
    })
  },

  signup(body) {
    const headers = setHeaders()
    return axios.post(`${URL}/user/signup`, body, { headers: headers })
  },

  isAuth() {
    return localStorage.getItem(tokenId) !== null
  },

  getAuthData() {
    return localStorage.getItem(tokenId) !== null
  },
  
  logout() {
    localStorage.removeItem(tokenId)
  }
}
