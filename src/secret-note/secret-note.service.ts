import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EncryptionService } from 'src/encryption/encryption.service';
import { SecretNoteDto } from './secret-note.dto';
import { SecretNote, SecretNoteDocument } from './secret-note.schema';

@Injectable()
export class SecretNoteService {
  constructor(
    @InjectModel(SecretNote.name)
    private secretNoteModel: Model<SecretNoteDocument>,
    private encryptionService: EncryptionService,
  ) {}

  async create(secretNoteDto: SecretNoteDto): Promise<SecretNote> {
    const secretNote = new this.secretNoteModel({
      note: await this.encryptionService.encrypt(secretNoteDto.note),
    });
    return secretNote.save();
  }

  async update(id: string, secretNoteDto: SecretNoteDto): Promise<SecretNote> {
    return await this.secretNoteModel.findByIdAndUpdate(
      id,
      { note: await this.encryptionService.encrypt(secretNoteDto.note) },
      {
        new: true,
      },
    );
  }

  async remove(id: string): Promise<SecretNote> {
    return await this.secretNoteModel.findByIdAndDelete(id);
  }

  async findAll(decrypt: boolean): Promise<SecretNote[]> {
    const secretNotes = await this.secretNoteModel.find().exec();
    return decrypt
      ? await Promise.all(
          secretNotes.map(async (s) => ({
            _id: s._id,
            __v: s.__v,
            note: await this.encryptionService.decrypt(s.note),
          })),
        )
      : secretNotes;
  }

  async findById(_id: string, decrypt: boolean): Promise<SecretNote> {
    const secretNote = await this.secretNoteModel.findOne({ _id });
    return decrypt
      ? {
          _id: secretNote._id,
          __v: secretNote.__v,
          note: await this.encryptionService.decrypt(secretNote.note),
        }
      : secretNote;
  }
}
