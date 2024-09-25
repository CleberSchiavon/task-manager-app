import { AxiosClient } from "client/AxiosClient";
import { CreateUser } from "components/Forms/schemas/CreateUser";
import { LoginUser as LoginUserType } from "components/Forms/schemas/LoginUser";

export const loginUser = async ({ data }: { data: LoginUserType }) => {
  try {
    const { data: responseData } = await AxiosClient.post<{
      access_token: string;
    }>("/auth/login", data);
    localStorage.setItem("token", responseData.access_token);
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Ocorreu um erro ao realizar o login");
  }
};

export const registerUser = async ({ data }: { data: CreateUser }) => {
  try {
    const { data: responseData } = await AxiosClient.post("/auth/signup", data);
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Ocorreu um erro ao realizar o cadastro de usuário");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
