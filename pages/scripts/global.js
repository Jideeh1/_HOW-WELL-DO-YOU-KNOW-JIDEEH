var コンソルメセージ = `
If you're here to scrutinize the logic of my code, reconsider before your head stars hurting.\n
It'd be a big mistake trying to read my HTML and Javascript. The opposite can be said about my css however.\n
I actually encourage you to go ahead and check my stylings, maybe you'll learn something new. Visit sources to see.\n
Seriously though, if you just want to see some JS functions or see how I styled my elements, this project is an open repository in my github.\n
find it on: https://github.com/Jideeh\n
Just don't start complaining when you see how ass I code. ーｗ－\n
Yours Truly,\nJideeh\n\n
`

console.log(コンソルメセージ);

(async function () {
  const STATUS_URL = "https://api.lanyard.rest/v1/users/563051292251914259";
  const statusEl = document.getElementById("status");

  function applyPresence(presence) {
    const outer = {
        online: "#43a25a",
        idle: "#ca9654",
        dnd: "#cb363e",
        offline: "#82838b"
    }[presence] ?? "#82838b";

    statusEl.style.backgroundColor = outer;


    if (presence === "dnd") {
      statusEl.style.setProperty("--before-width", ".6cqw");
      statusEl.style.setProperty("--before-height", ".3cqw");
      statusEl.style.setProperty("--before-bg", "#1a160e");
      statusEl.style.setProperty("--before-radius", ".6cqw");
    } else if (presence === "online") {
      statusEl.style.setProperty("--before-width", ".3cqw");
      statusEl.style.setProperty("--before-height", ".3cqw");
      statusEl.style.setProperty("--before-bg", "transparent");
      statusEl.style.setProperty("--before-radius", "100%");
    } else if (presence === "idle" || presence === "offline") {
      statusEl.style.setProperty("--before-width", ".3cqw");
      statusEl.style.setProperty("--before-height", ".3cqw");
      statusEl.style.setProperty("--before-bg", "#1a160e");
      statusEl.style.setProperty("--before-radius", "100%");
    } else {
      statusEl.style.setProperty("--before-width", ".3cqw");
      statusEl.style.setProperty("--before-height", ".3cqw");
      statusEl.style.setProperty("--before-bg", "transparent");
      statusEl.style.setProperty("--before-radius", "100%");
    }
  }

  async function updateStatus() {
    try {
      const res = await fetch(STATUS_URL, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      const presence = json?.data?.discord_status;
      applyPresence(presence);
    } catch (err) {
      console.error("Failed to fetch presence:", err);
      applyPresence("offline");
    }
  }

  updateStatus();
  setInterval(updateStatus, 1000);
})();

