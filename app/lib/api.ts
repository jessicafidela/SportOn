export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  console.log("API URL =", process.env.NEXT_PUBLIC_API_URL);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    cache: options?.cache || "no-store", // supaya data real time atau updated
  });

  if (!res.ok) {
    let errorMessage = `Failed to fetch data from ${endpoint}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      console.log(e);
    }

    throw new Error(errorMessage);
  }

  return res.json();
}

export function getImageUrl(path: string) {
  if (path.startsWith("http")) return path; // artinya url udah valid
  return `${process.env.NEXT_PUBLIC_API_ROOT}/${path}`;
}