import { Inngest } from "inngest";
import { config } from "@/lib/config";

// Create a client to send and receive events
export const inngest = new Inngest({ id: config.inngest.clientId });