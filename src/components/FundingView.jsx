import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Plus, Search, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { mockFunding } from '../data/mockData';

export function FundingView() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFunding = mockFunding.filter(
    (fund) =>
      fund.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fund.agency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFunding = mockFunding.reduce((sum, fund) => {
    const amount = parseFloat(fund.amount.replace(/[₹,]/g, ''));
    return sum + amount;
  }, 0);

  const activeFunding = mockFunding.filter((f) => f.status === 'Active').length;
  const completedFunding = mockFunding.filter((f) => f.status === 'Completed').length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 mb-2">Funding & Grants</h2>
          <p className="text-gray-600">Track research funding and grants</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Grant
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Funding</p>
                <p className="text-gray-900">₹{(totalFunding / 10000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Grants</p>
                <p className="text-gray-900">{activeFunding}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-gray-900">{completedFunding}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search grants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFunding.map((fund) => (
          <Card key={fund.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="mb-2">{fund.title}</CardTitle>
                  <p className="text-sm text-gray-600">{fund.principalInvestigator}</p>
                </div>
                <Badge
                  variant={
                    fund.status === 'Active'
                      ? 'default'
                      : fund.status === 'Completed'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {fund.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-600">Grant Amount</span>
                  <span className="text-green-900">{fund.amount}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Funding Agency</p>
                    <p className="text-gray-900">{fund.agency}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="text-gray-900">{fund.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Start Date</p>
                    <p className="text-gray-900">{fund.startDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">End Date</p>
                    <p className="text-gray-900">{fund.endDate}</p>
                  </div>
                </div>

                {fund.status === 'Active' && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Budget Utilization</span>
                      <span className="text-gray-900">{fund.utilization}%</span>
                    </div>
                    <Progress value={fund.utilization} />
                  </div>
                )}

                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-500 mb-1">Research Area</p>
                  <p className="text-sm text-gray-900">{fund.researchArea}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
