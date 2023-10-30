import axios from "axios";

const signup = async (object) => {
  return await axios.post("/api/auth/signup", object);
};

export default { signup };
