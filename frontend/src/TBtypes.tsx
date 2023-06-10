export type DecodedToken = {
    'https://www.myapi.com/email': string;
    'https://www.myapi.com/nickname': string;
    sub: string;
    iat: number;
    exp: number;
    iss: string;
    aud: string;
    scope:string;

}
export type User = {
    email: string;
    name: string,
}
export type UserId={
    id:number,
    exists:boolean
}
