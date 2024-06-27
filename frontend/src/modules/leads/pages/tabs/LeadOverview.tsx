import { UserDetailSkeleton } from '@/modules/users/components/UserDetailSkeleton';
// import LeadDealership from '../../components/LeadDealership';
// import LeadDocument from '../../components/LeadDocument';
import LeadHistory from '../../components/LeadHistory';
import LeadInfo from '../../components/LeadInfo';
// import LeadSchedule from '../../components/LeadSchedule';
import LeadVehicleProposed from '../../components/LeadVehicleProposed';
import { LeadData  } from '../../types/leadTypes';
import { FC } from 'react';

interface LeadOverviewProps {
  data: LeadData;
  onChange: (values: any) => void;
  isSaving: boolean;
}

/**
 * Renders the overview page for a lead.
 * @returns The LeadOverview component.
 */
const LeadOverview: FC<LeadOverviewProps> = ({ data, onChange, isSaving }: LeadOverviewProps) => {
  if (!data || !data.leadById) {
    return <UserDetailSkeleton />;
  }
 
  const { leadById } = data;

  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
      <div className="md:col-span-2">
        {/* <LeadDealership
          market={'France'}
          dealership={'Garage Gros'}
          platform={leadById?.platform || ""}
          creationDate={leadById?.createdAt || ""}
        /> */}
      </div>

      <LeadInfo
        isSaving={isSaving}
        data={leadById}
        onSubmit={onChange}
        />
      <LeadVehicleProposed />
      <LeadHistory />
      {/* <LeadSchedule />
      <LeadDocument /> */}
    </div>
  );
};

export default LeadOverview;
