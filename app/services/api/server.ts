async function autocorrect(text: string) {
  const res = await fetch("https://autocorrect-api-fwsv.onrender.com/correct", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ text })
  });
  return res.json(); // { original: "...", corrected: "..." }
}
export default autocorrect