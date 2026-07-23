import React from "react";
import {
  Trash2,
  KeyRound,
  UserRound,
  ChevronDown,
  Check,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUsers, updateUserRole } from "@/services/authService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const roleStyles = {
  user: "bg-indigo-100 text-indigo-600",
  admin: "bg-amber-100 text-amber-700",
};

const roleOptions = [
  {
    value: "user",
    label: "User",
    icon: UserRound,
  },
  {
    value: "admin",
    label: "Admin",
    icon: Shield,
  },
];

export const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [deleteError, setDeleteError] = React.useState("");
  const [roleTarget, setRoleTarget] = React.useState(null);
  const [selectedRole, setSelectedRole] = React.useState("user");
  const [roleLoading, setRoleLoading] = React.useState(false);
  const [roleError, setRoleError] = React.useState("");

  const getToken = () => {
    return localStorage.getItem("token") || "";
  };

  const handleAuthFailure = React.useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setError("Phien dang nhap het han. Vui long dang nhap lai.");
    navigate("/login", { replace: true });
  }, [navigate]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const token = getToken();
        if (!token) {
          handleAuthFailure();
          return;
        }
        const data = await getUsers(token);
        setUsers(data?.items || []);
      } catch (err) {
        if (err?.response?.status === 401) {
          handleAuthFailure();
          return;
        }
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
  }, [handleAuthFailure]);

  const openDeleteDialog = (user) => {
    setDeleteTarget(user);
    setDeleteError("");
  };

  const openRoleDialog = (user) => {
    setRoleTarget(user);
    setSelectedRole(user.role || "user");
    setRoleError("");
  };

  const closeDeleteDialog = () => {
    setDeleteTarget(null);
    setDeleteLoading(false);
    setDeleteError("");
  };

  const closeRoleDialog = () => {
    setRoleTarget(null);
    setSelectedRole("user");
    setRoleLoading(false);
    setRoleError("");
  };

  const handleDeleteUser = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    setDeleteError("");

    try {
      const token = getToken();
      if (!token) {
        handleAuthFailure();
        return;
      }
      await deleteUser(token, deleteTarget._id);
      setUsers((prev) => prev.filter((user) => user._id !== deleteTarget._id));
      closeDeleteDialog();
    } catch (err) {
      if (err?.response?.status === 401) {
        handleAuthFailure();
        return;
      }
      const message =
        err?.response?.data?.message || err?.message || "Khong the xoa user.";
      setDeleteError(message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSaveRole = async () => {
    if (!roleTarget) return;

    setRoleLoading(true);
    setRoleError("");

    try {
      const token = getToken();
      if (!token) {
        handleAuthFailure();
        return;
      }
      const data = await updateUserRole(token, roleTarget._id, selectedRole);
      const updatedUser = data?.user || {
        ...roleTarget,
        role: selectedRole,
      };

      setUsers((prev) =>
        prev.map((user) => (user._id === updatedUser._id ? updatedUser : user)),
      );
      closeRoleDialog();
    } catch (err) {
      if (err?.response?.status === 401) {
        handleAuthFailure();
        return;
      }
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Khong the cap nhat quyen user.";
      setRoleError(message);
    } finally {
      setRoleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#faf9ff_52%,#f5f7ff_100%)]">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="mb-10 flex items-center justify-center gap-3 text-4xl font-bold text-indigo-600 sm:text-5xl">
          <span aria-hidden="true">🧩</span>
          User Management
        </h1>
        <div className="rounded-[28px] border border-slate-100 bg-white/90 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-6">
          {loading && (
            <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              <p className="mt-4 text-sm text-slate-500">
                Dang tai danh sach user...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-red-200 bg-red-50 px-6 py-16 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-red-500 shadow-sm">
                <UserRound className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                Load failed
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500">{error}</p>
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-slate-400 shadow-sm">
                <UserRound className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">
                No users found
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500">
                Try changing the search keyword or role filter.
              </p>
            </div>
          )}

          {!loading && !error && users.length > 0 && (
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
                      {users.map((user) => (
                        <tr
                          key={user._id}
                          className="transition hover:bg-slate-50/80"
                        >
                          <td className="px-6 py-6 text-sm font-semibold text-slate-900">
                            {user.username}
                          </td>
                          <td className="px-6 py-6 text-sm text-slate-700">
                            {user.email}
                          </td>
                          <td className="px-6 py-6">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                roleStyles[user.role] ||
                                "bg-slate-100 text-slate-600"
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
                                onClick={() => openRoleDialog(user)}
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
                {users.map((user) => (
                  <article
                    key={user._id}
                    className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">
                          {user.username}
                        </h3>
                        <p className="mt-1 break-all text-sm text-slate-500">
                          {user.email}
                        </p>
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
                        onClick={() => openRoleDialog(user)}
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
            <button
                type="button"
                className="absolute right-5 top-5 rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            <div className="mb-5 flex items-start gap-4">
              
              <div className="pt-1">
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  Delete this user?
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  This user account will be permanently removed.
                </p>
              </div>
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

      {roleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.24)] sm:p-7">
            <button
              type="button"
              onClick={closeRoleDialog}
              className="absolute right-5 top-5 rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <div className="mb-5 pr-8">
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                Change User Role
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Select the new role for {roleTarget.username}.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-900">
                  Select Role
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <button
                        type="button"
                        role="combobox"
                        aria-controls="radix-*r_s*"
                        aria-expanded="false"
                        aria-autocomplete="none"
                        dir="ltr"
                        data-state="closed"
                        className="mt-2 flex h-11 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950"
                      >
                        <span style={{ pointerEvents: "none" }}>
                          <span className="inline-flex items-center gap-2">
                            {React.createElement(
                              roleOptions.find((role) => role.value === selectedRole)?.icon ||
                                UserRound,
                              {
                                className: "h-4 w-4",
                                "aria-hidden": "true",
                              },
                            )}
                            {roleOptions.find((role) => role.value === selectedRole)?.label ||
                              "User"}
                          </span>
                        </span>
                        <span aria-hidden="true">
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </button>
                    }
                  />
                  <DropdownMenuContent>
                    <div className="mt-2 w-[var(--radix-dropdown-menu-trigger-width)] overflow-hidden rounded-md border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-950">
                      {roleOptions.map((role) => {
                        const isSelected = selectedRole === role.value;

                        return (
                          <DropdownMenuItem
                            key={role.value}
                            onClick={() => setSelectedRole(role.value)}
                            className="flex h-9 cursor-pointer items-center justify-between rounded-md px-2.5 text-sm text-slate-900 outline-none transition hover:bg-slate-50 focus:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-900 dark:focus:bg-slate-900"
                          >
                            <span className="inline-flex items-center gap-2">
                              {React.createElement(role.icon, {
                                className: "h-4 w-4",
                                "aria-hidden": "true",
                              })}
                              {role.label}
                            </span>
                            {isSelected && (
                              <Check className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                            )}
                          </DropdownMenuItem>
                        );
                      })}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </label>

           
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeRoleDialog}
                disabled={roleLoading}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveRole}
                disabled={roleLoading}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(79,70,229,0.24)] transition hover:bg-indigo-700"
              >
                {roleLoading ? "Saving..." : "Save Role"}
              </button>
            </div>
            {roleError && (
              <p className="mt-4 text-sm text-rose-600" role="alert">
                {roleError}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
