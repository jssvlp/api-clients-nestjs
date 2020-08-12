import { createParamDecorator } from '@nestjs/common';
import { ProfileDto } from '../profile/dtos/read-profile.dto';

export const GetUser = createParamDecorator(
  (data, request): ProfileDto => {
    return request.user;
  },
);
