// Quick test script to send an Inngest event
const { Inngest } = require("inngest");

const inngest = new Inngest({ id: "epsionyx" });

async function testEvent() {
  try {
    console.log("🧪 Sending test event...");
    
    const result = await inngest.send({
      name: "extract_data_from_pdf_and_save_to_database",
      data: {
        url: "https://example.com/test.pdf",
        documentId: "test-123",
        fileName: "Test Document",
        userId: "test-user"
      }
    });
    
    console.log("✅ Event sent successfully:", result);
  } catch (error) {
    console.error("❌ Error sending event:", error);
  }
}

testEvent();