
import React, { useState } from "react";
import { PageTemplate } from "@/components/shared/PageTemplate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types";
import { SearchAndFilter } from "@/components/shared/SearchAndFilter";
import { Plus, Edit, Trash2, UserPlus, Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

// Mock users data
const mockUsers = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "therapist@ablelyf.com",
    role: "therapist",
    status: "active",
  },
  {
    id: "2",
    name: "Michael Davis",
    email: "caregiver@ablelyf.com",
    role: "caregiver",
    status: "active",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "teacher@ablelyf.com",
    role: "teacher",
    status: "inactive",
  },
  {
    id: "4",
    name: "John Smith",
    email: "hr@ablelyf.com",
    role: "hr",
    status: "active",
  },
  {
    id: "5",
    name: "Admin User",
    email: "admin@ablelyf.com",
    role: "admin",
    status: "active",
  },
];

// Form schema
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["therapist", "caregiver", "admin", "teacher", "hr"] as const),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "therapist",
      password: "",
    },
  });

  const handleSearch = (term: string) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleFilter = (filters: Record<string, string>) => {
    let filtered = [...users];

    if (filters.role) {
      filtered = filtered.filter((user) => user.role === filters.role);
    }

    if (filters.status) {
      filtered = filtered.filter((user) => user.status === filters.status);
    }

    setFilteredUsers(filtered);
  };

  const handleAddUser = (data: UserFormValues) => {
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name: data.name,
      email: data.email,
      role: data.role,
      status: "active",
    };

    setUsers([...users, newUser]);
    setFilteredUsers([...users, newUser]);
    setIsAddUserOpen(false);
    form.reset();

    toast({
      title: "User created",
      description: `${data.name} has been added as a ${data.role}`,
    });
  };

  const handleEditUser = (data: UserFormValues) => {
    if (!selectedUser) return;

    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id
        ? {
            ...user,
            name: data.name,
            email: data.email,
            role: data.role,
          }
        : user
    );

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setIsEditUserOpen(false);
    setSelectedUser(null);
    form.reset();

    toast({
      title: "User updated",
      description: `${data.name}'s details have been updated`,
    });
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setIsDeleteUserOpen(false);
    setSelectedUser(null);

    toast({
      title: "User deleted",
      description: `${selectedUser.name} has been removed from the system`,
    });
  };

  const openEditDialog = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    });
    setIsEditUserOpen(true);
  };

  const openDeleteDialog = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user);
    setIsDeleteUserOpen(true);
  };

  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? {
            ...user,
            status: user.status === "active" ? "inactive" : "active",
          }
        : user
    );

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);

    const user = updatedUsers.find((u) => u.id === userId);
    toast({
      title: `User ${user?.status === "active" ? "activated" : "deactivated"}`,
      description: `${user?.name} has been ${
        user?.status === "active" ? "activated" : "deactivated"
      }`,
    });
  };

  const filterOptions = [
    {
      id: "role",
      label: "Role",
      options: [
        { value: "therapist", label: "Therapist" },
        { value: "caregiver", label: "Caregiver" },
        { value: "teacher", label: "Teacher" },
        { value: "hr", label: "HR" },
        { value: "admin", label: "Admin" },
      ],
    },
    {
      id: "status",
      label: "Status",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
  ];

  return (
    <PageTemplate title="User Management" description="Manage system users and their access">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <SearchAndFilter
            onSearch={handleSearch}
            searchPlaceholder="Search users..."
            filterOptions={filterOptions}
            onFilter={handleFilter}
          />
          
          <Button onClick={() => setIsAddUserOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>System Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 capitalize">
                          {user.role}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            {user.status === "active" ? (
                              <X className="h-4 w-4 text-red-500" />
                            ) : (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(user)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with role-based access.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="therapist">Therapist</SelectItem>
                        <SelectItem value="caregiver">Caregiver</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Set a password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddUserOpen(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Create User</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user details and role-based access.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditUser)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="therapist">Therapist</SelectItem>
                        <SelectItem value="caregiver">Caregiver</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditUserOpen(false);
                    setSelectedUser(null);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Update User</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedUser && (
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Name:</span> {selectedUser.name}
                </div>
                <div>
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedUser.email}
                </div>
                <div>
                  <span className="font-semibold">Role:</span>{" "}
                  <span className="capitalize">{selectedUser.role}</span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsDeleteUserOpen(false);
                setSelectedUser(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteUser}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTemplate>
  );
};

export default UserManagement;
