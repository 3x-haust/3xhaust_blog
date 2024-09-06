import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'blog.db',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      dropSchema: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
