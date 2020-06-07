import {Model, BuildOptions} from 'sequelize';

export interface ImageModel extends Model{
  readonly id: number;
  filename: string;
  mimetype: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
