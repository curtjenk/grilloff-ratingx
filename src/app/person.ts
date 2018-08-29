export class Person {
  id: number;
  name: string;
  email: string;
  type: number; // 0=admin, 1=contestant, 2=judge
  token: string;
  constructor(id: number, name: string, email: string, type: number, token: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.type = type;
    this.token = token;
  }
}
