import axios from "axios";

const url = "http://localhost:5100/api/songs";

export const getLatest = () => axios.get(`${url}/latest`);
