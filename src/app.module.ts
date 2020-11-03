import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true
    }),
  ],
})

export class AppModule {
  constructor(private connection: Connection) {}
}
