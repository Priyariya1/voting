import axios from "axios";

export class PickupClient{

    static async getAll(){
        const response = await axios.get<API.pickup[]>('/request');

        return response.data
    }

    static async create(payload:API.createPickupPayload){
        const response = await axios.post<API.pickup>('/request',payload)

        return response.data
    }

    static async cancel(requestId:number){

        const response = await axios.delete<API.pickup>(`/request/${requestId}`);

        return response.data;
    }
}