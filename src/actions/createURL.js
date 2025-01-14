"use server";

import connectToDatabase from "@/db/connection";
import ShortUniqueId from "short-unique-id";
import URL from "@/models/url";




export async function createURL({ url }) {
  if (!url) {
    return {
      error: "URL is required or invalid",
    };
  }

  try {
    await connectToDatabase();
    const { randomUUID } = new ShortUniqueId({ length: 4 });
    const shortID = randomUUID();
    const event = await URL.create({
      shortID: shortID,
      redirectedURL: url,
    });
    if (event) {
      return {
        success: true,
        data: event.shortID,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
}
