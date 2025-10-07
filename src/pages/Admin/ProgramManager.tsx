import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Program } from '../../types/dashboard';

const ProgramManager: React.FC = () => {
  const { programs, addProgram, updateProgram, deleteProgram } = useData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Program>>({
    name: '',
    enrolled: 0,
    completed: 0,
    completionRate: 0,
    avgDuration: '',
    color: 'bg-blue-500'
  });

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Blue' },
    { value: 'bg-green-500', label: 'Green' },
    { value: 'bg-purple-500', label: 'Purple' },
    { value: 'bg-orange-500', label: 'Orange' },
    { value: 'bg-red-500', label: 'Red' },
    { value: 'bg-teal-500', label: 'Teal' },
    { value: 'bg-indigo-500', label: 'Indigo' },
    { value: 'bg-pink-500', label: 'Pink' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) return;
    
    // Calculate completion rate if not set
    const completionRate = formData.completionRate || 
      (formData.enrolled && formData.completed ? 
        Math.round((formData.completed / formData.enrolled) * 100) : 0);
    
    const programData = {
      ...formData,
      completionRate
    } as Program;
    
    if (editingProgram) {
      updateProgram(editingProgram, programData);
    } else {
      addProgram(programData);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      enrolled: 0,
      completed: 0,
      completionRate: 0,
      avgDuration: '',
      color: 'bg-blue-500'
    });
    setShowAddForm(false);
    setEditingProgram(null);
  };

  const handleEdit = (program: Program) => {
    setFormData(program);
    setEditingProgram(program.name);
    setShowAddForm(true);
  };

  const handleDelete = (name: string) => {
    if (window.confirm(`Are you sure you want to delete the "${name}" program?`)) {
      deleteProgram(name);
    }
  };

  const handleEnrolledChange = (value: number) => {
    const enrolled = value;
    const completed = formData.completed || 0;
    const completionRate = enrolled > 0 ? Math.round((completed / enrolled) * 100) : 0;
    
    setFormData(prev => ({ 
      ...prev, 
      enrolled, 
      completionRate 
    }));
  };

  const handleCompletedChange = (value: number) => {
    const completed = value;
    const enrolled = formData.enrolled || 0;
    const completionRate = enrolled > 0 ? Math.round((completed / enrolled) * 100) : 0;
    
    setFormData(prev => ({ 
      ...prev, 
      completed, 
      completionRate 
    }));
  };

  const totalEnrolled = programs.reduce((sum, program) => sum + program.enrolled, 0);
  const totalCompleted = programs.reduce((sum, program) => sum + program.completed, 0);
  const overallCompletionRate = totalEnrolled > 0 ? Math.round((totalCompleted / totalEnrolled) * 100) : 0;

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Program Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Manage education programs, enrollment data, and completion rates
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Program
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {overallCompletionRate}%
          </div>
          <div className="text-sm text-green-600 dark:text-green-400">
            Overall Completion Rate
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalEnrolled.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600 dark:text-blue-400">
            Total Enrolled
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {totalCompleted.toLocaleString()}
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-400">
            Successfully Completed
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {editingProgram ? 'Edit Program' : 'Add New Program'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Program Name
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                  aria-label="Program Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Average Duration
                </label>
                <input
                  type="text"
                  value={formData.avgDuration || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, avgDuration: e.target.value }))}
                  placeholder="e.g., 6 weeks"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  aria-label="Average Duration"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Enrolled Students
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.enrolled || 0}
                  onChange={(e) => handleEnrolledChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  aria-label="Enrolled Students"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Completed Students
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.completed || 0}
                  onChange={(e) => handleCompletedChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  aria-label="Completed Students"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Completion Rate
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.completionRate || 0}
                  onChange={(e) => setFormData(prev => ({ ...prev, completionRate: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  aria-label="Completion Rate"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Color Theme
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color) => (
                  <label key={color.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="color"
                      value={color.value}
                      checked={formData.color === color.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      className="sr-only"
                    />
                    <div className={`w-8 h-8 ${color.value} rounded-lg border-2 ${
                      formData.color === color.value ? 'border-gray-800 dark:border-white' : 'border-gray-300 dark:border-gray-600'
                    }`}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{color.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingProgram ? 'Update Program' : 'Add Program'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Programs List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Education Programs ({programs.length})
        </h3>
        
        <div className="space-y-4">
          {programs.map((program) => (
            <div key={program.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 ${program.color} rounded-full`}></div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {program.name}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {program.avgDuration}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {program.completionRate}%
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {program.completed}/{program.enrolled}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(program)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(program.name)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`${program.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${program.completionRate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramManager;
