import { COLORS } from "./config.js";
import { state, resetState } from "./state.js";

export function initializeBuilding(floors, elevatorCount) {
    const elevators = [];

    for (let i = 0; i < elevatorCount; i++) {
        const startFloor =
            elevatorCount === 1
                ? 1
                : 1 + Math.round((i * (floors - 1)) / (elevatorCount - 1));

        elevators.push({
            id: i,
            color: COLORS[i % COLORS.length],
            floor: startFloor,
            direction: "idle",
            status: "idle",
            stops: new Set(),
            boardingAt: null,
            boardingDir: null
        });
    }

    resetState(floors, elevators);

    return state;
}