// List of allowed frontend URLs
const allowedOrigins = [
  "http://localhost:3000", // Add your allowed frontend URLs here
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow requests with no origin (like mobile apps or server-to-server requests)
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

module.exports = { corsOptions };
