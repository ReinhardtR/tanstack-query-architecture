export async function setAsyncTimeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
