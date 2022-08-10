import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EncryptionService } from 'src/encryption/encryption.service';
import { SecretNoteController } from './secret-note.controller';
import { SecretNote, SecretNoteSchema } from './secret-note.schema';
import { SecretNoteService } from './secret-note.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SecretNote.name, schema: SecretNoteSchema },
    ]),
  ],
  controllers: [SecretNoteController],
  providers: [SecretNoteService, EncryptionService],
})
export class SecretNoteModule {}
