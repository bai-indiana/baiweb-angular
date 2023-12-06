export class Membership {
    id: number;
    name: string;
    type: string;
    price: number;
    lastUpdateOn : Date;
  
    constructor(data: any
    ) {
      this.id = data.id || null;
      this.name = data.name || '';
      this.type = data.type || '';
      this.price = data.price || null;
      this.lastUpdateOn  = data.lastUpdateOn  || null || '';
    }
  }