export default async function quote() {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();

    document.getElementById("quote").textContent = `"${data.quote}"`;
    document.getElementById("author").textContent = `- ${data.author}`;
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    document.getElementById("quote").textContent = "Failed to load quote.";
  }
}
