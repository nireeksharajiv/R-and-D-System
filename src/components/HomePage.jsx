import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FolderKanban, Users, BookOpen, DollarSign, TrendingUp, AlertCircle, FileText, ChevronDown, FileCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockProjects } from '../data/mockData';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import carouselImage1 from '../assets/885b4e2a5e1f2c27e35b03c84506504008f8bd11.png';
import carouselImage2 from '../assets/b15c951145d665c2df19b9b8a47436217290641c.png';
import carouselImage3 from '../assets/image.png';

export function HomePage({ onNavigate }) {
  const [selectedNewsletters, setSelectedNewsletters] = useState(['March 2025', 'April 2025']);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [carouselImage1, carouselImage2, carouselImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

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
      title: 'Patents',
      value: '45',
      change: '+4 this year',
      icon: FileCheck,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
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

  const allNewsletters = [
    'January 2025',
    'February 2025',
    'March 2025',
    'April 2025',
    'May 2025',
    'June 2025',
    'July 2025',
    'August 2025',
    'September 2025',
    'October 2025',
    'November 2025',
    'December 2025',
  ];

  const handleNewsletterSelect = (newsletter) => {
    if (!selectedNewsletters.includes(newsletter)) {
      setSelectedNewsletters([...selectedNewsletters, newsletter]);
    }
  };

  const handleNewsletterClick = (newsletter) => {
    const pdfContent = `...`;
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#09015f' }}>
      <div className="relative z-10 p-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-white mb-8 tracking-normal">
            Welcome to the Research & Development Monitoring System
          </h2>

          <div className="max-w-5xl mx-auto rounded-2xl p-6" style={{ backgroundColor: '#dfe0db' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-[400px]">
                {carouselImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide
                        ? 'bg-white w-8'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="bg-white">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white">
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

          <Card className="bg-white">
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

        <div className="mt-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-white" />
            <h2 className="text-white">Newsletters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedNewsletters.map((newsletter) => (
              <Card
                key={newsletter}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200 hover:border-blue-300 bg-white"
                onClick={() => handleNewsletterClick(newsletter)}
              >
                <CardHeader className="space-y-6 py-8">
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center mx-auto shadow-lg" style={{ backgroundColor: '#6366f1' }}>
                    <FileText className="w-9 h-9 text-white" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-center font-semibold">{newsletter}</CardTitle>
                  <CardDescription className="text-center text-xs text-gray-500 font-normal">Click to view PDF</CardDescription>
                </CardHeader>
              </Card>
            ))}

            <Card className="border-2 border-dashed border-gray-300 flex items-center justify-center bg-white">
              <CardContent className="flex items-center justify-center p-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      More <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-64 overflow-y-auto">
                    {allNewsletters
                      .filter((newsletter) => !selectedNewsletters.includes(newsletter))
                      .map((newsletter) => (
                        <DropdownMenuItem
                          key={newsletter}
                          onClick={() => handleNewsletterSelect(newsletter)}
                        >
                          {newsletter}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="mt-12 bg-[#dfe0db] text-gray-900 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="mb-4">Contact Us</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>RNS Institute of Technology</p>
                  <p>Channasandra, RR Nagar Post</p>
                  <p>Bengaluru - 560098</p>
                  <p>Karnataka, India</p>
                  <p className="mt-3">Phone: +91-80-2608 1111</p>
                  <p>Email: info@rnsit.ac.in</p>
                </div>
              </div>

              <div>
                <h3 className="mb-4">Departments</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Computer Science & Engineering</li>
                  <li>Information Science & Engineering</li>
                  <li>Electronics & Communication Engineering</li>
                  <li>Electrical & Electronics Engineering</li>
                  <li>Mechanical Engineering</li>
                  <li>Civil Engineering</li>
                  <li>Master of Computer Applications</li>
                  <li>MBA</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4">Admissions</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>Admissions Open for 2025-26</p>
                  <p className="mt-3">Undergraduate Programs:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• B.E. Programs</li>
                    <li>• B.Arch Program</li>
                  </ul>
                  <p className="mt-3">Postgraduate Programs:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• M.Tech Programs</li>
                    <li>• MCA</li>
                    <li>• MBA</li>
                  </ul>
                  <p className="mt-3">Admission Helpline:</p>
                  <p>+91-80-2608 2222</p>
                </div>
              </div>
<div>
                <h3 className="mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Research &amp; Development Cell</li>
                  <li>Placement &amp; Training</li>
                  <li>Library</li>
                  <li>Alumni</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-300 pt-4 text-xs text-gray-600 flex flex-col md:flex-row items-center justify-between gap-2">
              <p>© {new Date().getFullYear()} RNS Institute of Technology. All rights reserved.</p>
              <p>R&D Monitoring System – Internal use only.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

