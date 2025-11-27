// DO NOT IMPORT THE OPENAI SDK HERE — IT BREAKS THE BROWSER

export async function generateCaption(data: any) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You generate short, trendy Instagram-style anime fashion captions with emojis and hashtags.",
          },
          {
            role: "user",
            content: `
Category: ${data.category}
Gender: ${data.gender}
Season: ${data.season}
Anime: ${data.animeTitle}
Keywords: ${data.keywords}

Generate a short caption with emojis.
`,
          },
        ],
      }),
    });

    const json = await res.json();

    return json.choices?.[0]?.message?.content ?? "No caption generated";
  } catch (err) {
    console.error("Caption Error:", err);
    return "Error generating caption.";
  }
}

export async function generateProposal(data: any) {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
Write a **formal, professional email** inviting an influencer to collaborate.

Include the following details:
- Influencer name: ${data.influencer}
- Anime theme: ${data.theme}
- Fashion style / product type: ${data.style}

Email Requirements:
- Warm professional tone
- Clear collaboration invitation
- Explain why they were selected
- Describe the anime theme in an exciting way
- Mention the value for the influencer
- Add a clear call-to-action
- Include a placeholder for brand name + contact details
- Make it 2–3 short paragraphs
- Add a subject line at the top
            `,
          },
          {
            role: "user",
            content: `
Influencer: ${data.influencer}
Theme: ${data.theme}
Style: ${data.style}

Write a collaboration proposal email.
            `,
          },
        ],
      }),
    });

    const json = await res.json();
    return json.choices?.[0]?.message?.content ?? "No proposal generated";
  } catch (err) {
    console.error("Proposal Error:", err);
    return "Error generating proposal.";
  }
}
