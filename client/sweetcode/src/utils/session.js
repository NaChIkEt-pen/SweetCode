function getSessionId() {
  let id = localStorage.getItem("user_id");
  if (!id) {
    id = crypto.randomUUID(); // or use a library like uuid
    localStorage.setItem("user_id", id);
  }
  return id;
}

export default getSessionId;
