import ContainerLoader from './ContainerLoader';

describe('Loads a Container With Specific Settings', () =>
{
    it('With Default Context of Transient', () =>
    {
        const container = ContainerLoader.load();

        expect(container.options.defaultScope).toBe('Transient');
    });

    it('With Auto Binding true', () =>
    {
        const container = ContainerLoader.load();

        expect(container.options.autoBindInjectable).toBe(true);
    });
});
