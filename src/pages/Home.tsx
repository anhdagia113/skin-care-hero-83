
import { useHomeData } from "@/hooks/useHomeData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Star, Clock, DollarSign, Sparkles, Heart, FlowerIcon } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SectionHeader } from "@/components/ui/section-header";
import { HeroSection } from "@/components/ui/hero-section";

const Home = () => {
  const { data: homeData, isLoading, error } = useHomeData();

  if (isLoading) {
    return <LoadingSpinner size={36} text="Loading beautiful content for you..." />;
  }

  if (error || !homeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Unable to load content</h1>
          <p className="text-gray-600 mb-4">We're having trouble getting the latest information for you</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Beauty Begins with Healthy Skin"
        description={homeData.introduction.description}
        imageSrc={homeData.introduction.imageUrl || "/placeholder.svg"}
      >
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/booking">
            <Button size="lg" className="w-full sm:w-auto">
              <CalendarDays className="mr-2 h-4 w-4" />
              Book an Appointment
            </Button>
          </Link>
          <Link to="/skin-test">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Sparkles className="mr-2 h-4 w-4" />
              Take Skin Test
            </Button>
          </Link>
        </div>
      </HeroSection>

      {/* Featured Services Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Our Services"
            subtitle="Discover our range of premium skincare treatments tailored for your unique beauty"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.services.slice(0, 6).map((service) => (
              <Card key={service.id} className="card-hover border-none shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription className="flex items-center mt-2 text-sm">
                    <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" /> 
                    {service.durationMinutes} minutes
                    <DollarSign className="h-3.5 w-3.5 ml-4 mr-1 text-muted-foreground" /> 
                    ${service.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 text-sm">{service.description}</p>
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
              <Button variant="outline">
                View All Services
                <FlowerIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Therapists Section */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <SectionHeader
            title="Our Specialists"
            subtitle="Meet our team of expert skincare specialists dedicated to your beauty journey"
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {homeData.therapists.slice(0, 4).map((therapist) => (
              <Card key={therapist.id} className="card-hover border-none overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={therapist.photoUrl || "/placeholder.svg"} 
                    alt={`${therapist.firstName} ${therapist.lastName}`} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{therapist.firstName} {therapist.lastName}</CardTitle>
                  <CardDescription>{therapist.specialization}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-2 text-sm">{therapist.bio}</p>
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
              <Button variant="outline">
                Meet All Specialists
                <Heart className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Beauty Insights"
            subtitle="Skincare tips, trends, and expert advice to enhance your natural beauty"
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeData.blogs.slice(0, 3).map((blog) => (
              <Card key={blog.id} className="card-hover border-none shadow-sm overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={blog.imageUrl || "/placeholder.svg"} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{blog.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {new Date(blog.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric'
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 text-sm">{blog.summary}</p>
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
              <Button variant="outline">
                Browse All Articles
                <Star className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact & Schedule Section */}
      <section className="section-padding gradient-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <SectionHeader
                title="Visit Our Center"
                subtitle="Experience the difference with our personalized approach to skincare"
                centered={false}
              />
              <div className="space-y-4 mt-6">
                <p className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-3 text-primary" />
                  <span>Monday - Friday: 9:00 AM - 8:00 PM</span>
                </p>
                <p className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-3 text-primary" />
                  <span>Saturday: 10:00 AM - 6:00 PM</span>
                </p>
                <p className="flex items-center">
                  <CalendarDays className="h-5 w-5 mr-3 text-primary" />
                  <span>Sunday: 10:00 AM - 4:00 PM</span>
                </p>
              </div>
              <div className="mt-8">
                <Link to="/booking">
                  <Button>
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Schedule an Appointment
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img 
                src="/placeholder.svg" 
                alt="Our skincare center" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
