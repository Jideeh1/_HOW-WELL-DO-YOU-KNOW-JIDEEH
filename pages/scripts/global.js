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

const burstOne = `
   <span>I</span> have this favorite flower, one that holds a special place in my heart. I've always dreamed of this flower to endure a long life until mine gave out. To last until I'm gray and old. You can't really call that anything but a pipe dream, really. But it's a simple wish I wanted to come true.
  <br><br>
    Each morning I'd visit it, making sure just the right amount of sunlight reaches it stems and leaves. And each day I'd faithfully tend to it, going back and forth despite the routine getting exhausting.
`;

const burstTwo = `
  But this morning, I saw a petal fall on the ground. I couldn't help but feel saddened. I didn't pay it much heed, until more one petal fell after another. And since that day, I knew I couldn't do anything. I knew I couldn't force a flower to 'grow' when it's time to wither. Yet, I still watered it every dayーjust in case there's a miracle that it'll bloom again like how it did before.
  <br><br>
  And I guess there's nothing wrong with silently hoping for something you really love, because I know I can't force anyone to grow and press on. But I can be there for themーfor as long as they damn want to. Because that's the only thing I can guarantee.
  <br><br>
  Then, at the very least, I saw how hard you struggled- how hard you tried. And it makes me really proudーto see you try and try again with every breath you take. You held on so long, and you did so well. You really did good.
`;

const burstThree = `
  You probably got the idea already, but this isn't about the plants.
`;

document.querySelector('.burst-one').innerHTML = burstOne;
document.querySelector('.burst-two').innerHTML = burstTwo;
document.querySelector('.third-column').innerHTML = burstThree;