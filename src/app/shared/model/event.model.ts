export class Event {
    id: number;
    name: string;
    venue: string;
    address: string;
    eventDate: string; // Assuming you'll handle dates as strings
    startTime: string; // Assuming you'll handle times as strings
    endTime: string; // Assuming you'll handle times as strings
    estimatedCost: number;
    openForRegistration: boolean;
    regOpen: string; // Assuming you'll handle dates as strings
    regClose: string; // Assuming you'll handle dates as strings
    lastUpdateOn: string; // Assuming you'll handle dates as strings
    mapLink: string;
    img: string;
    imgAlt: string;

    constructor(eventData: any) {
        this.id = eventData.id;
        this.name = eventData.name;
        this.venue = eventData.venue;
        this.address = eventData.address;
        this.eventDate = eventData.eventDate;
        this.startTime = eventData.startTime;
        this.endTime = eventData.endTime;
        this.estimatedCost = eventData.estimatedCost;
        this.openForRegistration = eventData.openForRegistration;
        this.regOpen = eventData.regOpen;
        this.regClose = eventData.regClose;
        this.lastUpdateOn = eventData.lastUpdateOn;
        this.mapLink = eventData.mapLink;
        this.img = eventData.img;
        this.imgAlt = eventData.imgAlt;
    }
}

