import { Member } from "src/app/member/member.model";

export class Family {
    id: number;
    fullName: string;
    dob: Date;
    email: string;
    phone: string;
    relationshipType: string;
  
    constructor(data: any) {
      this.id = data.id || null;
      this.fullName = data.fullName || '';
      this.dob = data.dob || null;
      this.email = data.email || '';
      this.phone = data.phone || '';
      this.relationshipType = data.relationshipType || 'OTHER';
    }
}
