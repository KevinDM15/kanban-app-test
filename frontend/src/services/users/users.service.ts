import { ApiGateway } from "../../config/ApiGateway";

class UsersService {
  async getUsers() {
    try {
      const { data } = await ApiGateway.get("/users");

      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error; // Re-throw the error for further handling if needed
    }
  }
}

export const usersService = new UsersService();
