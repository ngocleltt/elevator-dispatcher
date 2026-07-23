import { initializeBuilding } from "./initState.js";
import { buildDOM } from "./render/buildDOM.js";
import { renderBuilding } from "./render/render.js";
import { applyConfig, applyPreset } from "./ui/controls.js";

function start(){
    initializeBuilding(16,4);

    buildDOM();
    renderBuilding();

    document
        .querySelector(".apply-btn")
        .addEventListener("click", applyConfig);

    const presets = document.querySelectorAll(".preset-btn");

    presets[0]?.addEventListener("click", () => applyPreset(16,4));
    presets[1]?.addEventListener("click", () => applyPreset(5,1));
    presets[2]?.addEventListener("click", () => applyPreset(30,10));
}

start();