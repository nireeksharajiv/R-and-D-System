import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { 
  FileCheck, Search, Calendar, Users, Building2, Globe, 
  TrendingUp, Eye, DollarSign, CheckCircle2, CircleDashed, Clock, 
  Scale, FileText, AlertCircle, User, History, Pencil, Trash2, Plus, Save, ArrowLeft, X 
} from 'lucide-react';
import { mockPatents } from '../data/mockData';
import { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

// Mock User Role
const currentUser = {
    name: 'Dr. Admin',
    role: 'admin' // Options: 'admin', 'faculty', 'student'
};

export function PatentsView() {
  // --- Navigation & View State ---
  const [currentView, setCurrentView] = useState('list'); // 'list' | 'details'
  const [activePatent, setActivePatent] = useState(null); // For Full Page (Project Info)
  
  // --- Modal State ---
  const [selectedProgressPatent, setSelectedProgressPatent] = useState(null); // For Popup (Funding)

  // --- List View Filters ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // --- Edit States ---
  // 1. Project Info Edit (Full Page)
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editedFields, setEditedFields] = useState({}); 

  // 2. Funding Edit (Modal)
  const [fundingSteps, setFundingSteps] = useState([]);
  const [isEditingSteps, setIsEditingSteps] = useState(false);

  const statuses = ['All', 'Granted', 'Published', 'Under Examination', 'Filed'];

  // --- Helper: Generate Extended Mock Data ---
  const getExtendedDetails = (patent) => {
    if (patent.extendedLoaded) return patent;
    return {
        ...patent,
        extendedLoaded: true,
        problemStatement: "Current solutions for this technology suffer from high latency and energy inefficiency.",
        novelty: "Introduces a novel asynchronous processing architecture that reduces power consumption by 40%.",
        funding: {
            currency: '₹',
            steps: [
                { name: 'Idea Seeding', status: 'Completed', planned: 50000, spent: 45000, notes: 'Initial feasibility study' },
                { name: 'Prototype Development', status: 'In Progress', planned: 150000, spent: 80000, notes: 'Hardware procurement' },
                { name: 'Testing & Validation', status: 'Not Started', planned: 100000, spent: 0, notes: 'Pending prototype completion' },
                { name: 'Patent Filing Fees', status: 'Completed', planned: 25000, spent: 25000, notes: 'Official fees paid' },
                { name: 'Examination Support', status: 'Pending', planned: 30000, spent: 0, notes: 'Reserved for legal counsel' }
            ]
        },
        audit: {
            createdBy: 'Dr. Sarah Mitchell (Admin)',
            createdAt: '2023-01-15 09:30 AM',
            updatedAt: '2023-10-05 04:45 PM'
        }
    };
  };

  // --- Handlers: Navigation ---
  const handleTitleClick = (patent) => {
      const details = getExtendedDetails(patent);
      setActivePatent(details);
      setEditedFields(details);
      setIsEditingInfo(false);
      setCurrentView('details');
      window.scrollTo(0,0);
  };

  const handleFundingClick = (patent) => {
      const details = getExtendedDetails(patent);
      setSelectedProgressPatent(details);
      setFundingSteps(details.funding.steps);
      setIsEditingSteps(false);
  };

  const handleBackToList = () => {
      setCurrentView('list');
      setActivePatent(null);
  };

  // --- Handlers: Project Info Editing ---
  const toggleInfoEdit = () => {
      if (isEditingInfo) {
          // Mock Save
          setActivePatent({ ...editedFields });
      }
      setIsEditingInfo(!isEditingInfo);
  };

  const handleInfoFieldChange = (field, value) => {
      setEditedFields(prev => ({ ...prev, [field]: value }));
  };

  // --- Handlers: Funding Editing ---
  const handleUpdateStep = (index, field, value) => {
      const newSteps = [...fundingSteps];
      newSteps[index] = { ...newSteps[index], [field]: value };
      setFundingSteps(newSteps);
  };
  const handleDeleteStep = (index) => {
      setFundingSteps(fundingSteps.filter((_, i) => i !== index));
  };
  const handleAddStep = () => {
      setFundingSteps([...fundingSteps, { name: 'New Step', status: 'Not Started', planned: 0, spent: 0, notes: '' }]);
  };

  const calculateFundingStats = (steps) => {
    const safeSteps = steps || [];
    const totalBudget = safeSteps.reduce((acc, step) => acc + (parseFloat(step.planned) || 0), 0);
    const amountSpent = safeSteps.reduce((acc, step) => acc + (parseFloat(step.spent) || 0), 0);
    const remaining = totalBudget - amountSpent;
    const percentage = totalBudget > 0 ? Math.round((amountSpent / totalBudget) * 100) : 0;
    return { totalBudget, amountSpent, remaining, percentage };
  };

  // --- Charts & Filters ---
  const chartData = useMemo(() => {
    const data = [
      { name: 'Granted', value: 0, color: '#16a34a' },
      { name: 'Published', value: 0, color: '#2563eb' },
      { name: 'Under Examination', value: 0, color: '#ca8a04' },
      { name: 'Filed', value: 0, color: '#9333ea' },
    ];
    mockPatents.forEach(patent => {
      const category = data.find(d => d.name === patent.status);
      if (category) category.value += 1;
      else {
        let other = data.find(d => d.name === 'Other');
        if (!other) { other = { name: 'Other', value: 0, color: '#94a3b8' }; data.push(other); }
        other.value += 1;
      }
    });
    return data.filter(item => item.value > 0);
  }, []);

  const filteredPatents = mockPatents.filter((patent) => {
    const matchesSearch =
      patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patent.inventors.some((inv) => inv.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'All' || patent.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Granted': return 'bg-green-100 text-green-700 border-green-200';
      case 'Published': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Under Examination': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Filed': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // ==========================================
  // VIEW 1: FULL PAGE DETAILS (Project Info)
  // ==========================================
  if (currentView === 'details' && activePatent) {
      const canEdit = currentUser.role === 'admin' || currentUser.role === 'faculty';

      return (
          <div className="bg-gray-50 min-h-screen pb-12 font-sans">
              {/* Header */}
              <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-8 py-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" onClick={handleBackToList} className="text-gray-600 gap-2 hover:bg-gray-100">
                          <ArrowLeft className="w-4 h-4" /> Back to List
                      </Button>
                      <div className="h-6 w-px bg-gray-300"></div>
                      <h1 className="text-xl font-bold text-gray-900 truncate max-w-xl">
                          {activePatent.title}
                      </h1>
                  </div>
                  <div>
                      {canEdit && (
                          <Button 
                              onClick={toggleInfoEdit}
                              className={isEditingInfo ? "bg-green-600 hover:bg-green-700 text-white gap-2" : "gap-2"}
                              variant={isEditingInfo ? "default" : "outline"}
                          >
                              {isEditingInfo ? <Save className="w-4 h-4"/> : <Pencil className="w-4 h-4"/>}
                              {isEditingInfo ? "Save Changes" : "Edit Details"}
                          </Button>
                      )}
                  </div>
              </div>

              <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
                  {/* Info Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      
                      {/* Section 3: Legal Info */}
                      <Card className="lg:col-span-1 h-fit">
                          <CardHeader className="border-b bg-gray-50/50 pb-4">
                              <CardTitle className="text-base flex items-center gap-2">
                                  <Scale className="w-4 h-4 text-blue-600" /> Patent / Legal Info
                              </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6 space-y-5">
                              <div>
                                  <p className="text-xs text-gray-500 uppercase font-bold">Application Number</p>
                                  <p className="font-mono text-sm font-medium mt-1">{activePatent.applicationNumber}</p>
                              </div>
                              <div>
                                  <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                                  <div className="mt-1"><Badge className={getStatusColor(activePatent.status)}>{activePatent.status}</Badge></div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Filing Date</p>
                                      <p className="text-sm mt-1">{activePatent.filingDate}</p>
                                  </div>
                                  <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold">Grant Date</p>
                                      <p className="text-sm mt-1">{activePatent.grantDate || '-'}</p>
                                  </div>
                              </div>
                              <div>
                                  <p className="text-xs text-gray-500 uppercase font-bold">Inventors</p>
                                  <p className="text-sm mt-1 text-gray-700">{activePatent.inventors.join(', ')}</p>
                              </div>
                          </CardContent>
                      </Card>

                      {/* Section 4: Technical Details */}
                      <Card className={`lg:col-span-2 h-fit ${isEditingInfo ? 'ring-2 ring-blue-100 border-blue-300' : ''}`}>
                          <CardHeader className="border-b bg-gray-50/50 pb-4">
                              <CardTitle className="text-base flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-blue-600" /> Technical Details
                              </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-6 space-y-6">
                              <div>
                                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Abstract</h4>
                                  {isEditingInfo ? (
                                      <Textarea 
                                          value={editedFields.abstract || activePatent.abstract}
                                          onChange={(e) => handleInfoFieldChange('abstract', e.target.value)}
                                          className="min-h-[80px]"
                                      />
                                  ) : (
                                      <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                                          {editedFields.abstract || activePatent.abstract}
                                      </p>
                                  )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                          <AlertCircle className="w-4 h-4 text-amber-500"/> Problem Statement
                                      </h4>
                                      {isEditingInfo ? (
                                          <Textarea 
                                              value={editedFields.problemStatement || activePatent.problemStatement}
                                              onChange={(e) => handleInfoFieldChange('problemStatement', e.target.value)}
                                              className="min-h-[100px]"
                                          />
                                      ) : (
                                          <p className="text-sm text-gray-600 leading-relaxed">
                                              {editedFields.problemStatement || activePatent.problemStatement}
                                          </p>
                                      )}
                                  </div>
                                  <div>
                                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                          <CheckCircle2 className="w-4 h-4 text-green-500"/> Novelty / Key Features
                                      </h4>
                                      {isEditingInfo ? (
                                          <Textarea 
                                              value={editedFields.novelty || activePatent.novelty}
                                              onChange={(e) => handleInfoFieldChange('novelty', e.target.value)}
                                              className="min-h-[100px]"
                                          />
                                      ) : (
                                          <p className="text-sm text-gray-600 leading-relaxed">
                                              {editedFields.novelty || activePatent.novelty}
                                          </p>
                                      )}
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  </div>

                  {/* Section 6: Audit Info */}
                  <div className="border-t pt-6 text-gray-500">
                        <div className="flex items-center gap-2 mb-4">
                             <History className="w-4 h-4" />
                             <h3 className="font-semibold text-sm text-gray-900"> Audit Information</h3>
                        </div>
                        <div className="bg-gray-100/50 p-4 rounded-lg flex flex-wrap gap-8 text-xs">
                             <div className="flex items-center gap-2">
                                 <User className="w-3.5 h-3.5" /> Created by: <span className="font-medium text-gray-700">{activePatent.audit.createdBy}</span>
                             </div>
                             <div className="flex items-center gap-2">
                                 <Clock className="w-3.5 h-3.5" /> Last Updated: <span className="font-medium text-gray-700">{activePatent.audit.updatedAt}</span>
                             </div>
                        </div>
                  </div>
              </div>
          </div>
      );
  }

  // ==========================================
  // VIEW 2: LIST PAGE (With Funding Modal)
  // ==========================================
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Patent Management</h1>
        <p className="text-gray-600">Track and manage institutional patents and intellectual property</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1 shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg">Patent Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
        
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
             <Card className="flex flex-col justify-center p-6 shadow-sm border-l-4 border-l-blue-500">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-full"><FileCheck className="text-blue-600"/></div>
                    <div>
                        <p className="text-gray-500 text-sm">Total Patents</p>
                        <h2 className="text-3xl font-bold text-gray-800">{mockPatents.length}</h2>
                    </div>
                </div>
             </Card>
             <Card className="flex flex-col justify-center p-6 shadow-sm border-l-4 border-l-green-500">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-full"><TrendingUp className="text-green-600"/></div>
                    <div>
                        <p className="text-gray-500 text-sm">Granted</p>
                        <h2 className="text-3xl font-bold text-gray-800">{mockPatents.filter(p => p.status === 'Granted').length}</h2>
                    </div>
                </div>
             </Card>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {statuses.map((status) => (
                <Button key={status} variant={selectedStatus === status ? 'default' : 'outline'} onClick={() => setSelectedStatus(status)} size="sm">{status}</Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPatents.map((patent) => (
          <Card key={patent.id} className="hover:shadow-lg transition-shadow border-gray-200">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  {/* CLICKABLE TITLE -> Opens Full Page (Project Info) */}
                  <CardTitle 
                    className="mb-2 text-xl text-blue-900 cursor-pointer hover:underline hover:text-blue-700 transition-colors"
                    onClick={() => handleTitleClick(patent)}
                  >
                    {patent.title}
                  </CardTitle>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getStatusColor(patent.status)}>{patent.status}</Badge>
                    {patent.patentNumber && <Badge variant="outline">{patent.patentNumber}</Badge>}
                  </div>
                </div>
                
                {/* SEPARATE BUTTON -> Opens Modal (Funding) */}
                <div className="flex items-center gap-2">
                    <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => handleFundingClick(patent)} 
                        className="flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                    >
                        <TrendingUp className="w-4 h-4" /> Funding & Progress
                    </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 line-clamp-2">{patent.abstract}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- FUNDING MODAL (Popup) --- */}
      {selectedProgressPatent && (
        <Dialog open={!!selectedProgressPatent} onOpenChange={() => setSelectedProgressPatent(null)}>
          <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle> Funding & Progress</DialogTitle>
              <DialogDescription>
                 Financial tracking for: <span className="font-medium text-gray-900">{selectedProgressPatent.title}</span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                        <p className="text-sm text-blue-600 font-medium">Total Budget</p>
                        <p className="text-3xl font-bold text-blue-900 mt-2">
                            ₹{calculateFundingStats(fundingSteps).totalBudget.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200">
                        <p className="text-sm text-gray-600 font-medium">Amount Spent</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                            ₹{calculateFundingStats(fundingSteps).amountSpent.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-gray-200">
                        <p className="text-sm text-gray-600 font-medium">Remaining</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">
                            ₹{calculateFundingStats(fundingSteps).remaining.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-gray-700">Budget Utilization</span>
                        <span className="text-blue-600 font-medium">{calculateFundingStats(fundingSteps).percentage}% Used</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${calculateFundingStats(fundingSteps).percentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Steps Table (With Edit Mode) */}
                <div className={`border rounded-lg overflow-hidden mt-2 ${isEditingSteps ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-200'}`}>
                    <div className="bg-white px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800 text-base">
                            {isEditingSteps ? 'Editing Steps...' : 'Detailed Steps'}
                        </h3>
                        
                        {(currentUser.role === 'admin' || currentUser.role === 'faculty') && (
                            <div className="flex gap-2">
                                {isEditingSteps ? (
                                    <>
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="h-8 gap-1 text-green-600 border-green-200 hover:bg-green-50"
                                            onClick={() => setIsEditingSteps(false)}
                                        >
                                            <Save className="w-3.5 h-3.5" /> Done
                                        </Button>
                                        <Button 
                                            size="sm" 
                                            className="h-8 gap-1 bg-blue-600 hover:bg-blue-700 text-white"
                                            onClick={handleAddStep}
                                        >
                                            <Plus className="w-3.5 h-3.5" /> Add Row
                                        </Button>
                                    </>
                                ) : (
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="h-8 gap-2 text-gray-700"
                                        onClick={() => setIsEditingSteps(true)}
                                    >
                                        <Pencil className="w-3.5 h-3.5" /> Edit
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Step Name</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium text-right">Planned Budget</th>
                                    <th className="px-4 py-3 font-medium text-right">Spent</th>
                                    <th className="px-4 py-3 font-medium">Notes</th>
                                    {isEditingSteps && <th className="px-4 py-3 font-medium text-center">Action</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {fundingSteps.map((step, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 bg-white group">
                                        <td className="px-4 py-3">
                                            {isEditingSteps ? (
                                                <Input 
                                                    value={step.name} 
                                                    onChange={(e) => handleUpdateStep(idx, 'name', e.target.value)}
                                                    className="h-8 w-full"
                                                />
                                            ) : (
                                                <span className="font-medium text-gray-900">{step.name}</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {isEditingSteps ? (
                                                <select 
                                                    className="h-8 w-full border rounded text-xs px-2 bg-transparent"
                                                    value={step.status}
                                                    onChange={(e) => handleUpdateStep(idx, 'status', e.target.value)}
                                                >
                                                    <option>Not Started</option>
                                                    <option>In Progress</option>
                                                    <option>Completed</option>
                                                    <option>Pending</option>
                                                </select>
                                            ) : (
                                                <Badge variant="outline" className={`
                                                    ${step.status === 'Completed' ? 'border-green-200 bg-green-50 text-green-700' : 
                                                      step.status === 'In Progress' ? 'border-blue-200 bg-blue-50 text-blue-700' : 
                                                      'border-gray-200 bg-gray-50 text-gray-500'}
                                                `}>
                                                    {step.status}
                                                </Badge>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {isEditingSteps ? (
                                                <Input 
                                                    type="number"
                                                    value={step.planned} 
                                                    onChange={(e) => handleUpdateStep(idx, 'planned', e.target.value)}
                                                    className="h-8 w-24 text-right ml-auto"
                                                />
                                            ) : (
                                                <span className="font-mono text-gray-600">{parseFloat(step.planned).toLocaleString()}</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {isEditingSteps ? (
                                                <Input 
                                                    type="number"
                                                    value={step.spent} 
                                                    onChange={(e) => handleUpdateStep(idx, 'spent', e.target.value)}
                                                    className="h-8 w-24 text-right ml-auto"
                                                />
                                            ) : (
                                                <span className="font-mono font-bold text-gray-900">{parseFloat(step.spent).toLocaleString()}</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {isEditingSteps ? (
                                                <Input 
                                                    value={step.notes} 
                                                    onChange={(e) => handleUpdateStep(idx, 'notes', e.target.value)}
                                                    className="h-8 w-full"
                                                    placeholder="Add notes..."
                                                />
                                            ) : (
                                                <span className="text-gray-500 text-xs italic">{step.notes}</span>
                                            )}
                                        </td>
                                        {isEditingSteps && (
                                            <td className="px-4 py-3 text-center">
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                                                    onClick={() => handleDeleteStep(idx)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </td>
                                        )}
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}