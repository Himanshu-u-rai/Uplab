'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Star, 
  Calendar, 
  TrendingUp,
  Edit,
  Plus,
  Eye
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalPosts: number
  featuredPosts: number
  recentPosts: any[]
}

interface ViewStats {
  totalViews: number
  dailyViews: Record<string, number>
  posts: Record<string, number>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    featuredPosts: 0,
    recentPosts: []
  })
  const [viewStats, setViewStats] = useState<ViewStats>({
    totalViews: 0,
    dailyViews: {},
    posts: {}
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch blog posts data
      const response = await fetch('/api/admin/dashboard')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }

      // Fetch view statistics
      const viewResponse = await fetch('/api/views')
      if (viewResponse.ok) {
        const viewData = await viewResponse.json()
        if (viewData.success) {
          setViewStats(viewData.data)
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate today's views
  const today = new Date().toISOString().split('T')[0]
  const todayViews = viewStats.dailyViews[today] || 0

  const dashboardCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Featured',
      value: stats.featuredPosts,
      icon: Star,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'This Month',
      value: stats.recentPosts.length,
      icon: Calendar,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Total Views',
      value: viewStats.totalViews.toLocaleString(),
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Today\'s Views',
      value: todayViews.toLocaleString(),
      icon: Eye,
      color: 'from-cyan-500 to-blue-500'
    }
  ]

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading dashboard...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color} mr-4`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{card.title}</p>
                  <p className="text-2xl font-bold text-white">{card.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/editor"
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Post
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Blog
            </Link>
          </div>
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Recent Posts</h3>
            <Link
              href="/admin/posts"
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              View All
            </Link>
          </div>
          
          {stats.recentPosts.length === 0 ? (
            <p className="text-gray-400">No posts yet. Create your first post!</p>
          ) : (
            <div className="space-y-3">
              {stats.recentPosts.slice(0, 5).map((post: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{post.title}</h4>
                    <p className="text-sm text-gray-400">{post.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {viewStats.posts[post.slug] && (
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {viewStats.posts[post.slug].toLocaleString()}
                      </span>
                    )}
                    <Link
                      href={`/admin/editor?edit=${post.slug}`}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* View Analytics */}
        {Object.keys(viewStats.posts).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <h3 className="text-xl font-bold text-white mb-4">Most Viewed Posts</h3>
            <div className="space-y-3">
              {Object.entries(viewStats.posts)
                .sort(([,a], [,b]) => (b as number) - (a as number))
                .slice(0, 5)
                .map(([slug, views]) => {
                  const post = stats.recentPosts.find(p => p.slug === slug)
                  return (
                    <div key={slug} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">
                          {post ? post.title : slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <Link
                          href={`/blog/${slug}`}
                          className="text-sm text-purple-400 hover:text-purple-300"
                        >
                          View Post
                        </Link>
                      </div>
                      <div className="flex items-center gap-2 text-white">
                        <Eye className="w-4 h-4" />
                        <span className="font-semibold">{(views as number).toLocaleString()}</span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </motion.div>
        )}
      </div>
    </AdminLayout>
  )
}