import axios from "axios";

import IBill from "./structures/Bill";
import IPaymentLink from "./structures/PaymentLink";

/**
 * VeloxPay API constructor
 *
 * @example
 *     const VeloxPay = require("veloxpay");
 *     const API = new VeloxPay("ACCESS_TOKEN")
 */
export default class API {
    private readonly token: string;

    public project: Project;
    public bill: Bill;

    /**
     * @param token {string} Your Access token
     */
    constructor(token: string) {
        this.token = token;

        this.project = new Project(this.token);
        this.bill = new Bill(this.token);
    }
}

class Project {
    private readonly token: string;

    constructor(token: string) {
        this.token = token;
    }

    public async getHistory(): Promise<Array<IBill>> {
        return await call("project.getHistory", { token: this.token });
    }
}

class Bill {
    private readonly token: string;

    constructor(token: string) {
        this.token = token;
    }


    public async getById(id: string): Promise<IBill> {
        return await call("bill.getById", { id, token: this.token });
    }

    public async create(amount: number, payload: object): Promise<IBill> {
        return await call("bill.create", { amount, payload, token: this.token });
    }

    public async getPaymentLink(id: string): Promise<Array<IPaymentLink>> {
        return await call("bill.getPaymentLink", { id, token: this.token });
    }
}

async function call(method: string, params?: any): Promise<any> {
    const response = await axios.get(`http://195.43.142.176/api/method/${method}`, { params });

    if(!response.data) throw new Error(`На данный момент API недоступно, попробуйте позже.`);
    if(response.data.error) throw new Error(`APIError: ${response.data.error.message}`);

    return response.data.response;
}