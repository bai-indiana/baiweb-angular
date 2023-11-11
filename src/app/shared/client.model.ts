export class Client {
    country_code: string;
    country_name: string;
    city: string;
    postal: string;
    latitude: number;
    longitude: number;
    ipAddress: string;
    state: string;
  
    constructor(data: any) {
      this.country_code = data.country_code || '';
      this.country_name = data.country_name || '';
      this.city = data.city || '';
      this.postal = data.postal || '';
      this.latitude = data.latitude || 0;
      this.longitude = data.longitude || 0;
      this.ipAddress = data.IPv4 || '';
      this.state = data.state || '';
    }
  }
