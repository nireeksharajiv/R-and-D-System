import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Plus, Search, Mail, BookOpen, Award } from 'lucide-react';
import { mockResearchers } from '../data/mockData';

export function ResearchersView() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResearchers = mockResearchers.filter((researcher) =>
    researcher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    researcher.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 mb-2">Researchers</h2>
          <p className="text-gray-600">Manage faculty and research scholars</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Researcher
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search researchers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Researchers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResearchers.map((researcher) => (
          <Card key={researcher.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shrink-0">
                  <span className="text-xl">{researcher.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="mb-1 text-base">{researcher.name}</CardTitle>
                  <p className="text-sm text-gray-600">{researcher.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{researcher.department}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-blue-50 rounded">
                    <p className="text-blue-900">{researcher.projects}</p>
                    <p className="text-xs text-blue-600">Projects</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded">
                    <p className="text-green-900">{researcher.publications}</p>
                    <p className="text-xs text-green-600">Papers</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded">
                    <p className="text-purple-900">{researcher.citations}</p>
                    <p className="text-xs text-purple-600">Citations</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {researcher.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{researcher.email}</span>
                </div>

                {researcher.hIndex && (
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Award className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-gray-900">h-index: {researcher.hIndex}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
