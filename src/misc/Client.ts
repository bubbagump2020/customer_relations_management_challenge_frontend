class Client {
    id:number
    firstName:string
    lastName:string
    email:string
    stage:string
    phone:string
    company:string
    probability:number


    constructor(id: number, firstName: string, lastName: string, email: string, stage: string, phone: string, company: string, probability: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.stage = stage;
        this.phone = phone;
        this.company = company;
        this.probability = probability;
    }

    static createClient = (client:any):Client => {
        return new Client(client.id, client.first_name, client.last_name, client.email, client.stage, client.phone, client.company, client.probability);
    }

    static createArrayOfClients = (clients:Array<any>):Array<Client> => {
        let clientsArray:Array<Client> = [];
        clients.map(client => {
            clientsArray.push(Client.createClient(client));
        })
        return clientsArray;
    }

}

export default Client;