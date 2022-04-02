import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PbEnv } from '@pb-config/environments/pb-env/pb-env.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './components/posts/posts.module';
import { PbEnvModule } from './config/environments/pb-env/pb-env.module';
import { PrismaModule } from 'nestjs-prisma';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    PbEnvModule,
    GraphQLModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.GqlModuleOptionsFactory,
    }),
    PrismaModule.forRoot(),
    // GraphQLModule.forRoot({
    //   autoSchemaFile: path.join(
    //     process.cwd(),
    //     'src/generated/graphql/schema.gql',
    //   ),
    //   sortSchema: true,
    // }),
    PostsModule,
    WinstonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
