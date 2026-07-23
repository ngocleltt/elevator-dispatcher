import { state } from "../state.js";
import { DOOR_DURATION } from "../config.js";
import { renderBuilding } from "../render/render.js";
import { moveElevator } from "./movement.js";


export function boardDestination(elevatorId, floor) {

    const elevator = state.elevators[elevatorId];


    if (!elevator || elevator.boardingAt === null) {
        return;
    }


    if (floor === elevator.floor) {
        return;
    }


    if (
        elevator.boardingDir === "up" &&
        floor < elevator.floor
    ) {
        return;
    }


    if (
        elevator.boardingDir === "down" &&
        floor > elevator.floor
    ) {
        return;
    }


    elevator.stops.add(floor);


    elevator.boardingAt = null;
    elevator.boardingDir = null;


    renderBuilding();


    setTimeout(() => {

        elevator.status = "idle";

        moveElevator(elevator);

    }, DOOR_DURATION);

}