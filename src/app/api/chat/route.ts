import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://rajseba-api-production.up.railway.app";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request payload. 'messages' array is required." },
        { status: 400 }
      );
    }

    // 1. Fetch Categories and Services from the Backend API to build fresh context
    let categoriesList = [];
    let servicesList = [];

    try {
      const [categoriesRes, servicesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/category`, { next: { revalidate: 300 } }), // Cache for 5 mins
        fetch(`${API_BASE_URL}/services/public`, { next: { revalidate: 300 } }),
      ]);

      if (categoriesRes.ok) {
        const catData = await categoriesRes.json();
        categoriesList = catData.data || catData || [];
      }
      if (servicesRes.ok) {
        const servData = await servicesRes.json();
        servicesList = servData.data || servData || [];
      }
    } catch (fetchError) {
      console.error("Failed to fetch live context from Rajseba API:", fetchError);
    }

    // 2. Build a simplified, light-weight catalog representation for AI context
    const simplifiedContext = categoriesList.map((cat: any) => {
      const catServices = servicesList.filter(
        (s: any) => s.category?.id === cat.id || s.category_id === cat.id
      );
      return {
        categoryName: cat.name,
        services: catServices.map((s: any) => ({
          serviceName: s.name,
          description: s.description || "",
          vendor: s.vendor ? { name: s.vendor.name } : null,
          nestedServices:
            s.nestedServices?.map((ns: any) => ({
              name: ns.name,
              price: ns.starting_price || ns.price,
              description: ns.description || "",
            })) || [],
        })),
      };
    });

    // 3. Define System Instruction prompt
    const systemPrompt = `You are the official Rajseba AI Assistant, an intelligent customer support agent for Rajseba (www.rajseba.com). 
Rajseba is Bangladesh's leading premium home service marketplace. 
Our official hotline number is +8801335106726.

Below is the live catalog of our categories, services, nested sub-services, and the vendors providing them:
${JSON.stringify(simplifiedContext, null, 2)}

Instructions:
1. Always act as a polite, friendly, and helpful support agent.
2. If a customer asks about categories, list the categories from the catalog.
3. If they ask about services under a category, describe the services and list their nested sub-services and prices from the catalog.
4. If they ask who provides a service, mention the vendor name from the catalog.
5. Answer in English or Bengali depending on the user's input language. Keep responses concise (3-4 sentences maximum).
6. If the user wants to book, tell them to browse the website, choose a service, click "View Options", then "Book Now".`;

    // 4. Retrieve API Key from environment variables
    const openrouterKey = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;

    if (!openrouterKey || openrouterKey.includes("YOUR_FREE_GEMINI_API_KEY_HERE")) {
      console.warn("OpenRouter/Gemini API key is not configured.");
      return NextResponse.json({
        reply: "Hello! I am your Rajseba Assistant. Currently, my AI brain is not fully set up by the administrator. However, you can book AC Checkup, Plumbing, and Cleaning services from our Services menu, or call our hotline: +8801335106726.",
      });
    }

    // 5. Format message history for OpenRouter (OpenAI chat/completions format)
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text || m.content || "",
      }))
    ];

    // 6. Call OpenRouter API using google/gemini-2.5-flash as the primary fast/cheap model
    const openrouterUrl = "https://openrouter.ai/api/v1/chat/completions";
    
    let response = await fetch(openrouterUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openrouterKey}`,
        "HTTP-Referer": "https://rajseba.com",
        "X-Title": "Rajseba Support Chatbot",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: formattedMessages,
        temperature: 0.7,
      }),
    });

    // If Google Gemini fails or is rate-limited on OpenRouter, fallback to openai/gpt-4o-mini
    if (!response.ok) {
      console.warn("OpenRouter Gemini-2.5-flash call failed, trying fallback openai/gpt-4o-mini...");
      response = await fetch(openrouterUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openrouterKey}`,
          "HTTP-Referer": "https://rajseba.com",
          "X-Title": "Rajseba Support Chatbot",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: formattedMessages,
          temperature: 0.7,
        }),
      });
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter API returned error:", errorData);
      throw new Error("OpenRouter API calls failed");
    }

    const data = await response.json();
    const replyText =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't understand that. Please try again or call our hotline: +8801335106726.";

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error("Error in chat API route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
