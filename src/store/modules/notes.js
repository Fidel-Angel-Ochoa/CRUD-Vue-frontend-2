import axios from "axios";

const state = {
  notes: null,
  note: null,
};

const getters = {
  stateNotes: (state) => state.notes,
  stateNote: (state) => state.note,
};

const actions = {
  // '{}' means destructuring, we extract 'dispatch' method from 'context' object, so we avoid write '(context, note)' and further 'context.dispatch('getNotes')'. In this way we use less code to do the same.
  async createNote({dispatch}, note) {
    await axios.post("notes", note);
    await dispatch("getNotes");
  },
  // here '{}' means destructuring, we extract a variable inside of a object and save it in a variable with the same name, we extract 'data' from the object 'notes' and save it in the variable '{data}'. 'let' is a keyword that help to do this.
  // 'let' allow to create a variable inside a block of code, like the following block, that only is accesible inside this block, outside 'does not exist'
  async getNotes({commit}) {
    let {data} = await axios.get("notes");
    commit("setNotes", data);
  },
  async viewNote({commit}, id) {
    let {data} = await axios.get(`note/${id}`);
    commit("setNote", data);
  },
  // eslint-disable-next-line no-empty-pattern
  async updateNote({}, note) {
    await axios.patch(`note/${note.id}`, note.form);
  },
  // eslint-disable-next-line no-empty-pattern
  async deleteNote({}, id) {
    await axios.delete(`note/${id}`);
  },
};

const mutations = {
  setNotes(state, notes) {
    state.notes = notes;
    console.log("mutt:", state.notes);
  },
  setNote(state, note) {
    state.note = note;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
