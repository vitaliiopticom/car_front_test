import React, { useCallback, useState } from 'react';
import { Modal } from '../Modal/Modal';
import 'react-quill/dist/quill.snow.css';
import { Button } from '../Button/Button';
import { useTranslation } from '@/i18n';
import { Switch } from '../Switch/Switch';
import { Text } from '../Text/Text';
import VehicleSelector from '../VehicleSelector/VehicleSelector';
import EmailForm from '../EmailForm/EmailForm';
import useEmail from '@/hooks/useEmail';
import useVehicle from '@/hooks/useVehicle';
import car1 from '../../../modules/leads/images/car1.jpg';
import car2 from '../../../modules/leads/images/car2.webp';
import car3 from '../../../modules/leads/images/car3.webp';

const vehicles: Vehicle[] = [
  {
    id: 1,
    images: [car1, car1, car1, car1, car1, car1],
    brand: 'Renault Arkana ',
    price: '2.000€',
    kilometers: '1.000 km',
  },
  {
    id: 2,
    images: [car2, car2, car2, car2, car2, car2],
    brand: 'Lamborghini Huracan',
    price: '1.233.000€',
    kilometers: '100.000 km',
  },
  {
    id: 3,
    images: [car3, car3, car3, car3, car3, car3],
    brand: 'Lexus ES ',
    price: '23.000€',
    kilometers: '10.000 km',
  },
];

type ModalEmailProps = {
  onClose: () => void;
  isOpen: boolean;
};

interface Vehicle {
  id: number;
  images: string[];
  brand: string;
  price: string;
  kilometers: string;
}

/**
 * ModalEmail component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onClose - The function to close the modal.
 * @param {boolean} props.isOpen - Indicates whether the modal is open or not.
 * @returns {JSX.Element} The ModalEmail component.
 */
const ModalEmail: React.FC<ModalEmailProps> = ({ onClose, isOpen }) => {
  const { t } = useTranslation();
  const {
    recipient,
    cc,
    bcc,
    showCc,
    showBcc,
    subject,
    body,
    emailAttachments,
    handleEmailChange,
    setEmailAttachments,
  } = useEmail();
  const { selectedVehicle, handleVehicleSelect } = useVehicle();
  const [toggleAttachments, setToggleAttachments] = useState(false);
  const sendEmail = () => {
    console.log('Sending email with data:', {
      recipient,
      cc,
      bcc,
      subject,
      body,
      emailAttachments,
    });
  };

  const updateToggleAttachments = useCallback(() => {
    setToggleAttachments(!toggleAttachments);
  }, [toggleAttachments]);

  const handleVehicleSelectWithImages = (vehicle: Vehicle) => {
    setEmailAttachments([]);
    if (vehicle) {
      const order = [1, 4, 2];
      handleVehicleSelect(vehicle);

      const newAttachments = order
        .map((index) => vehicle.images[index])
        .filter((image) => image)
        .map((image) => ({ path: image }));

      setEmailAttachments(newAttachments);
      console.log('Selected vehicle:', vehicle);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('common.sendMessage')}
      className="w-full  max-w-7xl"
    >
      <div className="flex flex-col p-4 md:flex-row">
        <div className="md:w-2/3">
          <EmailForm
            recipient={recipient}
            cc={cc}
            bcc={bcc}
            showCc={showCc}
            showBcc={showBcc}
            subject={subject}
            body={body}
            emailAttachments={toggleAttachments ? emailAttachments : []}
            handleEmailChange={handleEmailChange}
          />
        </div>
        <div className="ml-4 rounded-xl border bg-gray-20 md:w-1/3">
          <div className="email-templates-section">
            <div className="email-templates-header m-4 flex justify-center">
              <Button
                variant="secondary"
                children={t('common.emailTemplate')}
                className="w-full"
              />
            </div>
            <div className="pl-4 text-gray-90 ">
              <p>{t('common.insertVehicle')}</p>
            </div>
            <VehicleSelector
              selectedVehicle={selectedVehicle}
              vehicles={vehicles}
              handleVehicleSelect={handleVehicleSelectWithImages}
            />
            {/* PARAMETERS */}
            <div className="space-y-4 pl-4">
              <Text size="md" className="text-gray-90">
                {t('common.additionalParameters')}
              </Text>
              <div className="flex flex-row items-center">
                <Switch
                  checked={toggleAttachments}
                  onChange={updateToggleAttachments}
                />
                <Text size="lg" className="ml-10 text-gray-90">
                  {t('common.addImages')}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-4 flex justify-end space-x-4">
        <Button variant="secondary" onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button variant="primary" onClick={sendEmail}>
          {t('common.send')}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalEmail;
