import { useProfile } from '@/modules/users';
import { useGetVehicleByIdQuery } from '@/modules/content/api/getVehicleDetail';

/**
 * Custom hook to check if the current user is the quality checker owner of a specific vehicle.
 *
 * This hook fetches the vehicle details and the user's profile, and determines if the current user
 * is the owner of the quality check for the given vehicle.
 *
 * @param vehicleId - The ID of the vehicle to check.
 * @returns An object containing a boolean indicating if the current user is the quality checker owner.
 *
 */
export const useQualityCheck = (vehicleId: string) => {
  const { data: vehicleData } = useGetVehicleByIdQuery({
    variables: { vehicleId },
  });

  const { profile } = useProfile();

  const isQualityCheckerOwner =
    profile?.id ===
    vehicleData?.vehicleDetail.vehicle.photoQualityCheckerUserId;

  return { isQualityCheckerOwner };
};
