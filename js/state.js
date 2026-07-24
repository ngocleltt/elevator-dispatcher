export const state = {
    floors: 16,
    elevators: [],
    hallCalls: {},

    statistics: {
        totalCalls: 0,
        completedCalls: 0
    },

    settings: {
        algorithm: "nearest"
    }
};

export function resetState(floors, elevators) {
    state.floors = floors;
    state.elevators = elevators;
    state.hallCalls = {};

    state.statistics.totalCalls = 0;
    state.statistics.completedCalls = 0;
}