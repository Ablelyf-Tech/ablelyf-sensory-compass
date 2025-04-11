
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Goal, ProgressReport } from '@/components/teacher/classroom/types';
import StudentListSidebar from '@/components/teacher/progress/StudentListSidebar';
import StudentDetailPanel from '@/components/teacher/progress/StudentDetailPanel';
import StudentGoalsList from '@/components/teacher/progress/StudentGoalsList';
import ProgressReportsSearch from '@/components/teacher/progress/ProgressReportsSearch';
import ProgressReportDialogs from '@/components/teacher/progress/ProgressReportDialogs';

const ProgressReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState('goals');
  const [isNewReportOpen, setIsNewReportOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isEditGoalOpen, setIsEditGoalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  
  // Mock student data with goals
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'Jamie Rodriguez', 
      grade: '3rd Grade',
      status: 'Active IEP',
      goals: [
        { id: 1, name: 'Reading Comprehension', progress: 75, target: 'Read grade-level text with 80% comprehension accuracy' },
        { id: 2, name: 'Self-Regulation', progress: 60, target: 'Use calming strategies independently when frustrated' },
        { id: 3, name: 'Math Problem Solving', progress: 40, target: 'Solve multi-step word problems with 70% accuracy' }
      ],
      attendance: { present: 85, absent: 10, tardy: 5 },
      behavior: [
        { category: 'Following Directions', score: 4, outOf: 5 },
        { category: 'Participation', score: 3, outOf: 5 },
        { category: 'Task Completion', score: 4, outOf: 5 },
        { category: 'Peer Interactions', score: 3, outOf: 5 }
      ],
      academics: {
        reading: 72,
        writing: 68,
        math: 75,
        science: 80,
        socialStudies: 78
      },
      reportDue: '2025-05-15'
    },
    { 
      id: 2, 
      name: 'Taylor Wilson', 
      grade: '3rd Grade',
      status: 'Active 504',
      goals: [
        { id: 1, name: 'Writing Organization', progress: 80, target: 'Use graphic organizers to plan writing independently' },
        { id: 2, name: 'Attention', progress: 65, target: 'Stay on task for 15 minutes with one verbal reminder' }
      ],
      attendance: { present: 90, absent: 5, tardy: 5 },
      behavior: [
        { category: 'Following Directions', score: 3, outOf: 5 },
        { category: 'Participation', score: 4, outOf: 5 },
        { category: 'Task Completion', score: 3, outOf: 5 },
        { category: 'Peer Interactions', score: 5, outOf: 5 }
      ],
      academics: {
        reading: 85,
        writing: 70,
        math: 75,
        science: 82,
        socialStudies: 88
      },
      reportDue: '2025-05-10'
    },
    { 
      id: 3, 
      name: 'Alex Chen', 
      grade: '3rd Grade',
      status: 'Under Evaluation',
      goals: [
        { id: 1, name: 'Social Interaction', progress: 50, target: 'Initiate peer interactions 3 times per day' },
        { id: 2, name: 'Following Directions', progress: 70, target: 'Follow 2-step directions with 80% accuracy' },
        { id: 3, name: 'Fine Motor Skills', progress: 45, target: 'Complete handwriting tasks with appropriate letter size and spacing' }
      ],
      attendance: { present: 95, absent: 3, tardy: 2 },
      behavior: [
        { category: 'Following Directions', score: 2, outOf: 5 },
        { category: 'Participation', score: 3, outOf: 5 },
        { category: 'Task Completion', score: 2, outOf: 5 },
        { category: 'Peer Interactions', score: 2, outOf: 5 }
      ],
      academics: {
        reading: 65,
        writing: 60,
        math: 80,
        science: 85,
        socialStudies: 70
      },
      reportDue: '2025-04-30'
    },
  ]);

  // Track progress reports
  const [progressReports, setProgressReports] = useState<ProgressReport[]>([]);

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active IEP':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Active 504':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Under Evaluation':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Progress comparison data for chart
  const goalProgressData = selectedStudent?.goals.map(goal => ({
    name: goal.name,
    Current: goal.progress,
    Target: 100
  })) || [];

  // Attendance data for pie chart
  const attendanceData = selectedStudent ? [
    { name: 'Present', value: selectedStudent.attendance.present, color: '#4ade80' },
    { name: 'Absent', value: selectedStudent.attendance.absent, color: '#f87171' },
    { name: 'Tardy', value: selectedStudent.attendance.tardy, color: '#facc15' }
  ] : [];

  // Academic data for chart
  const academicData = selectedStudent ? [
    { subject: 'Reading', score: selectedStudent.academics.reading },
    { subject: 'Writing', score: selectedStudent.academics.writing },
    { subject: 'Math', score: selectedStudent.academics.math },
    { subject: 'Science', score: selectedStudent.academics.science },
    { subject: 'Social Studies', score: selectedStudent.academics.socialStudies }
  ] : [];

  const handleNewReport = () => {
    if (!selectedStudent) {
      toast.error('Please select a student first to create a new report');
      return;
    }
    setIsNewReportOpen(true);
  };

  const handleGenerateReport = () => {
    if (!selectedStudent) {
      toast.error('Please select a student first');
      return;
    }
    
    // In a real app, this would generate and show a PDF report
    toast.success(`Report generated for ${selectedStudent.name}`);
    
    // Sample code to add to reports array
    const newReport: ProgressReport = {
      id: progressReports.length + 1,
      title: `Progress Report for ${selectedStudent.name}`,
      studentId: selectedStudent.id,
      reportType: 'quarterly',
      date: new Date().toISOString(),
      period: 'q1',
      summary: `Overall progress for ${selectedStudent.name} this quarter`,
      academicProgress: 'Student is making steady academic progress',
      behavioralProgress: 'Behavior is improving in classroom settings',
      socialProgress: 'Social skills continue to develop positively'
    };
    
    setProgressReports([...progressReports, newReport]);
  };

  const handleReportSubmit = (data) => {
    // Create a new report using the form data
    const newReport: ProgressReport = {
      id: progressReports.length + 1,
      title: data.title,
      studentId: selectedStudent.id,
      reportType: data.reportType,
      date: data.date,
      period: data.period,
      summary: data.summary,
      academicProgress: data.academicProgress,
      behavioralProgress: data.behavioralProgress,
      socialProgress: data.socialProgress,
      recommendations: data.recommendations
    };
    
    setProgressReports([...progressReports, newReport]);
    setIsNewReportOpen(false);
    toast.success('Progress report created successfully');
  };

  const handleUpdateProgress = (goalId) => {
    if (!selectedStudent) return;
    
    // Find the goal to edit
    const goalToEdit = selectedStudent.goals.find(goal => goal.id === goalId);
    if (goalToEdit) {
      setCurrentGoal(goalToEdit);
      setIsEditGoalOpen(true);
    }
  };

  const handleDeleteGoal = (goalId) => {
    if (!selectedStudent) return;
    
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this goal?');
    if (!confirmDelete) return;
    
    // Create a new array of students with the updated goals
    const updatedStudents = students.map(student => {
      if (student.id === selectedStudent.id) {
        return {
          ...student,
          goals: student.goals.filter(goal => goal.id !== goalId)
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    
    // Update selected student
    const updatedStudent = updatedStudents.find(student => student.id === selectedStudent.id);
    setSelectedStudent(updatedStudent);
    
    toast.success('Goal successfully deleted');
  };

  const handleAddGoal = () => {
    if (!selectedStudent) {
      toast.error('Please select a student first');
      return;
    }
    setIsAddGoalOpen(true);
  };

  const handleGoalSubmit = (data) => {
    if (!selectedStudent) return;
    
    // Create a new goal
    const newGoal: Goal = {
      id: Math.max(0, ...selectedStudent.goals.map(g => g.id)) + 1,
      name: data.name,
      progress: data.progress,
      target: data.target,
      category: data.category,
      notes: data.notes
    };
    
    // Update students with the new goal
    const updatedStudents = students.map(student => {
      if (student.id === selectedStudent.id) {
        return {
          ...student,
          goals: [...student.goals, newGoal]
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    
    // Update selected student
    const updatedStudent = updatedStudents.find(student => student.id === selectedStudent.id);
    setSelectedStudent(updatedStudent);
    
    setIsAddGoalOpen(false);
    toast.success('New goal added successfully');
  };

  const handleEditGoalSubmit = (data) => {
    if (!selectedStudent || !currentGoal) return;
    
    // Update the goal
    const updatedStudents = students.map(student => {
      if (student.id === selectedStudent.id) {
        return {
          ...student,
          goals: student.goals.map(goal => {
            if (goal.id === currentGoal.id) {
              return {
                ...goal,
                name: data.name,
                progress: data.progress,
                target: data.target,
                category: data.category,
                notes: data.notes
              };
            }
            return goal;
          })
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    
    // Update selected student
    const updatedStudent = updatedStudents.find(student => student.id === selectedStudent.id);
    setSelectedStudent(updatedStudent);
    
    setIsEditGoalOpen(false);
    setCurrentGoal(null);
    toast.success('Goal updated successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Progress Reports</h1>
        <p className="text-muted-foreground">
          Track and document student progress toward IEP and learning goals
        </p>
      </div>

      <ProgressReportsSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleNewReport={handleNewReport}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <StudentListSidebar 
            students={filteredStudents}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            getStatusColor={getStatusColor}
          />
        </div>

        <div className="lg:col-span-3">
          {selectedStudent ? (
            <div className="space-y-6">
              <StudentDetailPanel 
                selectedStudent={selectedStudent}
                selectedReportType={selectedReportType}
                setSelectedReportType={setSelectedReportType}
                goalProgressData={goalProgressData}
                attendanceData={attendanceData}
                academicData={academicData}
                handleGenerateReport={handleGenerateReport}
              />

              <StudentGoalsList 
                selectedStudent={selectedStudent}
                handleAddGoal={handleAddGoal}
                handleUpdateProgress={handleUpdateProgress}
                handleDeleteGoal={handleDeleteGoal}
              />
            </div>
          ) : (
            <StudentDetailPanel 
              selectedStudent={null}
              selectedReportType={selectedReportType}
              setSelectedReportType={setSelectedReportType}
              goalProgressData={[]}
              attendanceData={[]}
              academicData={[]}
              handleGenerateReport={handleGenerateReport}
            />
          )}
        </div>
      </div>

      <ProgressReportDialogs 
        isNewReportOpen={isNewReportOpen}
        setIsNewReportOpen={setIsNewReportOpen}
        isAddGoalOpen={isAddGoalOpen}
        setIsAddGoalOpen={setIsAddGoalOpen}
        isEditGoalOpen={isEditGoalOpen}
        setIsEditGoalOpen={setIsEditGoalOpen}
        currentGoal={currentGoal}
        selectedStudent={selectedStudent}
        students={students}
        handleReportSubmit={handleReportSubmit}
        handleGoalSubmit={handleGoalSubmit}
        handleEditGoalSubmit={handleEditGoalSubmit}
      />
    </div>
  );
};

export default ProgressReports;
