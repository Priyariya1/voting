declare module API {

    interface Election {
        id: number
        createdAt: string
        description: string
        status: string
        title: string
        startingDate : string,
        endingDate : string,
        options: Option[]
        _count: count
    }

    interface Option {
        id: number
        description: string
        title: string
        _count: Count
    }

    interface Count {
        vote: number
    }

    interface createElectionPayload {
        title: string
        description: string
        options: { title: string, description: string }[]
    }


    interface updateElectionPayload extends createElectionPayload {
        electionId: string
        status : string
        options: { title: string, description: string, id : number }[]
    }
    

    interface createVoteParams {
        electionId : number,
        optionId : number
    }


    interface pickup {
        id: number
        address: string
        status: string
        quantity: number
        createdAt: string
        updatedAt: string
        user_id: number
    }

    interface createPickupPayload {
        address: string,
        quantity: number,
    }

    interface adminPickupUpdateParams {
        pickupId: number,
        status: string,
    }
}

