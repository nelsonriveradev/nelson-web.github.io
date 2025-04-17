export const handleCheckout = async (
  packageType: "essentials" | "media" | "premium"
) => {
  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ packageType }),
  });
  const data = await res.json();
  if (data.url) {
    window.location.href = data.url; // Redirige al checkout de Stripe
  } else {
    alert("Error al iniciar el pago: " + data.error);
  }
};
