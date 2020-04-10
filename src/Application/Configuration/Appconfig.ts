import { injectable } from 'inversify';

@injectable()
class AppConfig
{
    private constructor(
        private environment: ENVIRONMENT,
        private port: number,
        private dbConnectionUrl: string,
    )
    {
        if (!environment )
        {
            throw new Error('Cannot launch app. An Env variable is undefined.');
        }

        if (!port)
        {
            throw new Error('Cannot launch app -- port ENV key is missing');
        }

        if (!dbConnectionUrl)
        {
            throw new Error('Cannot launch app -- DB Connection URL is missing');
        }
    }

    public static fromEnvironment(): AppConfig
    {
        return new this(
            process.env.APP_ENV as ENVIRONMENT,
            Number(process.env.PORT),
            process.env.DATABASE_URL as string,
        );
    }

    public inEnvironment(env: ENVIRONMENT): boolean
    {
        return this.environment === env;
    }

    public inAnyEnvironment(envs: ENVIRONMENT[]): boolean
    {
        return envs.some((env: ENVIRONMENT) => this.inEnvironment(env));
    }

    public getPort(): number
    {
        return this.port;
    }

    public getDbConnectionUrl(): string
    {
        return this.dbConnectionUrl;
    }
}

export default AppConfig;

type ENVIRONMENT = 'test' | 'development' | 'production';
