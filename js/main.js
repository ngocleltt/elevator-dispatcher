import { initializeBuilding } from "./initState.js";
import { buildDOM } from "./render/buildDOM.js";
import { renderBuilding } from "./render/render.js";

function initializeApplication() {
    initializeBuilding(16, 4);

    buildDOM();

    renderBuilding();
}

initializeApplication();