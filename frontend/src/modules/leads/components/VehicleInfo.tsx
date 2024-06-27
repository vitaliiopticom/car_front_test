import { useTranslation } from '@/i18n';
import { format } from 'date-fns';

import { useGetVehicleByIdQuery } from '../api/getVehicleById';
import { ProposedVehicleSkeleton } from './skeletons/ProposedVehicleSkeleton';
import { VehicleDetails } from '../types/vehicleTypes';
import { Image } from '@/components/elements';
import { FALLBACK_IMAGE } from '@/common/constants'
import { useState } from 'react';
import VehicleInfoModel from './VehicleInfoModel';
import { useGetVehiclesQuery } from '../api/getVehicleImageByVin';


type Props = {
  vehicle: any;
}
/**
 * Renders the vehicle information component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.vehicle - The vehicle object containing information.
 * @returns {JSX.Element} The rendered vehicle information component.
 */
const VehicleInfo = ({ vehicle }: Props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, loading } = useGetVehicleByIdQuery({
    variables: {
      id: vehicle.vehicleId,
    },
  });

  const { data: data2, loading: loading2 } = useGetVehiclesQuery({
    variables: {
      inputParameters: {
        filterParameters: {
          vIN: vehicle.vIN,
        },
        pagingParameters: {
          pageIndex: 0,
          pageSize: 1,
        },
      },
    },
  });

  const vehicleById: any = data?.vehicleById;
  const image = data2?.vehicles?.vehicles?.items?.length ?
    data2?.vehicles?.vehicles?.items[0]?.detail?.coverImage?.image?.thumbnailUri
    : '';

  const { t } = useTranslation();
  return loading ?<ProposedVehicleSkeleton /> : (
    <>
    <div key={vehicleById.id} className="flex gap-2 items-center rounded border p-4" onClick={openModal}>
      {/* <img src={vehicle.image} alt={vehicleById.name} className="mr-4 h-24 w-24" /> */}

      <Image
        alt="alt"
        className="mr-4 h-24 w-24"
        fallbackPath={FALLBACK_IMAGE}
        src={image || FALLBACK_IMAGE}
      />


      <div className="flex flex-col basis-9/12">
        <div className="font-bold">{vehicleById.name}</div>
        {!!vehicleById.unitDetails[0].firstRegistration && <div>1st Regis. {format(vehicleById.unitDetails[0].firstRegistration, 'do MMM yyyy')}</div>}
        <div>Internal Reference (REF) {vehicleById.unitDetails[0].referenceForAd}</div>
        {!!vehicleById.unitDetails[0].availableFromDate && <div>Date available {format(vehicleById.unitDetails[0].availableFromDate, "do MMM yyyy")}</div>}
        <div className={vehicleById.unitDetails[0].available ? 'text-green-500' : 'text-red-500'}>
          {vehicleById.unitDetails[0].available ? t('lead.available') : t('lead.unavailable')}
        </div>
      </div>
      <div className="flex flex-col basis-3/12 h-full">
        <div className="font-bold">{vehicleById.price.netPrice} € TTC</div>
        <div className="justify-self-center">{vehicleById.unitDetails[0].kilometers} km</div>
      </div>
    </div>
    {isModalOpen && <VehicleInfoModel vehicle={vehicleById} closeModal={closeModal} image={image} />}
  </>);
};

export default VehicleInfo;
