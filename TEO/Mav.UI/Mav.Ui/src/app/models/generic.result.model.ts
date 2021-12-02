import { EnumStatusCode } from './generic.status';

export class GenericResult<TValue> {

    public static default = new GenericResult();

    public keyID: TValue;

    public status: EnumStatusCode;

    public message: string;

}
