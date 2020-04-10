import AppConfig from '../Configuration/Appconfig';
import diContainer from '../../Infrastructure/DependencyInjection/Container/instance';

import {
    createConnection, Connection,
} from 'typeorm';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
import { injectable } from 'inversify';

@injectable()
class DatabaseConnector
{
    public constructor(private appConfig: AppConfig = diContainer.get(AppConfig))
    {
    }

    private getConnectionConfig(): ConnectionOptions
    {
        return {
            type: 'postgres',
            url: this.appConfig.getDbConnectionUrl(),
            entities: [ '**/Entity/*.js' ],
        };
    }

    public async connect(): Promise<Connection>
    {
        return await createConnection(this.getConnectionConfig());
    }
}

export default DatabaseConnector;
