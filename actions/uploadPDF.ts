"use server";

import { api } from "@/convex/_generated/api";
import convex from "@/lib/convexClient";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";
import { getFileDownloadUrl } from "./getFileDownloadUrl";
import { inngest } from "@/inngest/client";
import Events from "@/inngest/constants";

export async function uploadPDF(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    if (
      !file.type.includes("pdf") &&
      !file.name.toLocaleLowerCase().endsWith(".pdf")
    ) {
      return { success: false, error: "Only PDF files are allowed" };
    }

    //Get upload URL from Convex
    const uploadUrl = await convex.mutation(
      api.documents.generateUploadUrl,
      {},
    );
    //Convert the file into arrayBuffer to fetch the API
    const arrayBuffer = await file.arrayBuffer();
    //Upload the file to convex storage
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: new Uint8Array(arrayBuffer),
    });

    if (!uploadResponse.ok) {
      throw new Error(
        `Failed to uploadd the file: ${uploadResponse.statusText}`,
      );
    }
    //Get Storage ID from the response
    const { storageId } = await uploadResponse.json();

    //Add document to the database
    const documentId = await convex.mutation(api.documents.storeDocument, {
      userId: user.id,
      fileId: storageId,
      fileName: file.name,
      size: file.size,
      mimeType: file.type,
    });

    //Generate file url
    const fileUrl = await getFileDownloadUrl(storageId);

    // Trigger Inngest flow for student success processing
    console.log("🚀 Triggering Inngest event:", Events.EXTRACT_DATA_FROM_PDF_AND_SAVE_TO_DATABASE);
    const inngestResult = await inngest.send({
      name: Events.EXTRACT_DATA_FROM_PDF_AND_SAVE_TO_DATABASE,
      data: {
        // Document processing details
        url: fileUrl.downloadUrl,
        documentId,
        fileName: file.name,
        userId: user.id,

        // Student success context
        processingGoal: "Transform academic content into industry-ready skills",
        expectedOutcomes: [
          "Extract key academic topics from uploaded document",
          "Generate real-world industry tasks for each topic",
          "Create practical exercises students can build for portfolios",
          "Provide interview questions to prepare students for employment",
          "Bridge the gap between university theory and professional practice",
        ],

        // Processing instructions for agents
        instructions: {
          documentScanning:
            "Identify academic module (CS, Math, Accounting, etc.) and extract key learning topics",
          industryMapping:
            "For each topic, create hands-on projects that demonstrate industry application",
          tutoring:
            "Provide clear explanations with real-world examples and interview preparation",
          storage:
            "Save all processed data to help students track their learning journey",
        },

        // Student context
        studentContext: {
          goal: "Graduate with practical skills and industry experience",
          needs: [
            "Real-world application of academic concepts",
            "Portfolio projects",
            "Interview preparation",
            "Industry readiness",
          ],
          outcome: "Successful transition from university to employment",
        },
      },
    });

    console.log("✅ Inngest event sent successfully:", inngestResult);

    return {
      success: true,
      data: {
        documentId,
        fileName: file.name,
        inngestEventId: inngestResult.ids[0], // Include the event ID for tracking
      },
    };
  } catch (e) {
    console.error("Server action upload error:", e);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
