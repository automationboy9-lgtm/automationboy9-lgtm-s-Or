import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CourseGrade, SemesterRecord } from '../types';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Award, 
  Target,
  Save
} from 'lucide-react';

export const GpaCgpaCalculator: React.FC = () => {
  const { student, semesters, addSemester } = useApp();

  const [scale, setScale] = useState<'5.0' | '4.0'>(student.gradingSystem || '5.0');
  const [semesterName, setSemesterName] = useState('Year 3 - First Semester');
  const [academicSession, setAcademicSession] = useState('2023/2024');

  const [courses, setCourses] = useState<CourseGrade[]>([
    { id: 'c1', courseCode: 'CSC 301', courseTitle: 'Database Management Systems', units: 3, grade: 'A', gradePoint: 5 },
    { id: 'c2', courseCode: 'CSC 303', courseTitle: 'Operating Systems Principles', units: 3, grade: 'A', gradePoint: 5 },
    { id: 'c3', courseCode: 'CSC 305', courseTitle: 'Data Communications & Networks', units: 3, grade: 'B', gradePoint: 4 },
    { id: 'c4', courseCode: 'MAT 301', courseTitle: 'Numerical Analysis I', units: 3, grade: 'A', gradePoint: 5 },
    { id: 'c5', courseCode: 'GST 301', courseTitle: 'Entrepreneurship & Innovation', units: 2, grade: 'A', gradePoint: 5 }
  ]);

  // Target Forecast inputs
  const [currentCgpaInput, setCurrentCgpaInput] = useState<number>(student.currentCgpa || 4.25);
  const [completedUnitsInput, setCompletedUnitsInput] = useState<number>(student.totalUnitsTaken || 60);
  const [targetCgpaGoal, setTargetCgpaGoal] = useState<number>(student.targetCgpa || 4.60);
  const [remainingUnitsInput, setRemainingUnitsInput] = useState<number>(45);

  const gradePoints5: Record<string, number> = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 };
  const gradePoints4: Record<string, number> = { Distinction: 4.0, 'Upper Credit': 3.5, 'Lower Credit': 3.0, Pass: 2.0, Fail: 0 };

  const getPoints = (grade: string) => {
    if (scale === '5.0') return gradePoints5[grade] ?? 0;
    return gradePoints4[grade] ?? 0;
  };

  const handleAddCourse = () => {
    const newCourse: CourseGrade = {
      id: `crs_${Date.now()}`,
      courseCode: `CRS ${courses.length + 1}01`,
      courseTitle: 'New Course Title',
      units: 3,
      grade: scale === '5.0' ? 'A' : 'Distinction',
      gradePoint: scale === '5.0' ? 5 : 4
    };
    setCourses([...courses, newCourse]);
  };

  const handleRemoveCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleCourseChange = (id: string, field: keyof CourseGrade, value: any) => {
    setCourses(courses.map(c => {
      if (c.id === id) {
        const updated = { ...c, [field]: value };
        if (field === 'grade') {
          updated.gradePoint = getPoints(value);
        }
        return updated;
      }
      return c;
    }));
  };

  // Computations
  const totalUnits = courses.reduce((acc, c) => acc + (Number(c.units) || 0), 0);
  const totalQualityPoints = courses.reduce((acc, c) => acc + (c.units * c.gradePoint), 0);
  const calculatedGpa = totalUnits > 0 ? Number((totalQualityPoints / totalUnits).toFixed(2)) : 0;

  // Grade classification helper
  const getClassification = (score: number, currentScale: '5.0' | '4.0') => {
    if (currentScale === '5.0') {
      if (score >= 4.5) return { text: 'First Class Honours 🏆', color: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800' };
      if (score >= 3.5) return { text: 'Second Class Upper Division (2:1)', color: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-50 dark:bg-blue-950/80 border-blue-300 dark:border-blue-800' };
      if (score >= 2.4) return { text: 'Second Class Lower Division (2:2)', color: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800' };
      if (score >= 1.5) return { text: 'Third Class', color: 'text-orange-600 dark:text-orange-400', badge: 'bg-orange-50 dark:bg-orange-950/80 border-orange-300 dark:border-orange-800' };
      return { text: 'Pass / Probation', color: 'text-rose-600 dark:text-rose-400', badge: 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-800' };
    } else {
      if (score >= 3.5) return { text: 'Distinction 🏆', color: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-800' };
      if (score >= 3.0) return { text: 'Upper Credit', color: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-50 dark:bg-blue-950/80 border-blue-300 dark:border-blue-800' };
      if (score >= 2.5) return { text: 'Lower Credit', color: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800' };
      return { text: 'Pass', color: 'text-rose-600 dark:text-rose-400', badge: 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-800' };
    }
  };

  const semesterClass = getClassification(calculatedGpa, scale);

  // Target Forecast calculation
  const currentTotalPoints = currentCgpaInput * completedUnitsInput;
  const targetTotalUnits = completedUnitsInput + remainingUnitsInput;
  const targetTotalPoints = targetCgpaGoal * targetTotalUnits;
  const requiredRemainingPoints = targetTotalPoints - currentTotalPoints;
  const requiredGpa = remainingUnitsInput > 0 ? requiredRemainingPoints / remainingUnitsInput : 0;

  const handleSaveSemester = () => {
    const newRecord: SemesterRecord = {
      id: `sem_${Date.now()}`,
      semesterName,
      academicSession,
      courses,
      totalUnits,
      totalPoints: totalQualityPoints,
      gpa: calculatedGpa
    };
    addSemester(newRecord);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-purple-900 via-slate-900 to-slate-950 text-white shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-black shadow-lg shadow-purple-500/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">Nigerian GPA & CGPA Engine</h1>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30">
                NUC & NBTE Standard
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Compute semester GPA, multi-year cumulative CGPA, and forecast target graduation honors
            </p>
          </div>
        </div>

        {/* Scale Switcher */}
        <div className="flex items-center gap-2 bg-white/10 p-1 rounded-2xl backdrop-blur-md">
          <button
            onClick={() => setScale('5.0')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              scale === '5.0' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            5.0 Scale (University)
          </button>
          <button
            onClick={() => setScale('4.0')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              scale === '4.0' ? 'bg-purple-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            4.0 Scale (Polytechnic)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Course Table & Semester Calculator */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            
            {/* Semester Details Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={semesterName}
                  onChange={e => setSemesterName(e.target.value)}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  value={academicSession}
                  onChange={e => setAcademicSession(e.target.value)}
                  placeholder="Session (e.g. 2023/2024)"
                  className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <button
                onClick={handleAddCourse}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Course</span>
              </button>
            </div>

            {/* Courses Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-2">Course Code</th>
                    <th className="pb-2">Course Title</th>
                    <th className="pb-2 text-center">Units</th>
                    <th className="pb-2 text-center">Grade</th>
                    <th className="pb-2 text-center">Point</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                  {(courses || []).map(course => (
                    <tr key={course.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-2.5 pr-2">
                        <input
                          type="text"
                          value={course.courseCode}
                          onChange={e => handleCourseChange(course.id, 'courseCode', e.target.value)}
                          className="w-24 px-2 py-1 font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </td>
                      <td className="py-2.5 pr-2">
                        <input
                          type="text"
                          value={course.courseTitle}
                          onChange={e => handleCourseChange(course.id, 'courseTitle', e.target.value)}
                          className="w-full min-w-[140px] px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <select
                          value={course.units}
                          onChange={e => handleCourseChange(course.id, 'units', parseInt(e.target.value))}
                          className="px-2 py-1 font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                          {[1, 2, 3, 4, 5, 6].map(u => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <select
                          value={course.grade}
                          onChange={e => handleCourseChange(course.id, 'grade', e.target.value)}
                          className="px-2 py-1 font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                          {scale === '5.0' ? (
                            <>
                              <option value="A">A (70-100%) - 5 pts</option>
                              <option value="B">B (60-69%) - 4 pts</option>
                              <option value="C">C (50-59%) - 3 pts</option>
                              <option value="D">D (45-49%) - 2 pts</option>
                              <option value="E">E (40-44%) - 1 pt</option>
                              <option value="F">F (0-39%) - 0 pt</option>
                            </>
                          ) : (
                            <>
                              <option value="Distinction">Distinction (75-100%) - 4.0</option>
                              <option value="Upper Credit">Upper Credit (65-74%) - 3.5</option>
                              <option value="Lower Credit">Lower Credit (50-64%) - 3.0</option>
                              <option value="Pass">Pass (40-49%) - 2.0</option>
                              <option value="Fail">Fail (&lt;40%) - 0</option>
                            </>
                          )}
                        </select>
                      </td>
                      <td className="py-2.5 px-2 text-center font-bold text-slate-900 dark:text-white">
                        {course.units * course.gradePoint}
                      </td>
                      <td className="py-2.5 pl-2 text-right">
                        <button
                          onClick={() => handleRemoveCourse(course.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded"
                          aria-label="Remove Course"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Live Semester Computed Output */}
            <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[11px] font-bold text-purple-700 dark:text-purple-300 uppercase">
                    Total Units
                  </p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {totalUnits}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-purple-700 dark:text-purple-300 uppercase">
                    Quality Points (TQP)
                  </p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">
                    {totalQualityPoints}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-purple-700 dark:text-purple-300 uppercase">
                    Calculated GPA
                  </p>
                  <p className="text-3xl font-black text-purple-600 dark:text-purple-400">
                    {calculatedGpa.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                <span className={`px-3 py-1 rounded-lg border text-xs font-bold ${semesterClass.badge} ${semesterClass.color}`}>
                  {semesterClass.text}
                </span>
                <button
                  onClick={handleSaveSemester}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save to Academic History</span>
                </button>
              </div>
            </div>

          </div>

          {/* Cumulative Semester History */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span>Cumulative CGPA History ({(semesters || []).length} Semesters Recorded)</span>
            </h3>

            <div className="space-y-3">
              {(semesters || []).map(sem => (
                <div
                  key={sem.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{sem.semesterName} ({sem.academicSession})</h4>
                    <p className="text-[11px] text-slate-500">{(sem.courses || []).length} Courses • {sem.totalUnits} Units (TQP: {sem.totalPoints})</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-purple-600 dark:text-purple-400">
                      GPA: {sem.gpa.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Target CGPA Forecaster */}
        <div className="space-y-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Target CGPA Forecaster
                </h3>
                <p className="text-[11px] text-slate-500">
                  Find the exact GPA you need to graduate with your dream honors
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Current Cumulative CGPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={currentCgpaInput}
                  onChange={e => setCurrentCgpaInput(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Units Completed
                  </label>
                  <input
                    type="number"
                    value={completedUnitsInput}
                    onChange={e => setCompletedUnitsInput(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Units Remaining
                  </label>
                  <input
                    type="number"
                    value={remainingUnitsInput}
                    onChange={e => setRemainingUnitsInput(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Target Graduation CGPA
                  </label>
                  <span className="text-xs font-black text-emerald-600">
                    {targetCgpaGoal.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={scale === '5.0' ? 2.5 : 2.0}
                  max={scale === '5.0' ? 5.0 : 4.0}
                  step={0.05}
                  value={targetCgpaGoal}
                  onChange={e => setTargetCgpaGoal(parseFloat(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* Forecaster Result Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                <p className="text-xs text-slate-500">Required Average Semester GPA:</p>
                <p className={`text-3xl font-black ${
                  requiredGpa <= (scale === '5.0' ? 5.0 : 4.0) && requiredGpa >= 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {requiredGpa <= 0 ? 'Goal Achieved!' : requiredGpa.toFixed(2)}
                </p>
                <p className="text-[11px] text-slate-500 leading-tight">
                  {requiredGpa > (scale === '5.0' ? 5.0 : 4.0)
                    ? `⚠️ Statistically unattainable in ${remainingUnitsInput} remaining units. Consider adjusting target or taking extra elective units.`
                    : `Achieving a ${requiredGpa.toFixed(2)} GPA across your remaining ${remainingUnitsInput} units will graduate you with ${targetCgpaGoal.toFixed(2)} CGPA!`}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
