declare module Election {
    interface createPayload {

        title: string,
        description: string,
        startTime:string
        endTime:string
        options: createElectionOptionPayload[]

    }

    interface createVote {
        electionId : number,
        optionId: number
    }


    interface createElectionOptionPayload {

        title: string,
        description: string

    }

    interface updatePayload {

        title: string,
        description: string,
        status: 'pending' | 'active' | 'completed' | 'canceled'
        options: updateElectionOptionPayload[]

    }

    interface updateElectionOptionPayload {

        title: string,
        description: string,
        id: number

    }
}

