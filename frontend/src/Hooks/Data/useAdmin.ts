import { useMutation, useQuery, useQueryClient } from "react-query";
import { AdminClient } from "../../Api/admin";
import { PickupClient } from "../../Api/pickups";

export function useAdmin() {
  const queryClient = useQueryClient()

  const elections = useQuery('admin/elections', AdminClient.getAllElections);
  

  const addMutation = useMutation((value: API.createElectionPayload) => AdminClient.create(value), {

    onSuccess: () => queryClient.invalidateQueries('admin/elections'),

  })

  // const updateStatus = useMutation((value: API.adminPickupUpdateParams) => AdminClient.update(value), {

  //   onSuccess: () => queryClient.invalidateQueries('admin'),

  // })
  const deleteMutation = useMutation((pickupId: number) => PickupClient.cancel(pickupId), {

    onSuccess: () => queryClient.invalidateQueries('pickups'),

  })

  return { elections: elections.data, ...elections, deleteMutation, addMutation };
}

