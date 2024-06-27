import React from 'react';
import { Checkbox } from '../Checkbox/Checkbox';

interface Vehicle {
  id: number;
  images: string[];
  brand: string;
  price: string;
  kilometers: string;
}

interface VehicleSelectorProps {
  selectedVehicle: Vehicle | undefined;
  vehicles: Vehicle[];
  handleVehicleSelect: (vehicle: Vehicle) => void;
}

/**
 * VehicleSelector component displays a list of vehicles and allows the user to select a vehicle.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Vehicle} props.selectedVehicle - The currently selected vehicle.
 * @param {Vehicle[]} props.vehicles - The list of vehicles to display.
 * @param {Function} props.handleVehicleSelect - The function to handle vehicle selection.
 * @returns {JSX.Element} The rendered VehicleSelector component.
 */
const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  selectedVehicle,
  vehicles,
  handleVehicleSelect,
}) => {
  return (
    <div className="space-y-4 p-6">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          className="flex items-center rounded-xl border border-gray-50 bg-white"
        >
          <div className="rounded-xl p-1">
            <img
              src={vehicle.images[0]}
              alt={vehicle.brand}
              className="mr-4 h-32 w-32 flex-shrink-0 rounded-xl object-cover p-4"
            />
          </div>
          <div>
            <div className=" flex items-center font-bold">
              <p>{vehicle.brand}</p>
            </div>
            <p>
              {vehicle.price} | {vehicle.kilometers}
            </p>
          </div>
          <Checkbox
            checked={selectedVehicle && selectedVehicle.id === vehicle.id}
            onChange={() => handleVehicleSelect(vehicle)}
          />
        </div>
      ))}
    </div>
  );
};

export default VehicleSelector;
