import { useState, useEffect } from 'react';
import { CanonicalReportType } from '../types/reportAccess';
import { ReportAccessService } from '../services/reportAccessService';

export function useReportAccess(reportType: CanonicalReportType, profileKey: string = 'default_profile') {
  const [hasAccess, setHasAccess] = useState<boolean>(true);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(true);
  const [isFreeEligible, setIsFreeEligible] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    ReportAccessService.checkAccess(reportType, profileKey)
      .then(res => {
        if (mounted && res) {
          setHasAccess(res.hasAccess !== false);
          setIsUnlocked(res.isUnlocked !== false);
          setIsFreeEligible(res.isFreeEligible !== false);
        }
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, [reportType, profileKey]);

  const unlockReport = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      if (isFreeEligible) {
        await ReportAccessService.claimFreeReport(reportType, profileKey);
      }
      setIsUnlocked(true);
      setHasAccess(true);
    } catch (e: any) {
      setError(e?.message || 'Failed to unlock report');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    hasAccess,
    isUnlocked,
    isFreeEligible,
    isProcessing,
    error,
    unlockReport
  };
}
