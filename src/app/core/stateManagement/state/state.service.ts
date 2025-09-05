import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, StateToken } from "@ngxs/store";
import { newUserDetails, UserDetailsModel } from "src/app/core/interfaces/user-details.model";
import { User } from "../actions/user.actions";

const USR_STATE_TOKEN = new StateToken<UserDetailsModel>('userDetails');
@State<UserDetailsModel>({
    name: USR_STATE_TOKEN,
    defaults: {
        userDetails: newUserDetails
    }
})
@Injectable()
export class userState {
    @Selector([USR_STATE_TOKEN])
    static getUsers(state: UserDetailsModel) {
        return state.userDetails;
    }
    @Action(User.Save)
    addUser({ patchState }: StateContext<UserDetailsModel>, { payLoad }: User.Save) {
        patchState({
            userDetails: payLoad
        });
    }
    @Action(User.Remove)
    deleteUser({ setState }: StateContext<UserDetailsModel>) {
        setState({
            userDetails: newUserDetails
        });
    }
}