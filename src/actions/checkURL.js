"use server";
import connectToDatabase from "@/db/connection";
import URL from "@/models/url";
import z from "zod";

const deviceSchema = z.object({
  url: z.string().min(3, { message: "URL must be more than 3 characters" }),
  client: z.object({
    type: z.string(),
    name: z.string(),
  }),
  os: z.object({
    name: z.string(),
    version: z.string(),
  }),
  device: z.object({
    type: z.string(),
    brand: z.string(),
  }),
  ip: z.string().refine(
    (ip) =>
      /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) || // IPv4 validation
      /^[a-fA-F0-9:]+$/.test(ip), // IPv6 validation
    { message: "Invalid IP address" }
  ),
});

export async function checkURL({ url, data }) {
  const { client, os, device, ip } = data;

  const validationResult = deviceSchema.safeParse({ url, ...data });
  if (!validationResult.success) {
    console.error("Validation failed:", validationResult.error);
    return {
      success: false,
      error: "Invalid input data",
    };
  }

  // Connect to the database
  await connectToDatabase();

  // Find the URL document to check for existing IP
  const existingURL = await URL.findOne({ shortID: url });

  if (!existingURL) {
    return {
      success: false,
      error: "URL not found",
    };
  }

  // Check if the IP already exists in analytics
  const ipExists = existingURL.analytics.some((entry) => entry.ip === ip);

  if (!ipExists) {
    // IP is new, add analytics and increment unique clicks
    const res = await URL.findOneAndUpdate(
      { shortID: url },
      {
        $push: {
          analytics: {
            timestamp: new Date(),
            ip: ip,
            os: os.name,
            uniqueClicks: 1,
          },
        },
      },
      { new: true }
    );

    return {
      success: true,
      path: res.redirectedURL,
    };
  }

  return {
    success: true,
    path: existingURL.redirectedURL,
    message: "IP already exists; unique click not counted.",
  };
}
