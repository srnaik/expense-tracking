const SESSION_KEY = "authUser";

export async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  
    const storedUser = sessionStorage.getItem(SESSION_KEY);
   
    if (!storedUser) {
        throw new Error("User is not authenticated. Please log in.");
    }
    const user = JSON.parse(storedUser);
    const headers = new Headers(options.headers || {});
    headers.set("Authorization", `Bearer ${user.token}`);
    options.headers = headers;
    headers.set("Accept", "application/json");

    return fetch(url, {...options,
    headers,
  });
  
}