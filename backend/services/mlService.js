const ML_BASE_URL = process.env.ML_SERVICE_URL;

export async function predictDiabetes(data) {
  const response = await fetch(`${ML_BASE_URL}/diabetes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function predictParkinson(data) {
  const response = await fetch(`${ML_BASE_URL}/parkinson`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function predictHeart(data) {
  const response = await fetch(`${ML_BASE_URL}/heart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await response.json();
}
