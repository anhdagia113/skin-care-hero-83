
import { useHomeData } from "@/hooks/useHomeData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Star, Clock, DollarSign } from "lucide-react";

const Home = () => {
  const { data: homeData, isLoading, error } = useHomeData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !homeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error loading data</h1>
          <p className="text-gray-600 mb-4">Please try again later</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:space-x-10">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {homeData.introduction.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {homeData.introduction.description}
              </p>
              <div className="flex space-x-4">
                <Link to="/booking">
                  <Button size="lg">Book an Appointment</Button>
                </Link>
                <Link to="/skin-test">
                  <Button variant="outline" size="lg">
                    Take Skin Test
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src={homeData.introduction.imageUrl || "/placeholder.svg"} 
                alt="Skincare center" 
                className="rounded-lg shadow-lg w-full object-cover h-[400px]" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover our range of premium skincare treatments
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.services.slice(0, 6).map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription className="flex items-center mt-2">
                    <Clock className="h-4 w-4 mr-1" /> {service.durationMinutes} minutes
                    <DollarSign className="h-4 w-4 ml-4 mr-1" /> ${service.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Link to={`/services/${service.id}`} className="w-full">
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Therapists Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Specialists</h2>
            <p className="mt-4 text-lg text-gray-600">
              Meet our team of expert skincare specialists
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {homeData.therapists.slice(0, 4).map((therapist) => (
              <Card key={therapist.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={therapist.photoUrl || "/placeholder.svg"} 
                    alt={`${therapist.firstName} ${therapist.lastName}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{therapist.firstName} {therapist.lastName}</CardTitle>
                  <CardDescription>{therapist.specialization}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-2">{therapist.bio}</p>
                </CardContent>
                <CardFooter>
                  <Link to={`/specialists/${therapist.id}`} className="w-full">
                    <Button variant="outline" className="w-full">View Profile</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/specialists">
              <Button variant="outline">View All Specialists</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest from our Blog</h2>
            <p className="mt-4 text-lg text-gray-600">
              Skincare tips, trends, and advice from our experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.blogs.slice(0, 3).map((blog) => (
              <Card key={blog.id} className="hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={blog.imageUrl || "/placeholder.svg"} 
                    alt={blog.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{blog.title}</CardTitle>
                  <CardDescription>
                    {new Date(blog.publishDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{blog.summary}</p>
                </CardContent>
                <CardFooter>
                  <Link to={`/blog/${blog.id}`} className="w-full">
                    <Button variant="outline" className="w-full">Read More</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/blog">
              <Button variant="outline">View All Articles</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
