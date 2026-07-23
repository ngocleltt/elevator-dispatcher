import { initializeBuilding } from "../initState.js";
import { buildDOM } from "../render/buildDOM.js";
import { renderBuilding } from "../render/render.js";


export function applyConfig() {

    const floors = Math.max(
        2,
        Math.min(
            40,
            parseInt(
                document.getElementById("inputFloors").value
            ) || 16
        )
    );


    const elevatorCount = Math.max(
        1,
        Math.min(
            10,
            parseInt(
                document.getElementById("inputElevators").value
            ) || 4
        )
    );


    document.getElementById("inputFloors").value = floors;

    document.getElementById("inputElevators").value = elevatorCount;


    initializeBuilding(
        floors,
        elevatorCount
    );


    buildDOM();

    renderBuilding();

}



export function applyPreset(floors, elevatorCount) {

    document.getElementById("inputFloors").value = floors;

    document.getElementById("inputElevators").value = elevatorCount;


    initializeBuilding(
        floors,
        elevatorCount
    );


    buildDOM();

    renderBuilding();

}