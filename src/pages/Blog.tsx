
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { SEO } from "@/components/SEO";
import { BlogPostGridSkeleton } from "@/components/ui/loading-skeletons";
import { BlogPostGridSkeleton } from "@/components/ui/loading-skeletons";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'] & {
  categories: Database['public']['Tables']['categories']['Row'] | null;
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Database['public']['Tables']['categories']['Row'][]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  const POSTS_PER_PAGE = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blog posts with categories
        const { data: postsData, error: postsError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            categories (*)
          `)
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;

        // Fetch categories for filter
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (categoriesError) throw categoriesError;

        setPosts(postsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = !selectedCategory || post.categories?.slug === selectedCategory;
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <SEO 
          title="Blog"
          description="Read Fredrick Mureti's blog about full stack development, React, Node.js, TypeScript, and modern web technologies."
          keywords="Fredrick Mureti Blog, Full Stack Development Blog, React Blog, Node.js Blog, TypeScript Blog"
          url="https://mureti.dev/blog"
        />
        
        <div className="min-h-screen bg-background">
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Tech Blog
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Insights, tutorials, and thoughts on cloud engineering, DevOps, 
                  and modern technology practices.
                </p>
              </div>
              
              <BlogPostGridSkeleton count={6} />
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Blog"
        description="Read Fredrick Mureti's blog about full stack development, React, Node.js, TypeScript, and modern web technologies. Learn about software engineering best practices and tutorials."
        keywords="Fredrick Mureti Blog, Full Stack Development Blog, React Blog, Node.js Blog, TypeScript Blog, Web Development Tutorials, Programming Blog"
        url="https://mureti.dev/blog"
      />
      
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Tech Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and thoughts on cloud engineering, DevOps, 
              and modern technology practices.
            </p>
          </div>

          {/* Search and Category Filter */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-fast ${
                    selectedCategory === ''
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  All Posts
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-fast ${
                      selectedCategory === category.slug
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-accent'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Blog Posts */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                {searchQuery || selectedCategory 
                  ? "No blog posts match your search criteria." 
                  : "No blog posts available yet. Check back soon!"
                }
              </p>
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                  }}
                  className="mt-4 text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {paginatedPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="block">
                  <Card className="shadow-soft transition-smooth hover:shadow-elegant hover:scale-105 cursor-pointer h-full overflow-hidden">
                    {post.cover_image && (
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-smooth hover:scale-110"
                        />
                      </div>
                    )}
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex-1">
                        {post.categories && (
                          <Badge variant="secondary" className="mb-3">
                            {post.categories.name}
                          </Badge>
                        )}
                        
                        <h3 className="text-xl font-semibold mb-3 line-clamp-2 hover:text-primary transition-fast">
                          {post.title}
                        </h3>
                        
                        {post.excerpt && (
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                          
                          {post.reading_time && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{post.reading_time} min read</span>
                            </div>
                          )}
                        </div>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{post.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="min-w-[40px]"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
    </>
  );
};

export default Blog;
