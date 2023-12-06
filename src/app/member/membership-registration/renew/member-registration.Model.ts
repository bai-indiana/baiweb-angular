import { Member } from "../../member.model";
import { Membership } from "../../membership/membership.model";

export class MemberRegistration {
  id: number;
  startDate: string;
  endDate: string;
  amountPaid: number;
  paymentReceived: boolean;
  status: boolean;
  dateOfRegistration: string;
  paidBy: string;
  membership: Membership;
  member: Member;

  constructor(data: any
  ) {
    this.id = data.id || null;
    this.startDate = data.startDate || null;
    this.endDate = data.endDate || null;
    this.amountPaid = data.amountPaid || null;
    this.paymentReceived = data.paymentReceived || null;
    this.status = data.status || '';
    this.dateOfRegistration = data.dateOfRegistration || null;
    this.paidBy = data.paidBy || null;
    this.membership = data.membership || null;
    this.member = data.member || null;

  }
}

