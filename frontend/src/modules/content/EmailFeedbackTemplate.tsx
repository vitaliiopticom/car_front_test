import React from 'react';
import { feedbackItem } from '@/modules/content/components/ModalSendFeedback/ModalSendFeedback';
import logo from '../../../public/images/logo_color.svg';

export interface EmailTemplateProps {
  title: string;
  subtitle: string;
  greeting: string;
  checkFeedback: string;
  comments: string;
  photoDetails: string;
  bestRegards: string;
  teamName: string;
  managerName: string;
  managerTitle: string;
  managerEmail: string;
  managerPhone: string;
  googlePlayLink: string;
  appStoreLink: string;
  contactUsLink: string;
  servicesLink: string;
  legalText: string;
  feedbackItems: feedbackItem[];
  buttonText: string;
}

const EmailFeedbackTemplate: React.FC<EmailTemplateProps> = ({
  title,
  subtitle,
  greeting,
  checkFeedback,
  comments,
  photoDetails,
  bestRegards,
  teamName,
  managerName,
  managerTitle,
  managerEmail,
  managerPhone,
  googlePlayLink,
  appStoreLink,
  contactUsLink,
  servicesLink,
  legalText,
  feedbackItems,
  buttonText,
}) => {
  return (
    <div className="m-0 bg-gray-100 p-0 font-sans">
      <div className="mx-auto max-w-xl bg-white p-10 shadow-lg">
        <img alt="Icon" className="w-1/4" src={logo} />
        <div className="mb-5 flex items-center">
          <h2 className="ml-5 text-2xl text-black">
            {title} <span className="text-gray-600">{subtitle}</span>
          </h2>
        </div>
        <div className="mt-5 px-10 text-black">
          <p>
            Dear <strong>{greeting}</strong>,
          </p>
          <p>{checkFeedback}</p>
          <p>{comments}</p>
          <p>{photoDetails}</p>
          <div className="mt-5 flex flex-col items-center">
            {feedbackItems.map((item, index) => (
              <div key={index} className="mb-5 flex items-center">
                <img
                  src={item.imageSrc}
                  alt={item.altText}
                  className="block w-full max-w-xs"
                  style={{ maxWidth: '150px' }}
                />
                <div className="ml-5 text-gray-600">
                  {item.issues.map((issue: string, issueIndex: React.Key) => (
                    <p key={issueIndex}>{issue}</p>
                  ))}
                  <a href={item.link} className="text-primary no-underline">
                    Open the photo ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="mx-auto mt-5 block w-52 rounded bg-primary py-2 text-center text-white no-underline"
          >
            {buttonText}
          </a>
          <p>{bestRegards}</p>
          <p>{teamName}</p>
        </div>
        <div className="mb-5 mt-5 flex items-center px-10 text-sm text-gray-600">
          <img
            src="images/1279483 Original.jpg"
            alt="Mike Spencer"
            className="mr-5 h-12 w-12 rounded-full"
          />
          <div>
            <p>
              <strong>{managerName}</strong>
              <br />
              {managerTitle}
            </p>
            <a
              className="text-gray-600 no-underline"
              href={`mailto:${managerEmail}`}
            >
              <u>{managerEmail}</u>
            </a>
            <br />
            <a
              href={`tel:${managerPhone}`}
              className="text-gray-600 no-underline"
            >
              <u>{managerPhone}</u>
            </a>
          </div>
        </div>
        <div className="bg-gray-800 p-10 text-left text-sm text-white">
          <ul className="list-none p-0">
            <li className="relative mb-2">
              <a href={googlePlayLink} className="text-white no-underline">
                Download (optipix) from Google Play
              </a>
              <div className="absolute bottom-0 left-0 h-px w-full bg-gray-600" />
            </li>
            <li className="relative mb-2">
              <a href={appStoreLink} className="text-white no-underline">
                Download (optipix) from App Store
              </a>
              <div className="absolute bottom-0 left-0 h-px w-full bg-gray-600" />
            </li>
            <li className="relative mb-2">
              <a href={contactUsLink} className="text-white no-underline">
                Contact us
              </a>
              <div className="absolute bottom-0 left-0 h-px w-full bg-gray-600" />
            </li>
            <li className="relative mb-2">
              <a href={servicesLink} className="text-white no-underline">
                Our services
              </a>
              <div className="absolute bottom-0 left-0 h-px w-full bg-gray-600" />
            </li>
          </ul>
          <div className="mt-5 text-xs text-gray-400">
            <p>{legalText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailFeedbackTemplate;
