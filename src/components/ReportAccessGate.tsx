import React, { ReactNode } from 'react';
import { CanonicalReportType } from '../types/reportAccess';

interface ReportAccessGateProps {
  reportType: CanonicalReportType | string;
  profileKey?: string;
  profileName?: string;
  mobile?: string;
  title?: string;
  children: ReactNode;
  fallback?: ReactNode;
  [key: string]: any;
}

export const ReportAccessGate: React.FC<ReportAccessGateProps> = ({ children }) => {
  // Pass-through container ensuring seamless access to generated reports
  return <>{children}</>;
};

export default ReportAccessGate;
