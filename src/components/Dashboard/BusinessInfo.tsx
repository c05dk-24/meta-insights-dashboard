import React from 'react';
import { Building2, Facebook } from 'lucide-react';

interface Props {
  companyName?: string;
  adAccountName?: string;
  isLoading: boolean;
}

export const BusinessInfo: React.FC<Props> = ({ 
  companyName, 
  adAccountName, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="mt-2 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="mt-2 text-sm text-gray-600 space-y-1">
      {companyName && (
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          <span>{companyName}</span>
        </div>
      )}
      {adAccountName && (
        <div className="flex items-center gap-2">
          <Facebook className="w-4 h-4" />
          <span>{adAccountName}</span>
        </div>
      )}
    </div>
  );
};