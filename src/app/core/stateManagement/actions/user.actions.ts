import { UserDetails } from "src/app/core/interfaces/models";

export namespace User {
    export class Save {
        static readonly type = '[User API] Save User';
        constructor(public payLoad: UserDetails) { }
    }

    export class Remove {
        static readonly type = '[Logout API] Remove User';
    }
}
