const $ = document;
const battery = $.querySelector(".battery");
const container = $.querySelector(".container");
const progress = $.querySelector(".progress");
const percentText = $.querySelector(".percent");
const statusText = $.querySelector(".status");
const charging = $.querySelector(".charging");

let isCharging;
let batteryPercent;

window.addEventListener("load", getBatteryInfo);

async function getBatteryInfo() {
  const data = await navigator.getBattery();
  const refreshBattery = () => {
    console.log("ejra");
    isCharging = data.charging;
    batteryPercent = data.level * 100;
    updateBattery();
  };
  refreshBattery();
  data.addEventListener("chargingchange", refreshBattery);
  data.addEventListener("levelchange", refreshBattery);
}

function updateBattery() {
  percentText.textContent = `${Math.floor(batteryPercent)}%`;
  progress.style.height = `${batteryPercent}%`;

  isCharging
    ? charging.classList.remove("hidden")
    : charging.classList.add("hidden");

  batteryPercent >= 70
    ? setColorGreen()
    : batteryPercent >= 30
      ? setColorYellow()
      : setColorRed();
}

function setColorRed() {
  battery.style.boxShadow = "var(--shadow-red)";
  battery.style.background = "var(--glass-red)";
  container.style.background = "var(--glass-red)";
  progress.style.background = "var(--progress-red)";
  statusText.textContent = "🔴 LOW";
  statusText.style.color = "#ff6b6b";
}
function setColorGreen() {
  battery.style.boxShadow = "var(--shadow-green)";
  battery.style.background = "var(--glass-green)";
  container.style.background = "var(--glass-green)";
  progress.style.background = "var(--progress-green)";
  statusText.textContent = "⚡ HIGH";
  statusText.style.color = "#00ff88";
}
function setColorYellow() {
  battery.style.boxShadow = "var(--shadow-yellow)";
  battery.style.background = "var(--glass-yellow)";
  container.style.background = "var(--glass-yellow)";
  progress.style.background = "var(--progress-yellow)";
  statusText.textContent = "⚠️ MEDIUM";
  statusText.style.color = "#ffcc00";
}
