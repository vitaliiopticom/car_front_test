import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Heading, Button } from '@/components/elements';
import { t } from 'i18next';
import VehicleInfo from './VehicleInfo';

import { useGetLeadVehiclesQuery } from '../api/getLeadVehiclesById';
import { ProposedVehiclesSkeleton } from '@/modules/leads/components/skeletons';
import { AddProposedVehicleModel } from './AddProposedVehiclesModel';


/**
 * Renders the section for displaying the proposed vehicles in a lead.
 * @returns JSX.Element
 */
const LeadVehicleProposed = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, loading, refetch } = useGetLeadVehiclesQuery({
    variables: { leadId: id || '' },
  });

  const { leadVehiclesById } = data! || {};
  const leadVehicles = leadVehiclesById?.leadVehicles || []
  return (
    <>
      <section>
        <Card className="mb-5">


          <div className="mb-4 flex items-center justify-between">
            <Heading className="mb-4" variant="h4">
              {t('lead.vehicleProposed')}
            </Heading>
            <div className="flex space-x-2">
              {/* <Button className="p-2" variant="secondary" startIcon="eye" /> */}
              <Button onClick={openModal} className="p-2" startIcon="plus" />
            </div>
          </div>


          <div className="grid grid-cols-1 gap-4">
            {loading ? <ProposedVehiclesSkeleton /> :
              <>{leadVehicles?.map((vehicle: any) => (
                <VehicleInfo key={vehicle.id} vehicle={vehicle} />
              ))}</>
            }
          </div>
        </Card>
      </section>


      {isModalOpen && <AddProposedVehicleModel
        refetch={refetch}
        isLoading={loading}
        closeModal={closeModal}
        isOpen={isModalOpen}
        leadVehicles={leadVehicles}
      />}
    </>
  );
};

export default LeadVehicleProposed;
