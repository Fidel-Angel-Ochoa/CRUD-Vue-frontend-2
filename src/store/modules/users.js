import axios from "axios";

const state = {
  user: null,
};
console.log("user state in state:", state.user);

const getters = {
  isAuthenticated: (state) => {
    const isAuthenticated = !!state.user;
    console.log("Auth: ", isAuthenticated);
    return isAuthenticated;
  },
  stateUser: (state) => state.user,
};
console.log(
  "user state in state after isAuthenticated:",
  getters.isAuthenticated.isAuthenticated
);
const user = sessionStorage.getItem("user");
console.log("user in initializeUserStatus 1 :", user);

const actions = {
  async register({dispatch}, form) {
    await axios.post("register", form);
    let UserForm = new FormData();
    UserForm.append("username", form.username);
    UserForm.append("Password", form.password);
    await dispatch("logIn", UserForm);
    console.log("user in register: ", UserForm);
  },
  // here we add the last line (context.commit...) to change 'state.user', after this 'isAuthenticated' can work. Remember that 'commit' manage 'mutations'.
  async logIn(context, user) {
    try {
      await axios.post("login", user);
      const userEntries = [...user.entries()];
      console.log("user after login: ", userEntries);
      await context.commit("setUser", user);
      // The rest of the code related to successful login can be placed here
      // For example, commit, dispatch, etc.

      sessionStorage.setItem("user", "user");
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

  // async logIn(context, user) {
  //   await axios.post("login", user);
  //   const userEntries = [...user.entries()];
  //   console.log("user after login: ", userEntries);
  //   // await context.commit("setUser", user);
  //   // await context.dispatch("viewMe"); // this line is not the problem
  //   sessionStorage.setItem("user", "user");

  //   // Convert FormData object to an array of key-value pairs
  //   // Convert the array to a string and log it to the console
  //   // console.log("User in logIn:", userEntries);
  //   // await context.commit("setUser", userEntries);
  //   // console.log("user in login: ", user);
  // },
  async viewMe({commit}) {
    let {data} = await axios.get("users/whoami");
    await commit("setUser", data);
    console.log("data:", data);
  },
  // eslint-disable-next-line no-empty-pattern
  async deleteUser({}, id) {
    await axios.delete(`user/${id}`);
  },
  async logout({commit}) {
    let user = null;
    commit("logout", user);
    console.log("user in logout: ", user);
    sessionStorage.setItem("user", user);
    console.log("sessionStorage in logout", sessionStorage.getItem("user"));
    // sessionStorage.removeItem("user");
  },
  initializeUserStatus({commit}) {
    const user = sessionStorage.getItem("user");
    console.log("user in initializeUserStatus:", user);
    if (user == "null") {
      commit("setUser", null);
      console.log("user after initiazeUserStatus:", user);
    }
  },
};

// now we have a problem, when the page get refresh the state.user is delete, so 'isAuthenticated' change to false.
// maybe we can solve it calling the backend route 'get' (whoami) to get the authenticated current user
const mutations = {
  setUser(state, username) {
    state.user = username;
    console.log("state user in mut: ", state.user);
  },
  logout(state, user) {
    state.user = user;
    console.log("state user in LogOut mut: ", state.user);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
