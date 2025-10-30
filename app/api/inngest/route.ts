import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { extractAndSavePDF, server } from "@/inngest/agent";

// Serve both the Inngest functions and the agent server
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [extractAndSavePDF],
  serve: server, // Add the agent server
});