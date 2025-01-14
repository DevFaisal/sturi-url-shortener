import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    shortID: {
      type: String,
      required: [true, "Short ID is required"],
      unique: true,
      trim: true,
    },
    redirectedURL: {
      type: String,
      required: [true, "Redirected URL is required"],
      trim: true,
      validate: {
        validator: function (value) {
          try {
            new URL(value);
            return true;
          } catch {
            return false;
          }
        },
        message: "Invalid URL format",
      },
    },

    analytics: [
      {
        timestamp: {
          type: Date,
          default: Date.now,
          required: true,
        },
        ip: {
          type: String,
          required: [true, "IP address is required"],
          trim: true,
          validate: {
            validator: function (value) {
              const ipRegex =
                /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
              return ipRegex.test(value);
            },
            message: "Invalid IP address",
          },
        },
        os: {
          type: String,
          required: [true, "Operating system information is required"],
          trim: true,
        },
        uniqueClicks: {
          type: Number,
          default: 0,
          min: [0, "Unique clicks cannot be negative"],
        },
      },
    ],
    // Device-specific analytics
    deviceType: [
      {
        deviceName: {
          type: String,
          required: [true, "Device name is required"],
          trim: true,
        },
        // uniqueClicks: {
        //   type: Number,
        //   default: 0,
        //   min: [0, "Unique clicks cannot be negative"],
        // },
        // uniqueUsers: {
        //   type: [String], // Array of unique user identifiers (e.g., user IDs or hashed info)
        //   default: [],
        // },
      },
    ],
  },
  {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  }
);

export default mongoose.models.URL || mongoose.model("URL", urlSchema);
