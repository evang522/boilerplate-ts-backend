import applicationEventBusHandlersConfig from './application.eventbusconfig';
import EventBusConfigInterface from './EventBusConfigInterface';

const eventBusConfig: EventBusConfigInterface[] = [ ...applicationEventBusHandlersConfig ];

export default eventBusConfig;
