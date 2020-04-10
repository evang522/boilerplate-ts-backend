import EventInterface from '../../../../Infrastructure/Bus/EventBus/EventInterface';

class ServiceLayerLoaded implements EventInterface
{
    public static EVENT_ID = 'app.services.application.boot.application_loaded::event'

    private timestamp: number;

    public constructor()
    {
        this.timestamp = Date.now();
    }

    public getEventId(): string
    {
        return ServiceLayerLoaded.EVENT_ID;
    }

    public getTimestamp(): number
    {
        return this.timestamp;
    }
}

export default ServiceLayerLoaded;
