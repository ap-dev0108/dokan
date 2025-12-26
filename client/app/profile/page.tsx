"use client"

import ProfileSidebar from "@/components/layout/profile-sidebar"
import { Mail, Phone, Calendar } from "lucide-react"
import { userProfile } from "@/hooks/userProfile"
import ProfileNotFound from "@/components/auth/Profile-NotFound"
import { useAuth } from "@/hooks/useAuth"

export default function ProfilePage() {
    const { profile, loading, error } = userProfile();
    const { IsLoggedIn } = useAuth();
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    if (IsLoggedIn == false) 
      return <div> <ProfileNotFound /> </div>
      
  return (
    <div className="min-h-screen bg-dokan-light">
      <div className="flex h-screen">
        {/* Fixed sidebar */}
        <div className="hidden md:block md:w-64 sticky top-0 h-screen bg-dokan-light border-r border-dokan-border overflow-y-auto">
          <ProfileSidebar />
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="dokan-container py-12">
            <div className="flex flex-col md:hidden mb-8">
              <ProfileSidebar />
            </div>

            <div className="bg-white border border-dokan-border rounded-lg p-8">
              <h1 className="font-manrope font-bold text-3xl text-dokan-dark mb-8">My Profile</h1>

              <div className="space-y-6">
                <div className="pb-6 border-b border-dokan-border">
                  <h2 className="font-manrope font-bold text-lg text-dokan-dark mb-2">Username</h2>
                  <p className="font-quicksand text-gray-600">{profile.name}</p>
                </div>

                <div className="pb-6 border-b border-dokan-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail size={20} className="text-dokan-dark" />
                    <h2 className="font-manrope font-bold text-lg text-dokan-dark">Email</h2>
                  </div>
                  <p className="font-quicksand text-gray-600">{profile.email}</p>
                </div>

                <div className="pb-6 border-b border-dokan-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone size={20} className="text-dokan-dark" />
                    <h2 className="font-manrope font-bold text-lg text-dokan-dark">Phone Number</h2>
                  </div>
                  <p className="font-quicksand text-gray-600">{profile.phone}</p>
                </div>

                <div className="pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar size={20} className="text-dokan-dark" />
                    <h2 className="font-manrope font-bold text-lg text-dokan-dark">Member Since</h2>
                  </div>
                  <p className="font-quicksand text-gray-600">
                    {new Date(profile.joinedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 bg-dokan-dark text-dokan-light rounded-lg font-quicksand font-medium hover:bg-gray-900 transition-colors">
                  Edit Profile
                </button>
                <button className="px-6 py-3 border-2 border-dokan-dark text-dokan-dark rounded-lg font-quicksand font-medium hover:bg-gray-100 transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
