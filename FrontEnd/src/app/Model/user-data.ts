export interface UserData {
  cover:string;
    id: number;
    role_id:number;
    name: string;
    email: string;
    email_verified_at: string | null;
    images:Array<string>;
    created_at: string;
    updated_at: string;
}
