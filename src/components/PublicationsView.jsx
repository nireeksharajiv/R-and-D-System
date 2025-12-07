import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Plus, Search, ExternalLink, FileText, Users } from 'lucide-react';
import { mockPublications } from '../data/mockData';

export function PublicationsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredPublications = mockPublications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || pub.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 mb-2">Publications</h2>
          <p className="text-gray-600">Track research output and publications</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Publication
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search publications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button
                variant={filterType === 'Journal' ? 'default' : 'outline'}
                onClick={() => setFilterType('Journal')}
              >
                Journal
              </Button>
              <Button
                variant={filterType === 'Conference' ? 'default' : 'outline'}
                onClick={() => setFilterType('Conference')}
              >
                Conference
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredPublications.map((publication) => (
          <Card key={publication.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg shrink-0">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-gray-900">{publication.title}</h3>
                    <Badge
                      variant={
                        publication.status === 'Published'
                          ? 'default'
                          : publication.status === 'Accepted'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {publication.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Users className="w-4 h-4" />
                    <span>{publication.authors}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Venue</p>
                      <p className="text-sm text-gray-900">{publication.venue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="text-sm text-gray-900">{publication.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Year</p>
                      <p className="text-sm text-gray-900">{publication.year}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Citations</p>
                      <p className="text-sm text-gray-900">{publication.citations}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {publication.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>

                  {publication.doi && (
                    <div className="mt-3 pt-3 border-t">
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                        DOI: {publication.doi}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
