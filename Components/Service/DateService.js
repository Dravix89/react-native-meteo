export function nowToHHMM() {
  const d = new Date();
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`; // pad pour avoir 2 digits
}
