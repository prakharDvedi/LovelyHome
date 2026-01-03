export default async function quote() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();

    // Update DOM
    document.getElementById("quote").textContent = `"${data.quote}"`;
    document.getElementById("author").textContent = `- ${data.author}`;
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    document.getElementById("quote").textContent = "Failed to load quote.";
  }
}

// Quotable: https://api.quotable.io/random (Allows filtering by tags/authors)
// ZenQuotes: https://zenquotes.io/api/random (Great for valid inspirational quotes)
