import { state } from "../state.js";
import { FLOOR_HEIGHT } from "../config.js";

export function buildDOM() {
    const floorLabels = document.getElementById("floorLabels");
    const carsOverlay = document.getElementById("carsOverlay");

    floorLabels.innerHTML = "";
    carsOverlay.innerHTML = "";

    carsOverlay.style.height = (state.floors * FLOOR_HEIGHT) + "px";
    carsOverlay.style.width = (state.elevators.length * 64) + "px";

    for (let f = state.floors; f >= 1; f--) {
        const row = document.createElement("div");

        row.className = "floor-row";
        row.style.height = FLOOR_HEIGHT + "px";

        row.innerHTML = `
            <span class="floor-num">${f}</span>

            <div class="hall-btns">

                ${
                    f < state.floors
                        ? `<button class="hall-btn" id="up-${f}">
                            <svg viewBox="0 0 10 10">
                                <polygon points="5,0 10,8 0,8"/>
                            </svg>
                           </button>`
                        : ""
                }

                ${
                    f > 1
                        ? `<button class="hall-btn" id="down-${f}">
                            <svg viewBox="0 0 10 10">
                                <polygon points="0,2 10,2 5,10"/>
                            </svg>
                           </button>`
                        : ""
                }

            </div>

            <span id="badge-${f}"></span>
        `;

        floorLabels.appendChild(row);
    }

    state.elevators.forEach((elevator, index) => {

        const track = document.createElement("div");

        track.className = "car-track";
        track.style.left = (index * 64) + "px";

        const car = document.createElement("div");

        car.className = "car";
        car.id = `car-${elevator.id}`;
        car.style.borderColor = elevator.color;

        car.innerHTML = `
            <span
                class="car-id"
                style="color:${elevator.color}"
            >
                #${elevator.id + 1}
            </span>

            <span
                class="car-display"
                id="disp-${elevator.id}"
            ></span>

            <span
                class="car-arrow"
                id="arrow-${elevator.id}"
            ></span>
        `;

        track.appendChild(car);

        carsOverlay.appendChild(track);
    });

    const legend = document.getElementById("legend");

    legend.innerHTML = state.elevators
        .map(
            elevator => `
                <div class="legend-item">

                    <span
                        class="dot"
                        style="
                            background:${elevator.color};
                            color:${elevator.color};
                        "
                    ></span>

                    Thang #${elevator.id + 1}

                </div>
            `
        )
        .join("");
}