import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiInfo } from "react-icons/fi";
import {
  Search,
  Plus,
  UserRound,
  ShieldCheck,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
} from "lucide-react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // search
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users", {
        params: {
          page,
          limit: 10,
          search_term: search || undefined,
        },
      });

      const data = res.data;

      setUsers(data.items || data.data?.items || []);
      setTotalPages(data.meta?.totalPages || 1);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  const toggleStatus = async (id) => {
    try {
      await axiosInstance.put(`/users/${id}/toggle-status`);
      toast.success("Status updated");
      fetchUsers();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const changeRole = async (id, role) => {
    try {
      await axiosInstance.put(`/users/${id}/change-role`, { role });
      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update role");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* INFO NOTE */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <FiInfo size={19} />
            </div>

            <div className="text-sm text-blue-800">
              <p className="font-bold">Important Notice</p>

              <p className="mt-1.5 leading-6">
                When you create a new admin user, only the{" "}
                <b>email address</b> is set here. The user must use the{" "}
                <b>"Forgot Password"</b> option on the login page to set their
                password before signing in for the first time.
              </p>

              <p className="mt-1.5 leading-6">
                This ensures secure password creation and prevents unauthorized
                access.
              </p>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#172d35] shadow-sm">
              <UserRound size={21} className="text-white" />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#172d35] sm:text-2xl">
                Manage Users
              </h2>

              <p className="mt-0.5 text-sm text-slate-500">
                Manage user accounts, roles and account access.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/admin/users/add")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#172d35] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#213f49] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#172d35]/15"
          >
            <Plus size={18} />
            Add User
          </button>
        </div>

        {/* SEARCH / TOOLBAR */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search users..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-[#172d35] outline-none transition-all placeholder:text-slate-400 focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
            />
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#172d35]">
                  User Accounts
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  Manage roles and account access for registered users.
                </p>
              </div>

              <span className="rounded-lg bg-[#172d35]/10 px-3 py-1.5 text-xs font-semibold text-[#172d35]">
                {users.length} Results
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-200 bg-[#172d35] text-white">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    User
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Email
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Role
                  </th>

                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr
                      key={u.id}
                      className="group transition-colors duration-150 hover:bg-[#172d35]/[0.03]"
                    >
                      {/* USER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#172d35]/10 text-[#172d35]">
                            <UserRound size={18} />
                          </div>

                          <div>
                            <p className="font-semibold text-[#172d35]">
                              {u.name || "Unnamed User"}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              User ID: {u.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* EMAIL */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-600">{u.email}</p>
                      </td>

                      {/* ROLE */}
                      <td className="px-5 py-4">
                        <div className="relative inline-flex items-center">
                          {u.role === "SUPER_ADMIN" ? (
                            <ShieldCheck
                              size={15}
                              className="pointer-events-none absolute left-3 text-[#172d35]"
                            />
                          ) : (
                            <ShieldAlert
                              size={15}
                              className="pointer-events-none absolute left-3 text-[#172d35]"
                            />
                          )}

                          <select
                            value={u.role}
                            onChange={(e) =>
                              changeRole(u.id, e.target.value)
                            }
                            className="rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-xs font-semibold text-[#172d35] outline-none transition-all focus:border-[#172d35] focus:bg-white focus:ring-4 focus:ring-[#172d35]/10"
                          >
                            <option value="ADMIN">ADMIN</option>
                            <option value="SUPER_ADMIN">
                              SUPER_ADMIN
                            </option>
                          </select>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            u.is_active
                              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                              : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              u.is_active
                                ? "bg-emerald-500"
                                : "bg-slate-400"
                            }`}
                          />

                          {u.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => toggleStatus(u.id)}
                            title={
                              u.is_active
                                ? "Disable user"
                                : "Enable user"
                            }
                            className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-white transition-all ${
                              u.is_active
                                ? "bg-amber-500 hover:bg-amber-600"
                                : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                          >
                            {u.is_active ? (
                              <UserX size={14} />
                            ) : (
                              <UserCheck size={14} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-5 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                          <UserRound size={22} />
                        </div>

                        <p className="font-semibold text-[#172d35]">
                          No users found
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Try changing your search or add a new user.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row">
          <p className="text-sm text-slate-500">
            Page{" "}
            <span className="font-semibold text-[#172d35]">{page}</span> of{" "}
            <span className="font-semibold text-[#172d35]">
              {totalPages}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-[#172d35] transition-all hover:border-[#172d35] hover:bg-[#172d35] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-[#172d35]"
            >
              <ChevronLeft size={16} />
              Prev
            </button>

            <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#172d35] px-3 text-sm font-semibold text-white shadow-sm">
              {page}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-[#172d35] transition-all hover:border-[#172d35] hover:bg-[#172d35] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-[#172d35]"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}