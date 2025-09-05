export interface UserDetails {
    userId: any
    userRoleId: any,
    userName: string,
    token: any,
}

export class UserDetailsModel {
    userDetails!: UserDetails
}

export const newUserDetails: UserDetails = {
    userId: null,
    userRoleId: null,
    userName: '',
    token: null,
}