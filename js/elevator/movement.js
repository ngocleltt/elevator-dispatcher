import { state } from "../state.js";
import { MOVE_DURATION, DOOR_DURATION } from "../config.js";
import { renderBuilding } from "../render/render.js";


export function decideDirection(elevator) {

    const stops = [...elevator.stops];

    if (stops.length === 0) {
        return "idle";
    }

    const above = stops.some(
        floor => floor > elevator.floor
    );

    const below = stops.some(
        floor => floor < elevator.floor
    );


    if (elevator.direction === "up" && above) {
        return "up";
    }

    if (elevator.direction === "down" && below) {
        return "down";
    }


    if (above && !below) {
        return "up";
    }

    if (below && !above) {
        return "down";
    }


    if (above && below) {

        return elevator.direction === "down"
            ? "down"
            : "up";

    }


    return stops[0] > elevator.floor
        ? "up"
        : "down";

}



export function moveElevator(elevator) {

    if (
        elevator.status === "doors" ||
        elevator.boardingAt !== null
    ) {
        return;
    }


    if (elevator.stops.size === 0) {

        elevator.status = "idle";
        elevator.direction = "idle";

        renderBuilding();

        return;
    }


    elevator.direction = decideDirection(elevator);


    if (elevator.stops.has(elevator.floor)) {

        openDoors(elevator);

        return;
    }


    elevator.status = "moving";

    renderBuilding();


    const nextFloor =
        elevator.floor +
        (elevator.direction === "up" ? 1 : -1);



    setTimeout(() => {

        elevator.floor = nextFloor;

        moveElevator(elevator);

    }, MOVE_DURATION);

}



export function openDoors(elevator) {

    elevator.stops.delete(elevator.floor);


    let boardedDirection = null;


    Object.keys(state.hallCalls)
        .forEach(key => {

            const call = state.hallCalls[key];


            if (
                call.floor === elevator.floor &&
                call.elevatorId === elevator.id
            ) {

                boardedDirection = call.dir;

                delete state.hallCalls[key];

            }

        });



    elevator.status = "doors";


    if (boardedDirection) {

        elevator.boardingAt = elevator.floor;

        elevator.boardingDir = boardedDirection;

        renderBuilding();


    } else {

        renderBuilding();


        setTimeout(() => {

            elevator.status = "idle";

            moveElevator(elevator);

        }, DOOR_DURATION);

    }

}