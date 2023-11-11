export class AuthenticationResponse {
    access_token: string;
    refresh_token: string;
    username: string;
    role: string;
  
    constructor(data : any) {
      this.access_token = data.access_token || '';
      this.refresh_token = data.refresh_token || '';
      this.username = data.username || '';
      this.role = data.role || '';
    }
  }
  