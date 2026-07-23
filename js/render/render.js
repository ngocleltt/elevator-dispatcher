import { state } from "../state.js";
import { FLOOR_HEIGHT } from "../config.js";

export function renderBuilding() {

    state.elevators.forEach(elevator => {

        const car = document.getElementById(`car-${elevator.id}`);
        const display = document.getElementById(`disp-${elevator.id}`);
        const arrow = document.getElementById(`arrow-${elevator.id}`);

        if (!car) {
            return;
        }

        car.style.top = ((state.floors - elevator.floor) * FLOOR_HEIGHT) + "px";

        car.classList.remove("moving", "doors");

        if (elevator.status === "moving") {
            car.classList.add("moving");
        }

        if (elevator.status === "doors") {
            car.classList.add("doors");
        }

        display.textContent = String(elevator.floor).padStart(2, "0");

        if (elevator.boardingAt !== null) {
            arrow.textContent = "◇ PICK";
        } else if (elevator.status === "doors") {
            arrow.textContent = "◇ OPEN";
        } else if (elevator.direction === "up") {
            arrow.textContent = "▲";
        } else if (elevator.direction === "down") {
            arrow.textContent = "▼";
        } else {
            arrow.textContent = "";
        }

    });

    const boardingPanels = document.getElementById("boardingPanels");

    const waitingElevators = state.elevators.filter(
        elevator => elevator.boardingAt !== null
    );

    boardingPanels.innerHTML = waitingElevators
        .map(elevator => {

            let buttons = "";

            for (let floor = state.floors; floor >= 1; floor--) {

                const disabled =
                    floor === elevator.floor ||
                    (elevator.boardingDir === "up" && floor < elevator.floor) ||
                    (elevator.boardingDir === "down" && floor > elevator.floor);

                buttons += `
                    <button
                        class="floor-pick${floor === elevator.floor ? " current" : ""}"
                        ${disabled ? "disabled" : ""}
                        onclick="boardDestination(${elevator.id}, ${floor})"
                    >
                        ${floor}
                    </button>
                `;
            }

            return `
                <div class="boarding-panel">

                    <div class="boarding-head">

                        <span
                            class="boarding-dot"
                            style="background:${elevator.color};color:${elevator.color};"
                        ></span>

                        <span class="boarding-title">
                            Thang #${elevator.id + 1} — chọn tầng đến
                        </span>

                        <span class="boarding-sub">
                            (đang ở tầng ${elevator.floor},
                            hướng ${elevator.boardingDir === "up" ? "lên" : "xuống"})
                        </span>

                    </div>

                    <div class="floor-grid">

                        ${buttons}

                    </div>

                </div>
            `;

        })
        .join("");

    for (let floor = 1; floor <= state.floors; floor++) {

        const upButton = document.getElementById(`up-${floor}`);
        const downButton = document.getElementById(`down-${floor}`);
        const badge = document.getElementById(`badge-${floor}`);

        if (upButton) {
            upButton.classList.remove("lit");
        }

        if (downButton) {
            downButton.classList.remove("lit");
        }

        let assignedColor = null;
        let assignedElevator = null;

        Object.values(state.hallCalls).forEach(call => {

            if (call.floor !== floor) {
                return;
            }

            const button = call.dir === "up"
                ? upButton
                : downButton;

            if (button) {
                button.classList.add("lit");
            }

            assignedColor = state.elevators[call.elevatorId].color;
            assignedElevator = call.elevatorId + 1;

        });

        if (badge) {

            badge.innerHTML = assignedColor
                ? `
                    <span
                        class="assign-badge"
                        style="background:${assignedColor}"
                    >
                        ${assignedElevator}
                    </span>
                `
                : "";

        }

    }

    document.getElementById("statCalls").textContent =
        Object.keys(state.hallCalls).length;

    document.getElementById("statIdle").textContent =
        state.elevators.filter(
            elevator => elevator.status === "idle"
        ).length;

}