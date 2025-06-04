import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Edit2 } from 'lucide-react';

export const Profile = () => {
  const [activeSection, setActiveSection] = useState<'basic' | 'password'>('basic');
  
  // Mock user data
  const userData = {
    firstName: 'yacin',
    lastName: 'nicay',
    email: 'y**********@gmail.com',
    phone: '0606060606'
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header with Avatar */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="h-32 bg-[#f1f5f9] rounded-t-lg"></div>
            <div className="px-6 pb-6">
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 rounded-full bg-pink-100 border-4 border-white overflow-hidden relative mx-auto">
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    👨
                  </div>
                  <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md">
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex mb-6">
            <button
              className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeSection === 'basic'
                  ? 'border-[#ff6600] text-[#ff6600]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveSection('basic')}
            >
              Basic Information
            </button>
            <button
              className={`flex-1 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                activeSection === 'password'
                  ? 'border-[#ff6600] text-[#ff6600]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveSection('password')}
            >
              Password
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm">
            {activeSection === 'basic' ? (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        defaultValue={userData.firstName}
                        className="rounded-lg border-2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        defaultValue={userData.lastName}
                        className="rounded-lg border-2"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      defaultValue={userData.phone}
                      className="rounded-lg border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={userData.email}
                      className="rounded-lg border-2"
                      disabled
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
                    >
                      Save changes
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Change Your Password</h2>
                
                <div className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      className="rounded-lg border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      className="rounded-lg border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="rounded-lg border-2"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
                    >
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};