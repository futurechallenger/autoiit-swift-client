import { SERVER_URL } from "../Lib/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { APIResponse } from "../types";

type RequestParam = {
  query: string;
  operationName?: string;
  variables: any | undefined;
};

async function sendRequest<DataType>({
  query,
  variables = undefined,
  operationName,
}: RequestParam): Promise<APIResponse<DataType>> {
  const token = await AsyncStorage.getItem("@token");

  const headers: { [index: string]: string } = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["authorization"] = token;
  }

  const body: { [index: string]: string } = {};

  body["query"] = query;
  if (operationName) {
    body["operationName"] = operationName;
  }
  if (variables) {
    body["variables"] = variables;
  }

  const res = await fetch(`${SERVER_URL}/graphql`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: { ...headers, Authorization: token ?? "" },
    body: JSON.stringify(body),
  });

  return res.json();
}

export { sendRequest };
