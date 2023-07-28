import axios from "axios";

const state = {
  user: null,
};


const getters = {
  isAuthenticated: (state) => !!state.user,
  stateUser: (state) => state.user,
};

const actions = {
  async register({dispatch}, form) {
    await axios.post("register", form);
    let UserForm = new FormData();
    UserForm.append("username", form.username);
    UserForm.append("password", form.password); // here the error was a typo: 'Password' instead 'password'
    await dispatch("logIn", UserForm);
  },
  // here we add the last line (context.commit...) to change 'state.user', after this 'isAuthenticated' can work. Remember that 'commit' manage 'mutations'.
  async logIn(context, user) {
    try {
      const response = await axios.post("login", user);
      response.headers["set-cookie"]; // calling this line we force to 'check' the response from the 'post', if there is a error(unauthorized or something) the 'try-catch' works
      await context.commit("setUser", user);
      await context.dispatch("viewMe"); // this line is not the problem
      // The rest of the code related to successful login can be placed here
      // For example, commit, dispatch, etc.

      sessionStorage.setItem("user", user);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log("Error: Unauthorized (401)");
          console.log("Error response data:", error.response.data);
          // Handle the 401 Unauthorized error here if needed
          // For example, show an error message to the user
        } else if (error.response.status === 422) {
          console.log("Error: Unprocessable Entity (422)");
          console.log("Error response data:", error.response.data);
          // Handle the 422 error here if needed
        } else {
          console.error("An error occurred: ", error);
          // Handle other errors (e.g., network errors, server errors) if needed
        }
      } else {
        console.error("An error occurred: ", error);
        // Handle other errors (e.g., network errors, server errors) if needed
      }
    }
  },

  async viewMe({commit}) {
    let {data} = await axios.get("users/whoami");
    await commit("setUser", data);
  },
  // eslint-disable-next-line no-empty-pattern
  async deleteUser({}, id) {
    await axios.delete(`user/${id}`);
  },
  async logout({commit}) {
    let user = null;
    commit("logout", user);
    sessionStorage.removeItem("user");
  },

  // this save the 'userState' so we can have the data after refresh.
  initializeUserStatus({commit}) {
    const user = sessionStorage.getItem("user");
    if (user == "null" || user == "undefined") {
      commit("setUser", null);
    } else {
      commit("setUser", user);
    }
  },
};

// now we have a problem, when the page get refresh the state.user is delete, so 'isAuthenticated' change to false.
// maybe we can solve it calling the backend route 'get' (whoami) to get the authenticated current user
const mutations = {
  setUser(state, username) {
    state.user = username;
  },
  logout(state, user) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
