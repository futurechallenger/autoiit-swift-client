import { Platform } from "react-native";
const SERVER_URL =
  Platform.OS === "web"
    ? "http://127.0.0.1:5050"
    : "http://192.168.31.182:5050";

const REQUEST_COUNT = 10;
export { SERVER_URL, REQUEST_COUNT };
