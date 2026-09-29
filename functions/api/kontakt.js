// Cloudflare Pages Function: obsługa formularza kontaktowego
// Adres: https://przepuklinabezsiatki.pl/api/kontakt  (metoda POST)
//
// Wymagane zmienne środowiskowe (Cloudflare → Workers & Pages → projekt → Settings → Variables and Secrets):
//   RESEND_API_KEY  – klucz z resend.com (typ: Secret)
//   MAIL_TO         – adres, na który mają przychodzić zapytania (np. s.dabrowiecki@outlook.com)
//   MAIL_FROM       – nadawca; bez weryfikacji domeny w Resend: "Formularz <onboarding@resend.dev>"
//                     po weryfikacji domeny: "Formularz <formularz@przepuklinabezsiatki.pl>"

const DZIEKUJEMY = "/dziekujemy/";

export async function onRequestPost({ request, env }) {
  let dane;
  try {
    dane = Object.fromEntries(await request.formData());
  } catch {
    return odpowiedz(request, false, "Nieprawidłowe dane formularza.");
  }

  // Ochrona przed botami: ukryte pole musi być puste
  if (dane.www) {
    return odpowiedz(request, true); // udajemy sukces, nic nie wysyłamy
  }

  const imie = (dane.imie || "").trim().slice(0, 100);
  const telefon = (dane.telefon || "").trim().slice(0, 30);
  const email = (dane.email || "").trim().slice(0, 120);
  const wiadomosc = (dane.wiadomosc || "").trim().slice(0, 3000);
  const strona = (dane.strona || "").trim().slice(0, 200);

  if (!imie || (!telefon && !email)) {
    return odpowiedz(request, false, "Proszę podać imię oraz telefon lub e-mail.");
  }
  if (!dane.zgoda) {
    return odpowiedz(request, false, "Proszę zaznaczyć zgodę na przetwarzanie danych.");
  }

  const tresc =
    `Nowe zapytanie ze strony przepuklinabezsiatki.pl\n\n` +
    `Imię i nazwisko: ${imie}\n` +
    `Telefon: ${telefon || "-"}\n` +
    `E-mail: ${email || "-"}\n` +
    `Strona: ${strona || "-"}\n\n` +
    `Wiadomość:\n${wiadomosc || "-"}\n`;

  const wysylka = {
    from: env.MAIL_FROM || "Formularz <onboarding@resend.dev>",
    to: [env.MAIL_TO],
    subject: `Zapytanie ze strony: ${imie}`,
    text: tresc,
  };
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    wysylka.reply_to = email; // "Odpowiedz" w poczcie trafi do pacjenta
  }

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wysylka),
  });

  if (!r.ok) {
    console.log("Resend error", r.status, await r.text());
    return odpowiedz(request, false, "Nie udało się wysłać wiadomości. Proszę zadzwonić: 603 751 335.");
  }
  return odpowiedz(request, true);
}

// Zwykły formularz → przekierowanie; wysyłka przez JavaScript → JSON
function odpowiedz(request, ok, blad = "") {
  const chceJson = (request.headers.get("Accept") || "").includes("application/json");
  if (chceJson) {
    return new Response(JSON.stringify({ ok, blad }), {
      status: ok ? 200 : 400,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
  if (ok) {
    return Response.redirect(new URL(DZIEKUJEMY, request.url).toString(), 303);
  }
  return new Response(
    `<!doctype html><meta charset="utf-8"><title>Błąd</title>` +
      `<p style="font:18px sans-serif;margin:40px">${blad}</p>` +
      `<p style="font:18px sans-serif;margin:40px"><a href="javascript:history.back()">← Wróć do formularza</a></p>`,
    { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
