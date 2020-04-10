import EventBusConfigInterface from './EventBusConfigInterface';
import ServiceLayerLoaded from '../../../../Application/Boot/Event/ServiceLayerLoaded/ServiceLayerLoaded';
import ServiceLayerLoadedHandler from '../../../../Application/Boot/Event/ServiceLayerLoaded/ServiceLayerLoadedHandler';

const applicationEventBusHandlersConfig: EventBusConfigInterface[] = [
    {
        eventId: ServiceLayerLoaded.EVENT_ID,
        handlerClass: ServiceLayerLoadedHandler,
    },
];

export default applicationEventBusHandlersConfig;
