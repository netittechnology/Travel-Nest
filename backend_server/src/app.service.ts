import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,

    private readonly configService: ConfigService,
  ) {}

  async getHello(): Promise<object> {
    const port = this.configService.get<string>('PORT');
    const appName = this.configService.get<string>('APP_NAME');
    const environment = this.configService.get<string>('NODE_ENV');
    const dbHost = this.configService.get<string>('database.host');
    const dbName = this.configService.get<string>('database.name');
    
    // Check database connection
    let isConnected = false;
    try {
      isConnected = this.dataSource.isInitialized;
      
      // Actually query the database to verify
      if (isConnected) {
        await this.dataSource.query('SELECT 1');
      }
    } catch (error) {
      this.logger.error('Database connection check failed', error);
      isConnected = false;
    }
    
    this.logger.log(`Database connection status: ${isConnected ? 'Connected' : 'Disconnected'}`);

    return {
      message: `${appName} API is up and running!`,
      status: isConnected ? 'healthy' : 'degraded',
      environment: environment,
      port: port,
      database: {
        host: dbHost,
        name: dbName,
        connected: isConnected
      },
      timestamp: new Date().toISOString()
    };
  }
}
