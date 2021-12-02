export class AddUserViewModel {

    public static default = new AddUserViewModel();

    public id: string;

    public firstName: string;

    public surname: string;

    public email: string;

    public confirmEmail: string;

    public enabled: boolean;

    public creatorID: string;

    public role?: string;

    public returnUrl: string;

  }
