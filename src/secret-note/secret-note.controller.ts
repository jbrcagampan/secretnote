import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { SecretNoteDto } from './secret-note.dto';
import { SecretNote } from './secret-note.schema';
import { SecretNoteService } from './secret-note.service';

@Controller('secret-note')
export class SecretNoteController {
  constructor(private secretNoteService: SecretNoteService) {}
  @Get()
  async findAll(@Query('decrypt') decrypt: boolean): Promise<SecretNote[]> {
    return await this.secretNoteService.findAll(decrypt);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query('decrypt') decrypt: boolean,
  ): Promise<SecretNote> {
    return await this.secretNoteService.findById(id, decrypt);
  }

  @Post()
  async create(@Body() secretNoteDto: SecretNoteDto): Promise<SecretNote> {
    return await this.secretNoteService.create(secretNoteDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() secretNoteDto: SecretNoteDto,
  ): Promise<SecretNote> {
    return await this.secretNoteService.update(id, secretNoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<SecretNote> {
    return await this.secretNoteService.remove(id);
  }
}
