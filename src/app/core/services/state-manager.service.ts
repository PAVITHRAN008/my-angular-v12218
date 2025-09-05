import { Injectable } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { UserDetails } from "../interfaces/models";
import { User } from "../stateManagement/actions/user.actions";
import { userState } from "../stateManagement/state/state.service";

@Injectable({
    providedIn: 'root'
})
export class StateManagerService {
    @Select(userState.getUsers) private userDetails$!: Observable<UserDetails>;

    constructor(private store: Store) { }

    //**********USER STATE**********//
    addUserDetailsToState(userDetails: UserDetails): void {
        let saveObject: UserDetails = {
            userId: userDetails.userId,
            userRoleId: userDetails.userRoleId,
            userName: userDetails.userName,
            token: userDetails.token,
        };
        this.store.dispatch(new User.Save(saveObject));
    }

    getUserDetailsFromState(): Observable<UserDetails> {
        return this.userDetails$;
    }

    resetUserDetailsInState(): void {
        this.store.dispatch(new User.Remove());
    }
}
