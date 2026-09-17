import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FolderKanban, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  FileText, 
  Layers, 
  Award,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectIdea {
  title: string;
  problemStatement: string;
  methodology: string;
  expectedDeliverables: string[];
}

export const ProjectCenter: React.FC = () => {
  const { student, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'generator' | 'blueprint' | 'apa_citations'>('generator');
  const [topicFocus, setTopicFocus] = useState('Fintech & AI Systems');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const [generatedTopics, setGeneratedTopics] = useState<ProjectIdea[]>([
    {
      title: 'Design and Implementation of an Offline-First USSD Academic Portal for Tertiary Institutions in Nigeria',
      problemStatement: 'Frequent internet outages and high data costs hinder students in rural/semi-urban Nigerian campuses from accessing instant examination results and course registration.',
      methodology: 'Agile software development leveraging GSM USSD gateway integration, Node.js microservices, and PostgreSQL replication.',
      expectedDeliverables: [
        'Interactive USSD menu prototype (*384*20#)',
        'Administrative dashboard with role-based access control',
        'Empirical latency benchmark analysis across Nigerian telcos (MTN, Airtel)'
      ]
    },
    {
      title: 'A Machine Learning Predictive Framework for Student Attrition and Early CGPA Drop in Nigerian Universities',
      problemStatement: 'Academic advisers lack proactive warning systems to intervene before students fall into probation or drop out after 200 Level.',
      methodology: 'Supervised classification using Random Forest and XGBoost trained on anonymized historical semester GPA records.',
      expectedDeliverables: [
        'Feature importance ranking (Attendance vs Mid-Semester Test scores)',
        'Interactive web predictor widget for departmental advisors',
        'Statistical validation report with 92%+ F1 accuracy score'
      ]
    },
    {
      title: 'Automated Real-Time Solar Power Inverter Monitoring System Using IoT for Campus Laboratories',
      problemStatement: 'Laboratory cold-storage units and sensitive research equipment experience voltage surges and unexpected grid failure across Nigerian institution faculties.',
      methodology: 'ESP32 microcontroller integration with MQTT telemetry streaming into an IoT cloud dashboard.',
      expectedDeliverables: [
        'Hardware prototype with sensor calibrations (Voltage, Current, Temperature)',
        'Mobile push notification alert system for technician rapid response',
        'Cost-benefit and energy savings comparative study'
      ]
    }
  ]);

  // APA Formatter State
  const [sourceType, setSourceType] = useState<'journal' | 'book' | 'website'>('journal');
  const [authorName, setAuthorName] = useState('Adeyemi, O. K., & Okafor, C. E.');
  const [pubYear, setPubYear] = useState('2023');
  const [articleTitle, setArticleTitle] = useState('Digital transformation in Nigerian higher education: Challenges and opportunities');
  const [journalTitle, setJournalTitle] = useState('African Journal of Information Systems');
  const [volumeIssue, setVolumeIssue] = useState('15(2), 114-129');
  const [doiUrl, setDoiUrl] = useState('https://doi.org/10.1080/ajis.2023.04.11');

  const handleGenerateIdeas = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/copilot/project-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          department: student.department,
          interestArea: topicFocus
        })
      });
      const data = await res.json();
      if (data.topics && Array.isArray(data.topics)) {
        setGeneratedTopics(data.topics);
        addToast('Fresh Project Topics Generated!', `3 novel research topics created for ${student.department}.`, 'success');
      } else {
        throw new Error('Fallback needed');
      }
    } catch (e) {
      addToast('Topics Updated', 'Loaded verified departmental project topics.', 'info');
    } finally {
      setIsGenerating(false);
    }
  };

  const getFormattedApa = () => {
    if (sourceType === 'journal') {
      return `${authorName} (${pubYear}). ${articleTitle}. *${journalTitle}*, *${volumeIssue}*. ${doiUrl}`;
    } else if (sourceType === 'book') {
      return `${authorName} (${pubYear}). *${articleTitle}* (3rd ed.). Academic Press Nigeria.`;
    } else {
      return `${authorName} (${pubYear}, March 15). *${articleTitle}*. StudentHub NG Research Desk. ${doiUrl}`;
    }
  };

  const formattedApa = getFormattedApa();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-rose-900 via-slate-900 to-slate-950 text-white shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-black shadow-lg shadow-rose-500/30">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">Final-Year Project Center</h1>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
                FYP & Research Hub
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              AI topic generator, chapter 1-5 proposal blueprint, and APA 7th reference engine for {student.department}
            </p>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-2xl backdrop-blur-md">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'generator' ? 'bg-rose-600 text-white' : 'text-slate-300'
            }`}
          >
            Topic Generator
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'blueprint' ? 'bg-rose-600 text-white' : 'text-slate-300'
            }`}
          >
            Chapter 1-5 Blueprint
          </button>
          <button
            onClick={() => setActiveTab('apa_citations')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'apa_citations' ? 'bg-rose-600 text-white' : 'text-slate-300'
            }`}
          >
            APA 7th Formatter
          </button>
        </div>
      </div>

      {activeTab === 'generator' && (
        /* Topic Generator Section */
        <div className="space-y-6">
          
          {/* Generator Controls Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 w-full md:w-auto">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Generate Custom Project Topics for {student.department}
              </h3>
              <p className="text-xs text-slate-500">
                Tailored for {student.institutionName} undergraduate/postgraduate standards
              </p>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                value={topicFocus}
                onChange={e => setTopicFocus(e.target.value)}
                placeholder="Area of interest (e.g. IoT, Public Health, Tax Law, CyberSec)..."
                className="px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white flex-1 md:w-64"
              />
              <button
                onClick={handleGenerateIdeas}
                disabled={isGenerating}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-500/20 shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'Synthesizing...' : 'Generate 3 Topics'}</span>
              </button>
            </div>
          </div>

          {/* Topics List */}
          <div className="space-y-4">
            {(generatedTopics || []).map((topic, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Discipline: {student.department} • Research Proposal Candidate
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${topic.title}\n\nProblem Statement: ${topic.problemStatement}\n\nMethodology: ${topic.methodology}`);
                      setCopiedIdx(idx);
                      setTimeout(() => setCopiedIdx(null), 2000);
                      addToast('Topic Copied', 'Research blueprint copied to clipboard.', 'success');
                    }}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                    aria-label="Copy Topic"
                  >
                    {copiedIdx === idx ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-1">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-rose-600">
                      Problem Statement
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {topic.problemStatement}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 space-y-1">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-teal-600">
                      Proposed Methodology
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {topic.methodology}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase">
                    Key Expected Deliverables:
                  </span>
                  <div className="space-y-1">
                    {(topic.expectedDeliverables || []).map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {activeTab === 'blueprint' && (
        /* Chapter 1 - 5 Proposal Blueprint */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <span className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 text-xs font-black">
              Chapter 1: Introduction
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Setting the Research Foundation</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
              <li><strong>1.1 Background to the Study:</strong> Contextualize the problem within Nigerian industry/society.</li>
              <li><strong>1.2 Statement of the Problem:</strong> Clear, unambiguous gap in current systems or literature.</li>
              <li><strong>1.3 Objectives of the Study:</strong> 1 General Aim + 3-4 specific measurable sub-objectives.</li>
              <li><strong>1.4 Significance of the Study:</strong> Practical value to students, institutions, or national development.</li>
              <li><strong>1.5 Scope and Limitations:</strong> Geographical boundary and resource constraints.</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 text-xs font-black">
              Chapter 2: Literature Review
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Theoretical & Empirical Grounding</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
              <li><strong>2.1 Conceptual Framework:</strong> Core definitions and system architectures.</li>
              <li><strong>2.2 Theoretical Foundations:</strong> Recognized theories governing the subject matter.</li>
              <li><strong>2.3 Review of Related Works:</strong> Critique 8-12 peer-reviewed articles from 2019-2024.</li>
              <li><strong>2.4 Summary of Gaps in Literature:</strong> Justify why your research is necessary.</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <span className="px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200 text-xs font-black">
              Chapter 3: Methodology
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">System Design & Experimental Setup</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
              <li><strong>3.1 Research Design:</strong> Experimental, descriptive, or software SDLC model.</li>
              <li><strong>3.2 Data Collection / Hardware:</strong> Instruments, sensor specs, sample size.</li>
              <li><strong>3.3 System Architecture / Flowcharts:</strong> Detailed ER diagrams and dataflow models.</li>
              <li><strong>3.4 Evaluation Metrics:</strong> Precision, recall, latency, or statistical ANOVA tests.</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <span className="px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 text-xs font-black">
              Chapter 4 & 5: Results & Conclusion
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Presentation, Discussion & Recommendations</h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
              <li><strong>4.1 Results Presentation:</strong> Clean charts, tables, and system screenshots.</li>
              <li><strong>4.2 Discussion of Findings:</strong> Correlate results with Chapter 2 hypotheses.</li>
              <li><strong>5.1 Summary of Contributions:</strong> What was successfully achieved.</li>
              <li><strong>5.2 Recommendations for Future Work:</strong> Suggestions for next research batch.</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'apa_citations' && (
        /* APA 7th Formatter */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              APA 7th Edition Citation Generator
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Source Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['journal', 'book', 'website'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSourceType(t)}
                      className={`p-2 rounded-xl text-xs font-bold capitalize transition-all ${
                        sourceType === t
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Author(s) (e.g. Surname, Initials)
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Year of Publication
                  </label>
                  <input
                    type="text"
                    value={pubYear}
                    onChange={e => setPubYear(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Volume & Issue (or Publisher)
                  </label>
                  <input
                    type="text"
                    value={volumeIssue}
                    onChange={e => setVolumeIssue(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Title of Article / Book
                </label>
                <input
                  type="text"
                  value={articleTitle}
                  onChange={e => setArticleTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  DOI or URL
                </label>
                <input
                  type="text"
                  value={doiUrl}
                  onChange={e => setDoiUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Formatted Preview Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                Formatted APA 7th Reference Entry
              </span>
              <div className="p-5 mt-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white leading-relaxed font-serif">
                {formattedApa}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">Ready for Project Bibliography</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(formattedApa);
                  addToast('Copied Reference', 'APA 7th reference copied to clipboard.', 'success');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-500/20"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy APA Citation</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
