import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { ClientModule } from './modules/client/client.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AddressModule } from './modules/address/address.module';
import { ClientController } from './modules/client/client.controller';
import { ClientService } from './modules/client/client.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  controllers: [AppController, ClientController],
  providers: [AppService, ClientModule, ClientService],
  imports: [
    ConfigModule,
    DatabaseModule,
    ClientModule,
    ProfileModule,
    AddressModule,
    AuthModule,
  ],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
