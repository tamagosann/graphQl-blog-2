import { ConfigService } from '@nestjs/config';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PbEnv } from 'src/config/environments/pb-env/pb-env.service';
import { PostModel } from './interfaces/post.model';

@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(private configService: ConfigService, private pbEnv: PbEnv) {}

  @Query(() => Int)
  hello(): number {
    return this.configService.get<number>('PORT'); // 3333 (number型になります)
  }

  @Query(() => String)
  helloConfiguration() {
    // これで、環境変数が、.env系ふぁいるよりも環境変数が優先される。
    const nodeEnv = this.configService.get<string>('NODE_ENV'); // development （.env.development.localのもの）
    const databaseUrl = this.configService.get<string>('DATABASE_URL'); // postgresql:/... （.env.development.localのもの）
    const microCmsKey = this.configService.get<string>('MICRO_CMS_KEY'); // 1234567890（環境変数のもの）
    const port = this.configService.get<string>('PORT'); // ポート （.env.development.localのもの）
  }

  @Query(() => String)
  helloEnv(): string {
    return this.pbEnv.DatabaseUrl; // かなり直感的になりました。ミスも減りそう
  }

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts() {
    return [
      {
        id: '1',
        title: 'NestJS is so good.',
      },
      {
        id: '2',
        title: 'GraphQL is so good.',
      },
    ];
  }
}
