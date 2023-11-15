import { useEffect } from "react";
import Table from "@/components/Table/Index";
import getApiURL from "@/helpers/getApiURL";
import fetchData from "@/helpers/fetchData";
import { toast } from "sonner";
import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url = getApiURL("users");

    fetchData(
      url,
      (json) => setUsers(json),
      () => toast.error("Users could not be loaded. Please try again later.")
    );
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="p-1.5 min-w-full inline-block align-middle">
        <div className="border bg-gray-800 rounded-lg divide-y divide-gray-700 border-gray-700">
          <div className="overflow-hidden">
            <Table thead={["#", "Avatar", "Name", "E-Mail", "Role"]}>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>
                    <div className="w-[60px] h-[60px] relative overflow-hidden rounded-full">
                      <img
                        src={user.avatar}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Table.Cell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                </Table.Row>
              ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
