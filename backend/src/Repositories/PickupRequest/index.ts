import { PickupRequestRepository } from "../../DB";

export async function getRequestsByUserId(userId: number) {
    return await PickupRequestRepository.findMany({ where: { user_id: userId } });
}

export async function getRequestById(requestId: number) {
    return await PickupRequestRepository.findFirst({ where: { id: requestId } });
}

export async function getAllPickups(filter:{status?: string,limit?:number,offset?:number} ) {

    const {limit,offset,status} = filter ?? {}

    const queryFilter ={} as any;

    if(limit !== undefined) queryFilter.take = limit;

    if(offset !==undefined) queryFilter.skip = offset;
    
    if(status)queryFilter.where = {status};

    return await PickupRequestRepository.findMany({ orderBy: { createdAt: 'desc' }, ...queryFilter  })
}