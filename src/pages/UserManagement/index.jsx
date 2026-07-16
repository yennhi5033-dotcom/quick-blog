import React from "react";
import {
  LayoutGrid,
  Search,
  Trash2,
  KeyRound,
  ShieldCheck,
  UserRound,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "@/services/authService";

const roleStyles = {
  user: "bg-indigo-100 text-indigo-600",
  admin: "bg-emerald-100 text-emerald-700",
};

export const UserManagement = () => {
  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [role, setRole] = React.useState("all");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState("");

  const getToken = () => {
    return localStorage.getItem("token") || "";
  };

  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const token = getToken();
        const data = await getUsers(token);
        setUsers(data?.items || []);
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Khong the tai danh sach user.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = React.useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !keyword ||
        user.username?.toLowerCase().includes(keyword) ||
        user.email?.toLowerCase().includes(keyword);

      const matchesRole = role === "all" || user.role === role;

      return matchesSearch && matchesRole;
    });
  }, [role, search, users]);

  const stats = [
    { label: "Total Users", value: users.length, icon: UserRound },
    { label: "Active Roles", value: new Set(users.map((user) => user.role)).size, icon: ShieldCheck },
    {
      label: "Admin Users",
      value: users.filter((user) => user.role === "admin").length,
      icon: KeyRound,
      },
    ];

  const openDeleteDialog = (user) => {
    setDeleteTarget(user);
    setDeleteError("");
  };

  const closeDeleteDialog = () => {
    setDeleteTarget(null);
    setDeleteLoading(false);
    setDeleteError("");
  };

  const handleDeleteUser = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    setDeleteError("");

    try {
      const token = getToken();
      await deleteUser(token, deleteTarget._id);
      setUsers((prev) => prev.filter((user) => user._id !== deleteTarget._id));
      closeDeleteDialog();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Khong the xoa user.";
      setDeleteError(message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#faf9ff_52%,#f5f7ff_100%)]">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:mb-12 lg:flex-row lg:items-end">
          <h1 className="mb-10 flex items-center justify-center gap-3 text-4xl font-bold text-indigo-600 sm:text-5xl">
            <span aria-hidden="true">🧩</span>
            User Management
          </h1>
        </div>

      

        <div className="rounded-[28px] border border-slate-100 bg-white/90 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-6">
          

          {loading && (
            <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              <p className="mt-4 text-sm text-slate-500">Dang tai danh sach user...</p>
            </div>
          )}

          {!loading && error && (
            <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-red-200 bg-red-50 px-6 py-16 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-red-500 shadow-sm">
                <UserRound className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">Load failed</h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500">{error}</p>
            </div>
          )}

          {!loading && !error && filteredUsers.length === 0 && (
            <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-slate-400 shadow-sm">
                <UserRound className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">No users found</h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500">
                Try changing the search keyword or role filter.
              </p>
            </div>
          )}

          {!loading && !error && filteredUsers.length > 0 && (
            <>
              <div className="hidden overflow-hidden rounded-2xl border border-slate-100 lg:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-100 text-left">
                    <thead className="bg-slate-50/80">
                      <tr>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
                          Username
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
                          Email
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
                          Role
                        </th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {filteredUsers.map((user) => (
                        <tr key={user._id} className="transition hover:bg-slate-50/80">
                          <td className="px-6 py-6 text-sm font-semibold text-slate-900">
                            {user.username}
                          </td>
                          <td className="px-6 py-6 text-sm text-slate-700">{user.email}</td>
                          <td className="px-6 py-6">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                roleStyles[user.role] || "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-6">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500 text-white shadow-sm transition hover:bg-rose-600"
                                aria-label={`Delete ${user.username}`}
                                onClick={() => openDeleteDialog(user)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                              <button
                                type="button"
                                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-sm transition hover:bg-indigo-100"
                                aria-label={`Manage ${user.username}`}
                              >
                                <KeyRound className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid gap-4 lg:hidden">
                {filteredUsers.map((user) => (
                  <article
                    key={user._id}
                    className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{user.username}</h3>
                        <p className="mt-1 break-all text-sm text-slate-500">{user.email}</p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          roleStyles[user.role] || "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-sm"
                        onClick={() => openDeleteDialog(user)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                      <button
                        type="button"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-600 shadow-sm"
                      >
                        <KeyRound className="h-4 w-4" />
                        Manage
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.24)] sm:p-7">
            <div className="mb-5 flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-rose-50 text-rose-600">
                <Trash2 className="h-5 w-5" />
              </div>
              <div className="pt-1">
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  Delete this user?
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  This user account will be permanently removed.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Username
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {deleteTarget.username}
                  </p>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    roleStyles[deleteTarget.role] || "bg-slate-100 text-slate-600"
                  }`}
                >
                  {deleteTarget.role}
                </span>
              </div>
              <p className="mt-3 break-all text-sm text-slate-500">
                {deleteTarget.email}
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteDialog}
                disabled={deleteLoading}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                disabled={deleteLoading}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-rose-500 px-5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(244,63,94,0.24)] transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
            {deleteError && (
              <p className="mt-4 text-sm text-rose-600" role="alert">
                {deleteError}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
