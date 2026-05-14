let activeModes = [];
function fillSuggestion(text) {

  document.getElementById("userInput").value = text;
}
function toggleMode(button) {

  const mode =
    button.innerText;

  button.classList.toggle("active");

  if (activeModes.includes(mode)) {

    activeModes =
      activeModes.filter(
        item => item !== mode
      );

  } else {

    activeModes.push(mode);
  }
}

function recommendFood() {

  const ideas = [

  "Cheap Korean street food",

  "Hostel-friendly pasta",

  "Quick Mexican rice bowl",

  "Spicy anime-style ramen",

  "Rainy evening comfort food",

  "Cheesy late-night snack",

  "Easy Japanese food for beginners",

  "Street-style loaded fries",

  "One-pan creamy noodles",

  "5-minute spicy snack"

];

  const randomIdea =
    ideas[Math.floor(Math.random() * ideas.length)];

  document.getElementById("userInput").value =
    randomIdea;
}

async function generateRecipe() {

  const input =
    document.getElementById("userInput").value;

  const resultDiv =
    document.getElementById("result");

  resultDiv.innerHTML = `
    <div class="loading">
      Generating your recipe...
    </div>
  `;

  const prompt = `
You are an AI cooking assistant for Indian beginners.

Generate recipes ONLY for the exact food or cuisine requested.

Your job:
- Make foreign dishes easy in Indian kitchens
- Keep instructions beginner friendly
- Use ingredients available in India
- Suggest Indian substitutions
- Explain things simply
- Avoid difficult cooking jargon
- Make cooking feel fun and easy

If user preferences are unclear:
- make reasonable assumptions
- choose beginner-friendly options

Format the response professionally using these exact section titles:

# Dish Name

# Cooking Time

# Estimated Cost

# Spice Level

# Difficulty Level

# Ingredients

# Indian Substitutions

# Step-by-Step Instructions

# Beginner Tips

Keep responses concise and visually clean.
Avoid long paragraphs.
Use bullets wherever possible.
Prioritize readability for impatient users.

Active User Preferences:
${activeModes.join(", ")}

User Request:
${input}
`;

  const apiKey = "AIzaSyC8Qt-Yy86qCsLn8DEzYqTp2j5EkKVNNhk";

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  try {

    const response = await fetch(url, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    const recipe =
      data.candidates[0].content.parts[0].text;

    resultDiv.innerHTML = marked.parse(recipe);

  } catch (error) {

    resultDiv.innerHTML =
      "❌ Something went wrong.";

    console.error(error);
  }
}

document
  .getElementById("userInput")
  .addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

      generateRecipe();
    }
});