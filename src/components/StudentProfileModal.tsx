import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_INSTITUTIONS } from '../data/academicStructureData';
import { 
  resolveFacultiesForInstitution, 
  resolveDepartmentsForFaculty, 
  resolveProgrammesForDepartment 
} from '../data/academicHierarchyResolver';
import { FacultyRecord, DepartmentRecord, Institution } from '../types';
import { getSchoolAccreditedLevels } from '../data/schoolAcademicData';
import { 
  User, 
  X, 
  Award, 
  QrCode, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Save, 
  Sparkles,
  School,
  Search,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LEVEL_OPTIONS = ['100L', '200L', '300L', '400L', '500L', 'Other'];

export const StudentProfileModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { student, updateStudent } = useApp();

  const [fullName, setFullName] = useState(student.fullName);
  const [matricNumber, setMatricNumber] = useState(student.matricNumber || '');
  const [institutionSearch, setInstitutionSearch] = useState('');
  
  // Selected Institution
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>(
    student.institutionId || ALL_INSTITUTIONS[0]?.id || 'unilag'
  );

  // Academic Hierarchy States
  const [faculty, setFaculty] = useState(student.faculty || '');
  const [department, setDepartment] = useState(student.department || '');
  const [programme, setProgramme] = useState(student.programme || '');
  const [level, setLevel] = useState(student.level || '100L');
  const [saving, setSaving] = useState(false);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFullName(student.fullName);
      setMatricNumber(student.matricNumber || '');
      const inst = ALL_INSTITUTIONS.find(
        i => i.id === student.institutionId || i.name === student.institutionName
      );
      if (inst) setSelectedInstitutionId(inst.id);
      setFaculty(student.faculty);
      setDepartment(student.department);
      setProgramme(student.programme);
      setLevel(student.level);
    }
  }, [isOpen, student]);

  const selectedInstitution = useMemo<Institution>(() => {
    return (
      ALL_INSTITUTIONS.find(inst => inst.id === selectedInstitutionId) ||
      ALL_INSTITUTIONS[0]
    );
  }, [selectedInstitutionId]);

  // Search filter for institutions
  const filteredInstitutions = useMemo(() => {
    if (!institutionSearch.trim()) return ALL_INSTITUTIONS.slice(0, 100);
    const q = institutionSearch.toLowerCase();
    return ALL_INSTITUTIONS.filter(
      inst =>
        inst.name.toLowerCase().includes(q) ||
        inst.shortName.toLowerCase().includes(q) ||
        inst.state.toLowerCase().includes(q)
    ).slice(0, 80);
  }, [institutionSearch]);

  // Dynamically resolved faculties
  const availableFaculties = useMemo(() => {
    if (!selectedInstitution) return [];
    return resolveFacultiesForInstitution(selectedInstitution);
  }, [selectedInstitution]);

  // Dynamically resolved departments
  const availableDepartments = useMemo(() => {
    if (!selectedInstitution || !faculty) return [];
    const facRecord: FacultyRecord = {
      id: `fac_${selectedInstitution.id}_${faculty.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      name: faculty,
      code: faculty.slice(0, 4).toUpperCase(),
      institutionId: selectedInstitution.id,
      institutionName: selectedInstitution.name
    };
    return resolveDepartmentsForFaculty(facRecord, selectedInstitution);
  }, [selectedInstitution, faculty]);

  // Dynamically resolved programmes
  const availableProgrammes = useMemo(() => {
    if (!selectedInstitution || !department) return [];
    const deptRecord: DepartmentRecord = {
      id: `dept_${selectedInstitution.id}_${department.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      name: department,
      code: department.slice(0, 4).toUpperCase(),
      facultyId: `fac_${selectedInstitution.id}`,
      facultyName: faculty,
      institutionId: selectedInstitution.id,
      institutionName: selectedInstitution.name
    };
    return resolveProgrammesForDepartment(deptRecord, selectedInstitution);
  }, [selectedInstitution, faculty, department]);

  // Dynamically resolved levels based on selected institution and programme
  const availableLevels = useMemo(() => {
    const chosenProg = availableProgrammes.find(p => p.name === programme);
    if (chosenProg && chosenProg.levels && chosenProg.levels.length > 0) {
      return chosenProg.levels;
    }
    if (selectedInstitution) {
      return getSchoolAccreditedLevels(selectedInstitution);
    }
    return ['100L', '200L', '300L', '400L', '500L', 'ND 1', 'ND 2', 'Other'];
  }, [availableProgrammes, programme, selectedInstitution]);

  // Ensure selected level is valid for the current institution/programme
  useEffect(() => {
    if (availableLevels.length > 0 && !availableLevels.includes(level)) {
      setLevel(availableLevels[0]);
    }
  }, [availableLevels, level]);

  const isTwoYearNDProgram = selectedInstitution?.id === 'adeyemi_tech_ondo' || 
    selectedInstitution?.shortName === 'ACT' ||
    selectedInstitution?.name.toLowerCase().includes('adeyemi college of technology') ||
    (availableLevels.length === 2 && availableLevels.includes('ND 1') && availableLevels.includes('ND 2'));

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateStudent({
        fullName: fullName.trim(),
        matricNumber: matricNumber.trim(),
        institutionId: selectedInstitution.id,
        institutionName: selectedInstitution.name,
        institutionType: selectedInstitution.type,
        faculty,
        department,
        programme,
        level,
      });
      onClose();
    } catch (err) {
      console.warn('Error updating student profile:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden max-h-[92vh] flex flex-col"
      >
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Edit Student Profile & Academic Affiliation
              </h3>
              <p className="text-[11px] text-slate-400">
                Synchronized with Supabase Auth & Profiles Table
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Digital Student Identity Card Preview */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 text-white shadow-lg space-y-3 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-emerald-300 font-black">
                  Active Student Credential
                </span>
                <h4 className="text-sm sm:text-base font-black mt-0.5">{fullName || student.fullName}</h4>
                <p className="text-xs text-slate-300">{matricNumber || 'No Matric'}</p>
              </div>

              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-bold text-emerald-300 border border-white/20">
                <QrCode className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
              <div>
                <span className="text-[10px] text-slate-400 block">Institution</span>
                <p className="font-bold truncate text-xs">{selectedInstitution.name}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Department & Level</span>
                <p className="font-bold text-xs">{department || 'General'} • {level}</p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSave} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Matric Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Matric / Registration Number (Optional)
              </label>
              <input
                type="text"
                value={matricNumber}
                onChange={e => setMatricNumber(e.target.value)}
                placeholder="e.g. 190404012"
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Institution Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tertiary Institution <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-1.5">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={institutionSearch}
                  onChange={e => setInstitutionSearch(e.target.value)}
                  placeholder="Filter institutions..."
                  className="w-full pl-8 pr-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <select
                value={selectedInstitutionId}
                onChange={e => setSelectedInstitutionId(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {filteredInstitutions.map(inst => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name} ({inst.shortName})
                  </option>
                ))}
              </select>
            </div>

            {/* Faculty & Department */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Faculty / School <span className="text-red-500">*</span>
                </label>
                <select
                  value={faculty}
                  onChange={e => setFaculty(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {availableFaculties.map(fac => (
                    <option key={fac.id} value={fac.name}>
                      {fac.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {availableDepartments.map(dept => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Programme & Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Degree Programme <span className="text-red-500">*</span>
                </label>
                <select
                  value={programme}
                  onChange={e => setProgramme(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {availableProgrammes.map(prog => (
                    <option key={prog.id} value={prog.name}>
                      {prog.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Level <span className="text-red-500">*</span>
                </label>
                <select
                  value={level}
                  onChange={e => setLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {availableLevels.map(lvl => (
                    <option key={lvl} value={lvl}>
                      {lvl} {lvl === 'ND 1' ? '(Year 1)' : lvl === 'ND 2' ? '(Year 2)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isTwoYearNDProgram && (
              <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                  <span className="font-bold">2-Year National Diploma Certificate (ND) Program:</span>
                  <span className="ml-1 text-slate-600 dark:text-slate-300">
                    Adeyemi College of Technology (ACT) awards an accredited 2-year National Diploma Certificate structured into <strong>ND 1</strong> (Year 1: 1st & 2nd Semesters) and <strong>ND 2</strong> (Year 2: 1st & 2nd Semesters).
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-70 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all mt-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving to Supabase...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Profile to Supabase</span>
                </>
              )}
            </button>
          </form>

        </div>
      </motion.div>
    </div>
  );
};
