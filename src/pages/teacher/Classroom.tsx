
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ClassroomHeader from '@/components/teacher/classroom/ClassroomHeader';
import ClassroomSearch from '@/components/teacher/classroom/ClassroomSearch';
import StudentsList from '@/components/teacher/classroom/StudentsList';
import { mockStudents } from '@/components/teacher/classroom/mockData';

const Classroom = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter students based on search term and active tab
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        student.status.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'iep') return matchesSearch && student.status === 'Active IEP';
    if (activeTab === '504') return matchesSearch && student.status === 'Active 504';
    if (activeTab === 'evaluation') return matchesSearch && student.status === 'Under Evaluation';
    
    return matchesSearch;
  });

  // Calculate stats for the header
  const stats = {
    total: 26, // Example total value
    iep: 8,
    plan504: 5,
    evaluation: 3
  };

  return (
    <div className="space-y-6">
      <ClassroomHeader stats={stats} />

      <ClassroomSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="iep">IEP</TabsTrigger>
          <TabsTrigger value="504">504 Plan</TabsTrigger>
          <TabsTrigger value="evaluation">Under Evaluation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          <StudentsList 
            students={filteredStudents} 
          />
        </TabsContent>
        
        <TabsContent value="iep" className="space-y-4 mt-4">
          <StudentsList 
            students={filteredStudents}
            emptyMessage="No students with IEPs match your search criteria."
          />
        </TabsContent>
        
        <TabsContent value="504" className="space-y-4 mt-4">
          <StudentsList 
            students={filteredStudents}
            emptyMessage="No students with 504 plans match your search criteria."
          />
        </TabsContent>
        
        <TabsContent value="evaluation" className="space-y-4 mt-4">
          <StudentsList 
            students={filteredStudents}
            emptyMessage="No students under evaluation match your search criteria."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Classroom;
