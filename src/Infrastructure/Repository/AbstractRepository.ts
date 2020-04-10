import {
    FindOneOptions, Repository as TypeOrmRepository,
} from 'typeorm';
import diContainer from '../DependencyInjection/Container/instance';
import ServiceId from '../DependencyInjection/ServiceId';

abstract class AbstractRepository<Entity>
{
    protected entityRepository: TypeOrmRepository<Entity>

    protected constructor(
        private entity: Function,
        private entityRepositoryFactory: (entity: Function) => TypeOrmRepository<Entity> = diContainer
            .get(ServiceId.EntityRepositoryFactory),
    )
    {
        this.entityRepository = this.entityRepositoryFactory(this.entity);
    }

    public async find(id: string): Promise<Entity|null>
    {
        return await this.entityRepository.findOne(id) || null;
    }

    public async findAll(): Promise<Entity[]>
    {
        return await this.entityRepository.find();
    }

    public async findBy(options: FindOneOptions): Promise<Entity | null>
    {
        return await this.entityRepository.findOne(options) || null;
    }

    public async remove(entity: Entity): Promise<void>
    {
        await this.entityRepository.remove(entity);
    }

    public async saveOne(entity: Entity): Promise<void>
    {
        await this.entityRepository.save(entity);
    }
}

export default AbstractRepository;
