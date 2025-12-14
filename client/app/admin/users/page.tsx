"use client"

import type React from "react"

import AdminSidebar from "@/components/layout/admin-sidebar"
import { mockAdminUsers, type AdminUser } from "@/lib/admin-data"
import { useState } from "react"
import { Search, MoreVertical, Trash2, Edit, X } from "lucide-react"

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>(mockAdminUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user" as AdminUser["role"],
  })

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const deleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId))
      setActiveDropdown(null)
    }
  }

  const openAddModal = () => {
    setEditingUser(null)
    setFormData({ username: "", email: "", password: "", role: "user" })
    setShowModal(true)
  }

  const openEditModal = (user: AdminUser) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
    })
    setShowModal(true)
    setActiveDropdown(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? { ...user, username: formData.username, email: formData.email, role: formData.role }
            : user,
        ),
      )
    } else {
      const newUser: AdminUser = {
        id: `user-${Date.now()}`,
        username: formData.username,
        email: formData.email,
        phone: "+977 9800000000",
        role: formData.role,
        status: "active",
        joinedDate: new Date().toLocaleDateString(),
        totalOrders: 0,
        totalSpent: 0,
      }
      setUsers([...users, newUser])
    }

    setShowModal(false)
    setFormData({ username: "", email: "", password: "", role: "user" })
  }

  return (
    <div className="flex min-h-screen bg-dokan-light">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-manrope text-4xl font-bold text-dokan-dark">User Management</h1>
            <button
              onClick={openAddModal}
              className="px-6 py-3 bg-dokan-dark text-white rounded-lg font-quicksand hover:bg-gray-800 transition-colors"
            >
              Add User
            </button>
          </div>

          <div className="mb-6 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
            />
          </div>

          <div className="bg-white rounded-lg border border-dokan-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-dokan-border">
                  <tr>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">User</th>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">Role</th>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">Status</th>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">Orders</th>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">Spent</th>
                    <th className="px-6 py-4 text-left font-quicksand font-semibold text-sm text-dokan-dark">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dokan-border">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-quicksand font-semibold text-dokan-dark">{user.username}</p>
                          <p className="font-quicksand text-sm text-gray-500">Joined {user.joinedDate}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-quicksand text-sm text-dokan-dark">{user.email}</p>
                          <p className="font-quicksand text-sm text-gray-500">{user.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-quicksand font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : user.role === "moderator"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-quicksand font-semibold ${
                            user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-quicksand text-dokan-dark">{user.totalOrders}</td>
                      <td className="px-6 py-4 font-quicksand text-dokan-dark">
                        Rs. {user.totalSpent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {activeDropdown === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-dokan-border rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => openEditModal(user)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 font-quicksand text-sm flex items-center gap-2"
                            >
                              <Edit size={16} />
                              Edit User
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-50 font-quicksand text-sm flex items-center gap-2 text-red-600 rounded-b-lg"
                            >
                              <Trash2 size={16} />
                              Delete User
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="font-quicksand text-sm text-gray-600 mt-4">
            Showing {filteredUsers.length} of {users.length} users
          </p>

          {showModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <div className="bg-white rounded-lg p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-manrope text-2xl font-bold text-dokan-dark">
                    {editingUser ? "Edit User" : "Add User"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Username</label>
                    <input
                      type="text"
                      required
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
                      placeholder="Enter username"
                    />
                  </div>

                  <div>
                    <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
                      placeholder="Enter email"
                    />
                  </div>

                  {!editingUser && (
                    <div>
                      <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Password</label>
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand focus:outline-none focus:ring-2 focus:ring-dokan-dark"
                        placeholder="Enter password"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block font-quicksand font-semibold text-dokan-dark mb-2">Role</label>
                    <select
                      disabled
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminUser["role"] })}
                      className="w-full px-4 py-3 border border-dokan-border rounded-lg font-quicksand bg-gray-100 cursor-not-allowed"
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1 font-quicksand">Role is set to "User" by default</p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 border border-dokan-border rounded-lg font-quicksand hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-dokan-dark text-white rounded-lg font-quicksand hover:bg-gray-800 transition-colors"
                    >
                      {editingUser ? "Update User" : "Add User"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
