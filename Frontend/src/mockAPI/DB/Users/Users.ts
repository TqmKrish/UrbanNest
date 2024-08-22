export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: "Buyer" | "Seller" | "Agent" | "admin";
  contactNumber: string;
  address: string;
  profilePicture: string;
  verified?: boolean;
  lastLogin?: Date;
  preferredContactMethod?: "email" | "phone";
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  permissions?: string[];
  token?: string;
  tokenExpiresAt?: Date;
  status?: "active" | "inactive";
  assignedTasks?: string[];
  notificationsEnabled?: boolean;
  department?: string;
  managedPropertiesCount?: number;
  region?: string;
  socialLinks: { facebook: string; linkedin: string };
}

export const demoUsers: any[] = [
  {
    id: "user-1001",
    fullName: "John Doe",
    username: "john_doe",
    email: "buyer1@gmail.com",
    role: "Buyer",
    contactNumber: "+1234567890",
    address: "123 Elm Street, Springfield, IL, USA",
    profilePicture: "https://example.com/profile-pic1.jpg",
    verified: true,
    lastLogin: new Date("2024-07-22T12:00:00Z"),
    preferredContactMethod: "email",
    bio: "Looking for a new home in the city.",
    createdAt: new Date("2024-01-15T10:00:00Z"),
    updatedAt: new Date("2024-07-22T12:00:00Z"),
    password: "12345678", // Added password field
  },
  {
    id: "user-1002",
    fullName: "Jane Smith",
    username: "jane_smith",
    email: "seller1@gmail.com",
    role: "Seller",
    contactNumber: "+1234567891",
    address: "456 Oak Avenue, Rivertown, KY, USA",
    profilePicture: "https://example.com/profile-pic2.jpg",
    verified: true,
    lastLogin: new Date("2024-07-21T15:30:00Z"),
    preferredContactMethod: "phone",
    bio: "Selling properties in the suburbs.",
    createdAt: new Date("2024-02-10T08:00:00Z"),
    updatedAt: new Date("2024-07-21T15:30:00Z"),
    password: "12345678", // Added password field
  },
  {
    id: "user-1003",
    fullName: "Alice Brown",
    username: "alice_brown",
    email: "agent1@gmail.com",
    role: "Agent",
    contactNumber: "+1234567892",
    address: "789 Pine Road, Northside, WA, USA",
    profilePicture: "https://example.com/profile-pic3.jpg",
    verified: false,
    lastLogin: new Date("2024-07-20T09:00:00Z"),
    preferredContactMethod: "email",
    bio: "Specializing in commercial real estate.",
    createdAt: new Date("2024-03-05T11:00:00Z"),
    updatedAt: new Date("2024-07-20T09:00:00Z"),
    password: "12345678", // Added password field
  },
  {
    id: "user-1004",
    fullName: "Bob Johnson",
    username: "bob_johnson",
    email: "buyer2@gmail.com",
    role: "Buyer",
    contactNumber: "+1234567893",
    address: "101 Maple Street, Greenfield, IL, USA",
    profilePicture: "https://example.com/profile-pic4.jpg",
    verified: true,
    lastLogin: new Date("2024-07-19T14:00:00Z"),
    preferredContactMethod: "phone",
    bio: "Searching for investment properties.",
    createdAt: new Date("2024-04-01T10:00:00Z"),
    updatedAt: new Date("2024-07-19T14:00:00Z"),
    password: "12345678", // Added password field
  },
  {
    id: "user-1005",
    fullName: "Carol Davis",
    username: "carol_davis",
    email: "agent2@gmail.com",
    role: "Agent",
    contactNumber: "+1234567894",
    address: "202 Birch Lane, Downtown, TX, USA",
    profilePicture: "https://example.com/profile-pic5.jpg",
    verified: true,
    lastLogin: new Date("2024-07-22T08:00:00Z"),
    preferredContactMethod: "email",
    bio: "Expert in residential properties.",
    createdAt: new Date("2024-05-15T09:00:00Z"),
    updatedAt: new Date("2024-07-22T08:00:00Z"),
    password: "12345678", // Added password field
  },
  {
    id: "admin-5678",
    fullName: "Alex Johnson",
    username: "realestate_admin",
    email: "admin1@gmail.com",
    role: "admin",
    permissions: [
      "view_properties",
      "edit_properties",
      "delete_properties",
      "view_users",
      "edit_users",
      "delete_users",
      "manage_listings",
      "manage_agents",
      "view_reports",
      "edit_settings",
    ],
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    tokenExpiresAt: new Date("2024-07-22T22:00:00Z"),
    profilePicture: "https://example.com/admin-profile.jpg",
    contactNumber: "+1234567890",
    lastLogin: new Date("2024-07-21T17:00:00Z"),
    status: "active",
    bio: "Experienced admin with a background in property management and real estate operations.",
    assignedTasks: [
      "Overseeing property audits",
      "Managing user access rights",
    ],
    notificationsEnabled: true,
    department: "Property Management",
    createdAt: new Date("2024-02-01T09:30:00Z"),
    updatedAt: new Date("2024-07-22T09:30:00Z"),
    managedPropertiesCount: 120,
    region: "North Region",
    password: "12345678", // Added password field
  },
  {
    id: "admin-5679",
    fullName: "Jamie Taylor",
    username: "jamie_taylor",
    email: "admin2@gmail.com",
    role: "admin",
    permissions: [
      "view_properties",
      "edit_properties",
      "delete_properties",
      "view_users",
      "edit_users",
      "delete_users",
      "manage_listings",
      "manage_agents",
      "view_reports",
      "edit_settings",
    ],
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5d",
    tokenExpiresAt: new Date("2024-08-01T22:00:00Z"),
    profilePicture: "https://example.com/admin-profile2.jpg",
    contactNumber: "+1234567891",
    lastLogin: new Date("2024-07-20T16:00:00Z"),
    status: "active",
    bio: "admin with extensive experience in user management and system administration.",
    assignedTasks: ["System maintenance", "User account management"],
    notificationsEnabled: true,
    department: "IT administration",
    createdAt: new Date("2024-03-01T10:00:00Z"),
    updatedAt: new Date("2024-07-20T16:00:00Z"),
    managedPropertiesCount: 95,
    region: "South Region",
    password: "12345678", // Added password field
  },
  {
    id: "admin-5680",
    fullName: "Taylor Morgan",
    username: "taylor_morgan",
    email: "admin3@gmail.com",
    role: "admin",
    permissions: [
      "view_properties",
      "edit_properties",
      "delete_properties",
      "view_users",
      "edit_users",
      "delete_users",
      "manage_listings",
      "manage_agents",
      "view_reports",
      "edit_settings",
    ],
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5e",
    tokenExpiresAt: new Date("2024-09-01T22:00:00Z"),
    profilePicture: "https://example.com/admin-profile3.jpg",
    contactNumber: "+1234567892",
    lastLogin: new Date("2024-07-19T14:00:00Z"),
    status: "active",
    bio: "admin focused on strategic planning and execution.",
    assignedTasks: ["Strategic planning", "Team management"],
    notificationsEnabled: true,
    department: "Strategic Planning",
    createdAt: new Date("2024-04-01T11:00:00Z"),
    updatedAt: new Date("2024-07-19T14:00:00Z"),
    managedPropertiesCount: 85,
    region: "East Region",
    password: "12345678", // Added password field
  },
  {
    id: "admin-5681",
    fullName: "Jordan Lee",
    username: "jordan_lee",
    email: "admin4@gmail.com",
    role: "admin",
    permissions: [
      "view_properties",
      "edit_properties",
      "delete_properties",
      "view_users",
      "edit_users",
      "delete_users",
      "manage_listings",
      "manage_agents",
      "view_reports",
      "edit_settings",
    ],
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5f",
    tokenExpiresAt: new Date("2024-07-30T22:00:00Z"),
    profilePicture: "https://example.com/admin-profile4.jpg",
    contactNumber: "+1234567893",
    lastLogin: new Date("2024-07-18T11:00:00Z"),
    status: "active",
    bio: "Experienced admin with a strong background in real estate systems.",
    assignedTasks: ["System upgrades", "User support"],
    notificationsEnabled: true,
    department: "System administration",
    createdAt: new Date("2024-05-01T12:00:00Z"),
    updatedAt: new Date("2024-07-18T11:00:00Z"),
    managedPropertiesCount: 110,
    region: "West Region",
    password: "12345678", // Added password field
  },
  {
    id: "admin-5682",
    fullName: "Morgan White",
    username: "morgan_white",
    email: "admin5@gmail.com",
    role: "admin",
    permissions: [
      "view_properties",
      "edit_properties",
      "delete_properties",
      "view_users",
      "edit_users",
      "delete_users",
      "manage_listings",
      "manage_agents",
      "view_reports",
      "edit_settings",
    ],
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5g",
    tokenExpiresAt: new Date("2024-08-15T22:00:00Z"),
    profilePicture: "https://example.com/admin-profile5.jpg",
    contactNumber: "+1234567894",
    lastLogin: new Date("2024-07-17T10:00:00Z"),
    status: "active",
    bio: "Dedicated admin focused on improving system efficiency.",
    assignedTasks: ["System optimization", "Performance monitoring"],
    notificationsEnabled: true,
    department: "Operations",
    createdAt: new Date("2024-06-01T13:00:00Z"),
    updatedAt: new Date("2024-07-17T10:00:00Z"),
    managedPropertiesCount: 75,
    region: "Central Region",
    password: "12345678", // Added password field
  },
];
