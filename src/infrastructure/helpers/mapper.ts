import { classToPlain, plainToClass } from 'class-transformer';

export const entityToDto = classToPlain;
export const dtoToEntity = plainToClass;
