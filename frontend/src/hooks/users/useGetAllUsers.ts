import { useEffect, useState } from "react";
import type { UserDto } from "../../services/users/dto/user.dto";
import { usersService } from "../../services/users/users.service";

export const useGetAllUsers = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await usersService.getUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [])

  return { users, loading };
}
