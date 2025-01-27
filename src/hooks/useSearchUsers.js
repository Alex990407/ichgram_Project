import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useSearchUsers = (isOpen) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    if (!isOpen) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:3003/api/profiles/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log(response.data);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [isOpen]);

  const filterUsers = useCallback(
    (query) => {
      setFilteredUsers(
        users.filter((user) =>
          user.username.toLowerCase().includes(query.toLowerCase())
        )
      );
    },
    [users]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, filteredUsers, loading, error, filterUsers };
};

export default useSearchUsers;
