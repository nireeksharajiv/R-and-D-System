import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FolderKanban, Users, BookOpen, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { mockProjects } from '../data/mockData';

export function Dashboard() {
  const stats = [
    {
      title: 'Active Projects',
      value: '24',
      change: '+3 this month',
      icon: FolderKanban,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Researchers',
      value: '156',
      change: '+8 new',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Publications',
      value: '342',
      change: '+12 this year',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Funding',
      value: '₹45.2M',
      change: '+₹8.5M this year',
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const recentProjects = mockProjects.slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-gray-900 mb-2">R&D Dashboard</h2>
        <p className="text-gray-600">Welcome to the Research & Development Monitoring System</p>
      </div>

      {/* Stats Grid */}
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
                  <p className="text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 truncate">{project.title}</p>
                    <p className="text-sm text-gray-500">{project.principalInvestigator}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          project.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : project.status === 'Completed'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="text-xs text-gray-500">{project.department}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{project.funding}</p>
                    <p className="text-xs text-gray-500">{project.progress}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900">Research Output Growing</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Publications increased by 15% compared to last year
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <FolderKanban className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900">New Collaborations</p>
                  <p className="text-xs text-gray-600 mt-1">
                    5 new industry partnerships established this quarter
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900">Pending Milestones</p>
                  <p className="text-xs text-gray-600 mt-1">
                    8 projects have upcoming milestones this month
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-900">Grant Applications</p>
                  <p className="text-xs text-gray-600 mt-1">
                    12 grant proposals submitted, awaiting approval
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
