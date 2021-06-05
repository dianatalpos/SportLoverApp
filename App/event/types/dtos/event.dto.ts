export default class EventDTO {
    id: string;
    sport: string;
    level: string;
    location: string;
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
}
