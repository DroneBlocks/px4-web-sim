const FlightMode = Object.freeze({
    MANUAL: 0,
    ALTITUDE: 1,
    POSITION: 2,
    MISSION: 3,
    HOLD: 4,
    RTL: 5,
    SLOW: 6,
    FREE5: 7,
    FREE4: 8,
    FREE3: 9,
    ACRO: 10,
    FREE2: 11,
    DESCEND: 12,
    TERMINATION: 13,
    OFFBOARD: 14,
    STABILIZED: 15,
    FREE1: 16,
    TAKEOFF: 17,
    LAND: 18,
    TARGET: 19,
    PRECLAND: 20,
    ORBIT: 21,
    VTOL_TAKOFF: 22
});

class LEDFlightModeStatus {
    constructor(pixels, logger) {
        this.pixels = pixels;
        this.logger = logger;
        this.previousFlightMode = null;
        this.currentFlightMode = null;
    }

    listenerCallback(msg) {
        this.currentFlightMode = FlightMode[msg.nav_state];

        if (this.currentFlightMode !== this.previousFlightMode) {
            let solid;
            switch (this.currentFlightMode) {
                case FlightMode.STABILIZED:
                    solid = new Solid(this.pixels, WHITE);
                    solid.animate();
                    break;
                case FlightMode.ALTITUDE:
                    solid = new Solid(this.pixels, YELLOW);
                    solid.animate();
                    break;
                case FlightMode.POSITION:
                    solid = new Solid(this.pixels, GREEN);
                    solid.animate();
                    break;
                default:
                    this.logger.info('FLIGHT MODE COLOR NOT YET SUPPORTED');
                    solid = new Solid(this.pixels, BLACK);
                    solid.animate();
            }

            this.previousFlightMode = this.currentFlightMode;
        }
    }
}
