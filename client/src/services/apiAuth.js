const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function loginApi(email, password) {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  if (data.success === false) throw new Error(data.message);

  return data;
}
