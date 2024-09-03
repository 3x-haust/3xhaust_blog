import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const existingPost = await this.postRepository.findOne({
        where: { title: createPostDto.title.trim() },
      });

      if (existingPost) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            timeStamp: new Date().toISOString(),
            message: 'Title already exists',
          },
          HttpStatus.CONFLICT,
        );
      }

      const newPost = this.postRepository.create(createPostDto);
      newPost.title = createPostDto.title.trim();
      const savedPost = await this.postRepository.save(newPost);

      return {
        status: HttpStatus.CREATED,
        timeStamp: new Date().toISOString(),
        message: 'Post created successfully',
        data: savedPost,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          timeStamp: new Date().toISOString(),
          message: 'Failed to create post',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const posts = await this.postRepository.find();

      if (!posts.length) {
        return {
          status: HttpStatus.NO_CONTENT,
          timeStamp: new Date().toISOString(),
          message: 'No posts found',
          data: [],
        };
      }

      return {
        status: HttpStatus.OK,
        timeStamp: new Date().toISOString(),
        message: 'Posts retrieved successfully',
        data: posts,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          timeStamp: new Date().toISOString(),
          message: 'Failed to retrieve posts',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneById(id: number) {
    try {
      const post = await this.postRepository.findOne({ where: { id } });

      if (!post) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            timeStamp: new Date().toISOString(),
            message: 'Post not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        status: HttpStatus.OK,
        timeStamp: new Date().toISOString(),
        message: 'Post retrieved successfully',
        data: post,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          timeStamp: new Date().toISOString(),
          message: 'Failed to retrieve post',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOneByTitle(title: string) {
    try {
      const post = await this.postRepository.findOne({ where: { title } });

      if (!post) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            timeStamp: new Date().toISOString(),
            message: 'Post not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        status: HttpStatus.OK,
        timeStamp: new Date().toISOString(),
        message: 'Post retrieved successfully',
        data: post,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          timeStamp: new Date().toISOString(),
          message: 'Failed to retrieve post',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const existingPost = await this.postRepository.findOne({
        where: { id },
      });

      if (!existingPost) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            timeStamp: new Date().toISOString(),
            message: 'Post not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.postRepository.update(id, updatePostDto);

      return {
        status: HttpStatus.OK,
        timeStamp: new Date().toISOString(),
        message: 'Post updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          timeStamp: new Date().toISOString(),
          message: 'Failed to update post',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const post = await this.postRepository.findOne({ where: { id } });

      if (!post) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            timeStamp: new Date().toISOString(),
            message: 'Post not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.postRepository.delete(id);

      return {
        status: HttpStatus.OK,
        timeStamp: new Date().toISOString(),
        message: 'Post deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          timeStamp: new Date().toISOString(),
          message: 'Failed to delete post',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
