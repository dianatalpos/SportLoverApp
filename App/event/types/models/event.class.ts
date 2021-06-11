import { Location } from "../../../location/types";
import Participant from "./participant.class";

export default class Event {
    id: string;
    sport: string;
    level: string;
    location: Location;
    locationFieldName: string;
    locationId: string;
    locationFieldId: string;
    locationLatitude: number;
    locationLongitude: number;
    dateTime: Date;
    duration: number;
    createdBy: string;
    maxNoPlayers: number;
    isPublic: boolean;
    users: string[];
    participants: Participant[];
}
