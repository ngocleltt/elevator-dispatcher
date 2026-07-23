import { state } from "../state.js";
import { renderBuilding } from "../render/render.js";
import { moveElevator } from "../elevator/movement.js";


export function scoreElevator(elevator, floor, direction) {

    if (
        elevator.status === "idle" &&
        elevator.stops.size === 0
    ) {
        return Math.abs(floor - elevator.floor);
    }


    const movingToward =
        (
            direction === "up" &&
            elevator.direction === "up" &&
            elevator.floor <= floor
        )
        ||
        (
            direction === "down" &&
            elevator.direction === "down" &&
            elevator.floor >= floor
        );


    if (movingToward) {

        return Math.abs(floor - elevator.floor);

    }


    return 1000 + Math.abs(floor - elevator.floor);

}



export function dispatchHallCall(floor, direction) {

    const key = `${floor}_${direction}`;


    if (state.hallCalls[key]) {
        return;
    }


    const button = document.getElementById(
        direction === "up"
            ? `up-${floor}`
            : `down-${floor}`
    );


    if (button) {

        button.classList.add("pulse");


        setTimeout(() => {

            button.classList.remove("pulse");

        }, 500);

    }



    let bestElevator = state.elevators[0];

    let bestScore = Infinity;



    state.elevators.forEach(elevator => {

        const score = scoreElevator(
            elevator,
            floor,
            direction
        );


        if (score < bestScore) {

            bestScore = score;
            bestElevator = elevator;

        }

    });



    state.hallCalls[key] = {

        floor,

        dir: direction,

        elevatorId: bestElevator.id

    };


    bestElevator.stops.add(floor);



    if (bestElevator.status === "idle") {

        moveElevator(bestElevator);

    }


    renderBuilding();

}