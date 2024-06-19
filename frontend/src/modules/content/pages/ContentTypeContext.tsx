import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ContentItemType } from '../types';

interface ContentTypeContextProps {
  currentContentType: ContentItemType | undefined;
  setCurrentContentType: (contentType: ContentItemType) => void;
}

// Create a context with an undefined initial value
const ContentTypeContext = createContext<ContentTypeContextProps | undefined>(
  undefined,
);

export const ContentTypeProvider: React.FC<{
  children: ReactNode;
  initialContentType?: ContentItemType;
}> = ({ children, initialContentType }) => {
  // State to hold the current content type
  const [currentContentType, setCurrentContentType] = useState<
    ContentItemType | undefined
  >(initialContentType);

  return (
    <ContentTypeContext.Provider
      value={{ currentContentType, setCurrentContentType }}
    >
      {children}
    </ContentTypeContext.Provider>
  );
};

// Custom hook to use the ContentTypeContext
export const useContentType = () => {
  const context = useContext(ContentTypeContext);
  if (!context) {
    console.error('useContentType must be used within a ContentTypeProvider');
    throw new Error('useContentType must be used within a ContentTypeProvider');
  }
  return context;
};
