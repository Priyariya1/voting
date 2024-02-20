import { PrismaClient,  } from '@prisma/client'



export const db  = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});


export const UsersRepository = db.user;

export const PickupRequestRepository = db.pickupRequest;

export const ElectionRepository = db.election;

export const ElectionOptionRepository = db.pollingOptions;

export const VoteRepository = db.vote;






