import { useState } from 'react';

interface Vehicle {
  id: number;
  images: string[];
  brand: string;
  price: string;
  kilometers: string;
}

/**
 * Custom hook for managing vehicle selection.
 * @returns An object containing the selected vehicle and a function to handle vehicle selection.
 */
const useVehicle = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(
    undefined,
  );

  const handleVehicleSelect = (vehicle: Vehicle) => {
    if (selectedVehicle && selectedVehicle.id === vehicle.id) {
      setSelectedVehicle(undefined);
    } else {
      setSelectedVehicle(vehicle);
    }
  };

  return {
    selectedVehicle,
    handleVehicleSelect,
  };
};

export default useVehicle;
