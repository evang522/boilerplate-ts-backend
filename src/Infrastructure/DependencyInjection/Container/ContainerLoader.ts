import { Container } from 'inversify';

class ContainerLoader
{
    /**
     * @description When this is set to true, the container will look for every class
     * with the @injectable tag, and bind it to itself in the container.
     */
    public autoBindInjectable(): boolean
    {
        return true;
    }

    /**
     * @description this property describes the default context in which the service should be bound.
     * This can of course be overwritten by individual configurations in the Bindings below.
     * Singleton:  remains the same instance throughout the entire application.
     * Transient: Creates a new instance every time it is requested.
     */
    public defaultScope(): 'Singleton' | 'Request' | 'Transient'
    {
        return 'Transient';
    }

    public skipBaseClassChecks(): boolean
    {
        return true;
    }

    public static load(): Container
    {
        const self = new this();

        const containerInstance = self.buildInitialContainerWithSettings();

        return containerInstance;
    }

    private buildInitialContainerWithSettings(): Container
    {
        return new Container({
            defaultScope: this.defaultScope(),
            autoBindInjectable: this.autoBindInjectable(),
            skipBaseClassChecks: this.skipBaseClassChecks(),
        });
    }
}

export default ContainerLoader;
