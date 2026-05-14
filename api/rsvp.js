export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    attending,
    plusOnes,
    guestNames,
    needsHotel,
    hotelCount,
    family,
    arrival,
  } = req.body;

  const fullName = `${firstName} ${lastName}`.trim();
  const isYes = attending === "yes";

  const arrivalLabel = arrival === "car" ? "Mit eigenem Auto" : "Ohne Auto (braucht Shuttle o.ä.)";
  const familyLabel = family === "yes" ? "Ja, mit Familie" : "Nein";
  const hotelLabel =
    needsHotel === "no"
      ? "Nein, kein Hotel nötig"
      : `Ja — ${hotelCount} Zimmer${hotelCount > 1 ? "" : ""}, Familie: ${familyLabel}`;

  const guestList =
    guestNames && guestNames.length > 0
      ? guestNames.map((n, i) => `<li>${i + 2}. Gast: ${n}</li>`).join("")
      : "";

  const html = `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><style>
  body { font-family: Georgia, serif; background: #faf8f5; margin: 0; padding: 0; }
  .wrap { max-width: 560px; margin: 40px auto; background: #fff; border: 1px solid #e8e0d4; padding: 40px; }
  h1 { font-size: 22px; color: #2c1a0e; margin-bottom: 4px; }
  .badge { display: inline-block; padding: 4px 14px; border-radius: 99px; font-size: 13px; font-weight: bold; margin-bottom: 24px; ${isYes ? "background:#d4edda;color:#155724;" : "background:#f8d7da;color:#721c24;"} }
  table { width: 100%; border-collapse: collapse; font-size: 15px; }
  td { padding: 10px 0; border-bottom: 1px solid #f0ebe4; vertical-align: top; }
  td:first-child { color: #7a6552; width: 45%; }
  ul { margin: 4px 0; padding-left: 18px; }
  .footer { margin-top: 32px; font-size: 12px; color: #aaa; text-align: center; }
</style></head>
<body>
<div class="wrap">
  <h1>Neue RSVP-Antwort</h1>
  <p>Izla &amp; Gabriel · 7. November 2026</p>
  <span class="badge">${isYes ? "✓ Zusage" : "✗ Absage"}</span>
  <table>
    <tr><td>Name</td><td><strong>${fullName}</strong></td></tr>
    ${isYes ? `
    <tr><td>Begleitung</td><td>${plusOnes === 0 ? "Alleine" : `${plusOnes} weitere Person${plusOnes > 1 ? "en" : ""}${guestList ? `<ul>${guestList}</ul>` : ""}`}</td></tr>
    <tr><td>Anreise</td><td>${arrivalLabel}</td></tr>
    <tr><td>Hotel</td><td>${hotelLabel}</td></tr>
    ` : ""}
  </table>
  <div class="footer">Automatisch gesendet von der Hochzeitswebsite · gabrielizla.vercel.app</div>
</div>
</body>
</html>`;

  try {
    const [emailResp, sheetResp] = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Hochzeit RSVP <rsvp@gabrielizla.de>",
          to: ["gabmalki@gmail.com", "jakob.baumann12345@gmail.com", "izla_malki@outlook.com"],
          subject: `RSVP: ${fullName} — ${isYes ? "Zusage ✓" : "Absage ✗"}`,
          html,
        }),
      }),
      process.env.SHEET_WEBHOOK_URL
        ? fetch(process.env.SHEET_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              firstName,
              lastName,
              attending: isYes ? "Zusage" : "Absage",
              plusOnes,
              guestNames: guestNames ? guestNames.join(", ") : "",
              arrival: arrival === "car" ? "Mit Auto" : "Ohne Auto",
              needsHotel: needsHotel === "yes" ? "Ja" : "Nein",
              hotelCount: needsHotel === "yes" ? hotelCount : "",
              family: needsHotel === "yes" ? family : "",
            }),
          })
        : Promise.resolve(),
    ]);

    if (!emailResp.ok) {
      const err = await emailResp.text();
      console.error("Resend error:", err);
      return res.status(500).json({ error: "Email konnte nicht gesendet werden." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Serverfehler." });
  }
}
