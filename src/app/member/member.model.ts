export class Member {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    dob: Date;
    gender: string;
    addressStreet1: string;
    addressStreet2: string;
    addressCity: string;
    addressState: string;
    addressZip: number;
    phone: string;
    password: string;
    lastLoginTime: Date;
    status: boolean;
    verified: boolean;
    lastPasswordChanged: Date;
    temporaryPasswordChanged: boolean;
    role: string;
  
    constructor(data: any
    ) {
      this.id = data.id || null;
      this.firstName = data.firstName || '';
      this.lastName = data.lastName || '';
      this.username = data.username || '';
      this.dob = data.dob || null;
      this.gender = data.gender || null;
      this.addressStreet1 = data.addressStreet1 || '';
      this.addressStreet2 = data.addressStreet2 || '';
      this.addressCity = data.addressCity || '';
      this.addressState = data.addressState || '';
      this.addressZip = data.addressZip || null;
      this.phone = data.phone || null;
      this.password = data.password || '';
      this.lastLoginTime = data.lastLoginTime || null;
      this.status = data.status || false;
      this.verified = data.verified || false;
      this.lastPasswordChanged = data.lastPasswordChanged || null;
      this.temporaryPasswordChanged = data.temporaryPasswordChanged || false;
      this.role = data.role || 'USER';
    }
  }