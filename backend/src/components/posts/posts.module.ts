import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PostsResolver } from './post.resolvers';

@Module({
  providers: [PostsResolver, PrismaClient],
})
export class PostsModule {}
