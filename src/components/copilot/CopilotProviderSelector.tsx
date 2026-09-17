import React from 'react';
import { CopilotProvider } from '../../types';
import { 
  Sparkles, 
  GraduationCap, 
  Bot, 
  Globe, 
  Database,
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface CopilotProviderSelectorProps {
  selectedProvider: CopilotProvider;
  onSelectProvider: (provider: CopilotProvider) => void;
  disabled?: boolean;
}

export const COPILOT_PROVIDERS: Array<{
  id: CopilotProvider;
  name: string;
  tagline: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  themeColor: string;
  borderActive: string;
  bgActive: string;
  textActive: string;
  pillBg: string;
}> = [
  {
    id: 'studenthub',
    name: 'StudentHub AI',
    tagline: 'Nigerian Academic Repository',
    badge: 'Database & Syllabi',
    icon: Database,
    description: 'Searches StudentHub NG database: 160+ institutions, 10-year past questions, lecture notes, and NUC/NBTE benchmarks.',
    themeColor: 'emerald',
    borderActive: 'border-emerald-500 dark:border-emerald-500 ring-2 ring-emerald-500/20',
    bgActive: 'bg-emerald-50/80 dark:bg-emerald-950/40',
    textActive: 'text-emerald-900 dark:text-emerald-200',
    pillBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    tagline: 'Pedagogical Explainer',
    badge: 'Gemini 3.8 Flash',
    icon: Sparkles,
    description: 'Deep step-by-step concept breakdown, revision sheets, practice questions, and final-year project advising.',
    themeColor: 'indigo',
    borderActive: 'border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/20',
    bgActive: 'bg-indigo-50/80 dark:bg-indigo-950/40',
    textActive: 'text-indigo-900 dark:text-indigo-200',
    pillBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300'
  },
  {
    id: 'chatgpt',
    name: 'OpenAI ChatGPT',
    tagline: 'Analytical Reasoner',
    badge: 'gpt-4o-mini',
    icon: Bot,
    description: 'Analytical derivations, structured problem solving, code and mathematical modeling via secure server API.',
    themeColor: 'teal',
    borderActive: 'border-teal-500 dark:border-teal-500 ring-2 ring-teal-500/20',
    bgActive: 'bg-teal-50/80 dark:bg-teal-950/40',
    textActive: 'text-teal-900 dark:text-teal-200',
    pillBg: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300'
  },
  {
    id: 'web',
    name: 'Web Research',
    tagline: 'Scholarly Web & OER',
    badge: 'Browser Research Links',
    icon: Globe,
    description: 'Searches scholarly open access sources (Google Scholar, NOUN, OpenStax, ResearchGate) with browser links.',
    themeColor: 'blue',
    borderActive: 'border-blue-500 dark:border-blue-500 ring-2 ring-blue-500/20',
    bgActive: 'bg-blue-50/80 dark:bg-blue-950/40',
    textActive: 'text-blue-900 dark:text-blue-200',
    pillBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
  }
];

export const CopilotProviderSelector: React.FC<CopilotProviderSelectorProps> = ({
  selectedProvider,
  onSelectProvider,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <span>Choose Study Assistance Provider:</span>
        </label>
        <span className="text-[11px] text-slate-400 font-medium">
          4 Integrated Academic Sources
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {COPILOT_PROVIDERS.map((provider) => {
          const isSelected = selectedProvider === provider.id;
          const Icon = provider.icon;

          return (
            <button
              key={provider.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelectProvider(provider.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? `${provider.borderActive} ${provider.bgActive} shadow-sm`
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {provider.name}
                    </span>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 ${provider.pillBg}`}
                  >
                    {provider.badge}
                  </span>
                </div>

                <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mt-1">
                  {provider.description}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">
                  {provider.tagline}
                </span>
                {isSelected && (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                    ● Active
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
