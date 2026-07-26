import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function PageContainer({ title, description, children, action }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F9FAFB] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {(title || description || action) && (
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#E5E7EB] gap-4">
            <div>
              {title && <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] tracking-tight">{title}</h1>}
              {description && <p className="mt-1 text-sm text-[#6B7280]">{description}</p>}
            </div>
            {action && <div>{action}</div>}
          </div>
        )}
        
        <main>{children}</main>

        {/* Required Disclaimer Footer */}
        <footer className="pt-8 text-center border-t border-[#E5E7EB] flex flex-col items-center justify-center gap-1 text-xs text-[#6B7280]">
          <div className="flex items-center gap-1.5 font-medium text-[#6B7280]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#6FCB65]" />
            <span>AI-assisted prediction, not a guaranteed performance promise</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
