import container from '../../DependencyInjection/Container/instance';
import { Container } from 'inversify';
import ServiceResolverInterface from '../../../Domain/Common/ServiceResolverInterface';

class BusContainerIdServiceResolver<TService> implements ServiceResolverInterface<TService>
{
    public constructor(
        private containerId: Function,
        private diContainer: Container = container,
    )
    {}

    public resolveService(): TService
    {
        return this.diContainer.get(this.containerId);
    }
}

export default BusContainerIdServiceResolver;
