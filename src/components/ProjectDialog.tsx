import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Users, DollarSign, Target, FileText } from 'lucide-react';

interface ProjectDialogProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDialog({ project, isOpen, onClose }: ProjectDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle>{project.title}</DialogTitle>
              <p className="text-sm text-gray-600 mt-2">{project.principalInvestigator}</p>
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
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="publications">Output</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <h4 className="text-sm text-gray-900 mb-2">Project Description</h4>
              <p className="text-sm text-gray-600">
                This research project focuses on advancing the field through innovative methodologies
                and collaborative approaches. The team is working on developing new solutions that
                address current challenges in the domain.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Total Funding</p>
                  <p className="text-sm text-gray-900">{project.funding}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm text-gray-900">{project.duration}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Team Size</p>
                  <p className="text-sm text-gray-900">{project.teamSize} members</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Target className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="text-sm text-gray-900">{project.department}</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Progress</span>
                <span className="text-gray-900">{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Principal Investigator</p>
              <p className="text-sm text-gray-900">{project.principalInvestigator}</p>
              <p className="text-xs text-gray-600 mt-1">{project.department}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Co-Investigator</p>
              <p className="text-sm text-gray-900">Dr. Priya Sharma</p>
              <p className="text-xs text-gray-600 mt-1">Associate Professor</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-2">Research Scholars ({project.teamSize - 2})</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-900">Arjun Kumar - PhD Scholar</p>
                <p className="text-sm text-gray-900">Sneha Reddy - PhD Scholar</p>
                <p className="text-sm text-gray-900">Vikram Patel - M.Tech Student</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="space-y-3">
            {[
              { title: 'Literature Review', status: 'Completed', date: 'Jan 2024' },
              { title: 'Prototype Development', status: 'Completed', date: 'Apr 2024' },
              { title: 'Testing Phase', status: 'In Progress', date: 'Jul 2024' },
              { title: 'Data Analysis', status: 'Upcoming', date: 'Oct 2024' },
              { title: 'Final Report', status: 'Upcoming', date: 'Dec 2024' },
            ].map((milestone, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      milestone.status === 'Completed'
                        ? 'bg-green-500'
                        : milestone.status === 'In Progress'
                        ? 'bg-blue-500'
                        : 'bg-gray-300'
                    }`}
                  />
                  <div>
                    <p className="text-sm text-gray-900">{milestone.title}</p>
                    <p className="text-xs text-gray-500">{milestone.date}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {milestone.status}
                </Badge>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="publications" className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-1">
                    Novel Approach to Machine Learning Optimization
                  </p>
                  <p className="text-xs text-gray-600 mb-2">
                    IEEE Transactions on Neural Networks - 2024
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    Published
                  </Badge>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-1">Deep Learning Framework for IoT Systems</p>
                  <p className="text-xs text-gray-600 mb-2">International Conference on AI - 2024</p>
                  <Badge variant="outline" className="text-xs">
                    Accepted
                  </Badge>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 mb-1">Performance Analysis Study</p>
                  <p className="text-xs text-gray-600 mb-2">Journal of Computer Science - 2024</p>
                  <Badge variant="outline" className="text-xs">
                    Under Review
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
