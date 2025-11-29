import { ChatMessage } from "@/types";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface GroqMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const SYSTEM_PROMPT = `You are an expert AI assistant for home renovation and property improvement. 
You help homeowners make smart decisions about home improvements by:
1. Providing ROI analysis and value projections
2. Recommending cost-effective improvements based on priorities
3. Suggesting seasonal timing for projects
4. Connecting homeowners with contractor information
5. Answering questions about home improvement trends and best practices

Keep responses concise (2-3 sentences), practical, and focused on ROI and value.
If the user asks about something unrelated to home improvement, politely redirect them back to home improvement topics.`;

export const sendMessageToGroq = async (
  userMessage: string,
  previousMessages: ChatMessage[] = []
): Promise<string> => {
  try {
    // Check if API key is configured
    if (!GROQ_API_KEY || GROQ_API_KEY === "your_groq_api_key_here") {
      // Fallback to local responses if API key not configured
      return getLocalAIResponse(userMessage);
    }

    // Prepare messages for Groq API
    const messages: GroqMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...previousMessages.map((msg) => ({
        role: (msg.role === "user" ? "user" : "assistant") as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: userMessage },
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: messages,
        temperature: 0.7,
        max_tokens: 256,
      }),
    });

    if (!response.ok) {
      console.error(`Groq API error: ${response.status}`);
      return getLocalAIResponse(userMessage);
    }

    const data = await response.json();
    return (
      data.choices[0]?.message?.content ||
      "I apologize, but I couldn't process your request. Please try again."
    );
  } catch (error) {
    console.error("Error calling Groq API:", error);
    // Fallback to local responses on error
    return getLocalAIResponse(userMessage);
  }
};

// Local AI responses fallback when API is not configured
const getLocalAIResponse = (userMessage: string): string => {
  const lowercaseMessage = userMessage.toLowerCase();

  // Kitchen improvements
  if (
    lowercaseMessage.includes("kitchen") ||
    lowercaseMessage.includes("remodel")
  ) {
    return "Kitchen remodels are excellent investments! They typically offer 70-80% ROI. Focus on quality cabinets, countertops, and modern appliances. Budget $25,000-$35,000 for a mid-range remodel that will significantly boost your home's value.";
  }

  // Bathroom improvements
  if (
    lowercaseMessage.includes("bathroom") ||
    lowercaseMessage.includes("restroom")
  ) {
    return "Bathroom renovations are smart investments with 65% average ROI. Modern fixtures, tile work, and better lighting make a big impact. A full bathroom refresh typically costs $15,000-$20,000 and takes 4-6 weeks.";
  }

  // Energy efficiency
  if (
    lowercaseMessage.includes("energy") ||
    lowercaseMessage.includes("window") ||
    lowercaseMessage.includes("insulation")
  ) {
    return "Energy-efficient upgrades are fantastic long-term investments! New windows can provide 72% ROI and reduce heating/cooling costs. Expect $8,000-$12,000 for a full home window replacement with 2-3 week timeline.";
  }

  // Landscaping
  if (
    lowercaseMessage.includes("landscape") ||
    lowercaseMessage.includes("curb appeal") ||
    lowercaseMessage.includes("outdoor")
  ) {
    return "Landscaping improvements offer excellent curb appeal and 85% ROI! Quality landscaping costs $5,000-$8,000 and takes 2-4 weeks. It's one of the best ways to make a first impression and attract buyers if you ever sell.";
  }

  // Roofing
  if (lowercaseMessage.includes("roof")) {
    return "A new roof is a critical investment for home protection. Quality roofing costs $15,000-$25,000 but offers excellent durability and increases home value. Always hire licensed contractors and get multiple quotes.";
  }

  // Budget questions
  if (lowercaseMessage.includes("budget") || lowercaseMessage.includes("cost")) {
    return "Budget planning is crucial! I recommend allocating 1-3% of your home's value annually for maintenance and improvements. Prioritize projects by ROI and urgency (safety issues first, value-adding improvements second).";
  }

  // Timeline questions
  if (
    lowercaseMessage.includes("how long") ||
    lowercaseMessage.includes("timeline") ||
    lowercaseMessage.includes("take")
  ) {
    return "Project timelines vary by complexity. Most kitchen remodels take 8-12 weeks, bathrooms 4-6 weeks. Spring and fall are ideal seasons for most projects. Always factor in permits and potential delays.";
  }

  // Contractor questions
  if (
    lowercaseMessage.includes("contractor") ||
    lowercaseMessage.includes("hire") ||
    lowercaseMessage.includes("specialist")
  ) {
    return "When hiring contractors, always check references, verify licensing, and get detailed written quotes from at least 3 contractors. Our verified contractor network can help you find specialists in your area with proven track records.";
  }

  // Default response
  return "Great question about home improvements! I'd be happy to help. Tell me more about the specific improvements you're considering - whether it's kitchens, bathrooms, energy efficiency, or landscaping - and I can provide detailed ROI analysis and recommendations.";
};
