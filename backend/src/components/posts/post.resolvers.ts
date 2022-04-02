import { ConfigService } from '@nestjs/config';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PbEnv } from 'src/config/environments/pb-env/pb-env.service';
import { PostModel } from './interfaces/post.model';
import { PrismaClient } from '@prisma/client';
import { GetPostsArgs } from './interfaces/get-posts-connection.args';
import { FindPostArgs } from './interfaces/find-post-args';
import matter from 'gray-matter';

@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(
    private configService: ConfigService,
    private pbEnv: PbEnv,
    private readonly prisma: PrismaClient,
  ) {}

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

  // 役目を終えたのでリネーム
  @Query(() => [PostModel], { name: 'fixedPosts', nullable: true })
  async getPostsByFixedData() {
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

  @Query(() => [PostModel], { name: 'prismaPosts', nullable: true })
  async getPostsByPrisma() {
    return this.prisma.post.findMany();
  }

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts(@Args() args: GetPostsArgs) {
    return this.prisma.post.findMany({
      where: {
        type: args.type
          ? {
              in: args.type,
            }
          : undefined,
        published: true, // ついでに指定。公開ブログへ渡すデータなのでtrue固定にしちゃう
      },
      orderBy: {
        publishDate: 'desc',
      },
    });
  }
  @Query(() => PostModel, { name: 'findPost', nullable: false })
  async findPost(@Args() args: FindPostArgs) {
    return await this.prisma.post.findUnique({
      rejectOnNotFound: true,
      where: {
        id: args.id,
        contentPath: args.contentPath,
      },
    });
  }

  @ResolveField(() => String, { name: 'bodyMarkdown', nullable: false })
  async bodyMarkdown(@Parent() post: PostModel) {
    const { contentPath } = post;
    // 本当はここでmdファイルを呼ぶ

    // const { content } = matter(markdown);
    const content = 'aaaaaaa';
    return content;
  }
}
