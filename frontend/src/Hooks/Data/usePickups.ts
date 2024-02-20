import { useMutation, useQuery, useQueryClient } from "react-query";
import { PickupClient } from "../../Api/pickups";

export function usePickup() {
  const queryClient = useQueryClient()

  const pickups = useQuery('pickups', PickupClient.getAll);

  const addMutation = useMutation((value: API.createPickupPayload) => PickupClient.create(value), {

    onSuccess: () => queryClient.invalidateQueries('pickups'),

  })
  const deleteMutation = useMutation((pickupId: number) => PickupClient.cancel(pickupId), {

    onSuccess: () => queryClient.invalidateQueries('pickups'),

  })

  return { pickups: pickups.data, ...pickups, createPickupMutation: addMutation, deleteMutation };
}

