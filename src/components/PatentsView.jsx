import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { FileCheck, Search, Calendar, Users, Building2, Globe, TrendingUp, Eye } from 'lucide-react';
import { mockPatents } from '../data/mockData';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

export function PatentsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPatent, setSelectedPatent] = useState(null);

  const statuses = ['All', 'Granted', 'Published', 'Under Examination', 'Filed'];

  const filteredPatents = mockPatents.filter((patent) => {
    const matchesSearch =
      patent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patent.inventors.some((inv) => inv.toLowerCase().includes(searchTerm.toLowerCase())) ||
      patent.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patent.technologyArea.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || patent.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Granted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Published':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Under Examination':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Filed':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCommercialPotentialColor = (potential) => {
    switch (potential) {
      case 'Very High':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'High':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Low':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const stats = [
    {
      title: 'Total Patents',
      value: mockPatents.length.toString(),
      icon: FileCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Granted Patents',
      value: mockPatents.filter((p) => p.status === 'Granted').length.toString(),
      icon: FileCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Under Review',
      value: mockPatents.filter((p) => p.status === 'Under Examination' || p.status === 'Published').length.toString(),
      icon: FileCheck,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Filed This Year',
      value: mockPatents.filter((p) => p.filingDate.includes('2023')).length.toString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Patent Management</h1>
        <p className="text-gray-600">Track and manage institutional patents and intellectual property</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by title, inventor, department, or technology area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {statuses.map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? 'default' : 'outline'}
                  onClick={() => setSelectedStatus(status)}
                  size="sm"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {filteredPatents.map((patent) => (
          <Card key={patent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="mb-2">{patent.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={getStatusColor(patent.status)}>{patent.status}</Badge>
                    {patent.patentNumber && (
                      <Badge variant="outline" className="border-gray-300">
                        {patent.patentNumber}
                      </Badge>
                    )}
                    <Badge className={getCommercialPotentialColor(patent.commercialPotential)}>
                      {patent.commercialPotential} Commercial Potential
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPatent(patent)}
                  className="flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Inventors</p>
                    <p className="text-sm text-gray-900">{patent.inventors.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="text-sm text-gray-900">{patent.department}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Patent Office</p>
                    <p className="text-sm text-gray-900">{patent.patentOffice}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Filing Date</p>
                    <p className="text-sm text-gray-900">{patent.filingDate}</p>
                  </div>
                </div>
                {patent.grantDate && (
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Grant Date</p>
                      <p className="text-sm text-gray-900">{patent.grantDate}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <FileCheck className="w-4 h-4 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Technology Area</p>
                    <p className="text-sm text-gray-900">{patent.technologyArea}</p>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Abstract</p>
                <p className="text-sm text-gray-700 line-clamp-2">{patent.abstract}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No patents found matching your criteria</p>
          </CardContent>
        </Card>
      )}

      {selectedPatent && (
        <Dialog open={!!selectedPatent} onOpenChange={() => setSelectedPatent(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedPatent.title}</DialogTitle>
              <DialogDescription>Detailed patent information and specifications</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className={getStatusColor(selectedPatent.status)}>{selectedPatent.status}</Badge>
                {selectedPatent.patentNumber && (
                  <Badge variant="outline" className="border-gray-300">
                    Patent: {selectedPatent.patentNumber}
                  </Badge>
                )}
                <Badge variant="outline" className="border-gray-300">
                  Application: {selectedPatent.applicationNumber}
                </Badge>
                <Badge className={getCommercialPotentialColor(selectedPatent.commercialPotential)}>
                  {selectedPatent.commercialPotential} Commercial Potential
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-3 text-gray-900">Patent Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Patent Office</p>
                      <p className="text-sm text-gray-900">{selectedPatent.patentOffice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Filing Type</p>
                      <p className="text-sm text-gray-900">{selectedPatent.filingType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Number of Claims</p>
                      <p className="text-sm text-gray-900">{selectedPatent.claims}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Technology Area</p>
                      <p className="text-sm text-gray-900">{selectedPatent.technologyArea}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-gray-900">Important Dates</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Filing Date</p>
                      <p className="text-sm text-gray-900">{selectedPatent.filingDate}</p>
                    </div>
                    {selectedPatent.publicationDate && (
                      <div>
                        <p className="text-sm text-gray-600">Publication Date</p>
                        <p className="text-sm text-gray-900">{selectedPatent.publicationDate}</p>
                      </div>
                    )}
                    {selectedPatent.grantDate && (
                      <div>
                        <p className="text-sm text-gray-600">Grant Date</p>
                        <p className="text-sm text-gray-900">{selectedPatent.grantDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-gray-900">Inventors</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPatent.inventors.map((inventor, index) => (
                    <Badge key={index} variant="outline" className="border-blue-300 text-blue-700">
                      {inventor}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="mb-2 text-gray-900">Department</h3>
                  <p className="text-sm text-gray-700">{selectedPatent.department}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-gray-900">Collaborators</h3>
                  <p className="text-sm text-gray-700">{selectedPatent.collaborators}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-gray-900">Abstract</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedPatent.abstract}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}