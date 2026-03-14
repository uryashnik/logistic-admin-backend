import { Injectable, PipeTransform, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CreatedByDto, UpdatedByDto } from '../dto';
import { AuthRequest } from '../types';

@Injectable({ scope: Scope.REQUEST })
export class SetUserPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: AuthRequest) {}

  transform(obj: Record<string, any> & CreatedByDto & UpdatedByDto) {
    const method = this.request.method;
    const user = { id: this.request.user.id.toString() };

    if (method === 'POST') obj.createdBy = user;
    else if (method === 'PUT' || method === 'PATCH' || method === 'DELETE') obj.updatedBy = user;

    return obj;
  }
}
