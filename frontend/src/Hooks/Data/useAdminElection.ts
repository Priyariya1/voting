import { useMutation, useQuery, useQueryClient } from "react-query";
import { AdminClient } from "../../Api/admin";

export const useAdminElection = (electionId: string) => {
    const queryClient = useQueryClient()

    const election = useQuery([ 'admin/elections', electionId ], () => AdminClient.getElectionById(electionId));

    const update = useMutation((value: API.updateElectionPayload) => AdminClient.update(value), {

        onSuccess: () => queryClient.invalidateQueries([ 'admin/elections', electionId ]),

    })

    const addVote = useMutation((value: API.createVoteParams) => AdminClient.addVote(value), {

        onSuccess: () => {
            queryClient.invalidateQueries([ 'admin/elections', electionId ])

            queryClient.invalidateQueries([ 'admin/elections', electionId ])
        },

    })

    const getVote = useQuery([ 'admin/elections/vote', electionId ], () => AdminClient.getVote(electionId));

    const deleteOption = useMutation((optionId: number) => AdminClient.deleteOption(optionId), {

        onSuccess: () => queryClient.invalidateQueries([ 'admin/elections', electionId ]),

    })
    const deleteElection = useMutation((optionId: number) => AdminClient.deleteElection(optionId), {

        onSuccess: () => queryClient.invalidateQueries([ 'admin/elections', electionId ]),

    })

    return { ...election, update, deleteOption, addVote, getVote,deleteElection }
}