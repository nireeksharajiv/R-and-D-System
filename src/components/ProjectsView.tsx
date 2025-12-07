import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Plus, Search, Filter, Eye } from 'lucide-react';
import { mockProjects } from '../data/mockData';
import { ProjectDialog } from './ProjectDialog';

export function ProjectsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.principalInvestigator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 mb-2">Research Projects</h2>
          <p className="text-gray-600">Manage and monitor all R&D projects</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search projects or investigators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'Active' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('Active')}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === 'Planning' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('Planning')}
              >
                Planning
              </Button>
              <Button
                variant={filterStatus === 'Completed' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('Completed')}
              >
                Completed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="mb-2">{project.title}</CardTitle>
                  <p className="text-sm text-gray-600">{project.principalInvestigator}</p>
                </div>
                <Badge
                  variant={
                    project.status === 'Active'
                      ? 'default'
                      : project.status === 'Completed'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Department</p>
                    <p className="text-gray-900">{project.department}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Funding</p>
                    <p className="text-gray-900">{project.funding}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="text-gray-900">{project.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Team Size</p>
                    <p className="text-gray-900">{project.teamSize} members</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-gray-900">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsDialogOpen(true);
                  }}
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
}
