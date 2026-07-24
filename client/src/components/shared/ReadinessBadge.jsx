import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function ReadinessBadge({ verdict = 'Ready', score = 80 }) {
  const getBadgeStyle = () => {
    if (score >= 75 || verdict.toLowerCase().includes('strong') || verdict.toLowerCase().includes('ready')) {
      return {
        bg: 'bg-[#A8E6A1]/40 text-[#1F2937] border-[#6FCB65]',
        icon: CheckCircle2,
        label: verdict || 'Ready to Publish'
      };
    }
    if (score >= 55 || verdict.toLowerCase().includes('moderate') || verdict.toLowerCase().includes('needs')) {
      return {
        bg: 'bg-[#FEF08A]/50 text-[#854D0E] border-[#FDE047]',
        icon: AlertTriangle,
        label: verdict || 'Needs Minor Edits'
      };
    }
    return {
      bg: 'bg-[#FEE2E2] text-[#991B1B] border-[#FCA5A5]',
      icon: XCircle,
      label: verdict || 'Needs Revision'
    };
  };

  const style = getBadgeStyle();
  const Icon = style.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-sm font-semibold shadow-xs ${style.bg}`}>
      <Icon className="w-4 h-4" />
      <span>{style.label}</span>
    </div>
  );
}
