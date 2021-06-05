export enum ActivityType {
    VOLLEYBALL = "Volleyball",
    TENNIS = "Tennis",
    BASKETBALL = "Basketball",
    HANDBALL = "Handball",
    DANCE = "Dance",
    PING_PONG = "Ping-pong",
    CHESS = "Chess",
    JOGGING = "Jogging",
    SWIMMING = "Swimming",
    CROSSFIT = "Crossfit",
}

export const activityTypes = [
    ActivityType.VOLLEYBALL,
    ActivityType.TENNIS,
    ActivityType.BASKETBALL,
    ActivityType.HANDBALL,
    ActivityType.DANCE,
    ActivityType.PING_PONG,
    ActivityType.CHESS,
    ActivityType.JOGGING,
    ActivityType.SWIMMING,
    ActivityType.CROSSFIT,
];

export const activityIcons = {
    [ActivityType.VOLLEYBALL]: "volleyball",
    [ActivityType.TENNIS]: "tennis",
    [ActivityType.BASKETBALL]: "basketball-hoop-outline",
    [ActivityType.HANDBALL]: "handball",
    [ActivityType.DANCE]: "dance",
    [ActivityType.PING_PONG]: "table-tennis",
    [ActivityType.CHESS]: "chess-knight",
    [ActivityType.JOGGING]: "run",
    [ActivityType.SWIMMING]: "pool",
    [ActivityType.CROSSFIT]: "weight-lifter",
};
