import { Exclude, Expose } from 'class-transformer';
import { Client } from '../../client/client.entity';

@Exclude()
export class CreateAddressDto {
  @Expose()
  readonly country: string;

  @Expose()
  readonly state: string;

  @Expose()
  readonly city: string;

  @Expose()
  readonly addressLineOne: string;

  @Expose()
  readonly addresLineTwo: string;

  @Expose()
  readonly postalCode: string;

  @Expose()
  clientId: string;

  @Expose()
  client?: Client;
}
