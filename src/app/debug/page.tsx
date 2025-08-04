import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/lib/blog'

export default function DebugPage() {
  try {
    const allPosts = getAllPosts()
    const featuredPosts = getFeaturedPosts()
    const categories = getAllCategories()
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Blog Debug Page</h1>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">All Posts ({allPosts.length}):</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(allPosts, null, 2)}
          </pre>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Featured Posts ({featuredPosts.length}):</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(featuredPosts, null, 2)}
          </pre>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Categories ({categories.length}):</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(categories, null, 2)}
          </pre>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
        <pre className="bg-red-100 p-4 rounded">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    )
  }
}
