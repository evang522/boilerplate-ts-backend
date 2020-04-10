import diContainer from '../../DependencyInjection/Container/instance';
import { Container } from 'inversify';
import ServiceResolverInterface from '../../../Domain/Common/ServiceResolverInterface';

class BusContainerIdServiceResolver<TService> implements ServiceResolverInterface<TService>
{
    public constructor(
        private containerId: Function,
        private container: Container = diContainer,
    )
    {}

    public resolveService(): TService
    {
        return this.container.get(this.containerId);
    }
}

export default BusContainerIdServiceResolver;
