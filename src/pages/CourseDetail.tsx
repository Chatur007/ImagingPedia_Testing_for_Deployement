import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { 
  Clock, BookOpen, Users, Star, Play, CheckCircle, Lock, 
  ArrowLeft, Download, Award, Globe, Shield, ChevronDown, X 
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const courseData = {
  1: {
    id: 1,
    title: "Radiology Fundamentals",
    description: "Master the basics of medical imaging interpretation and radiological anatomy. This comprehensive course covers X-ray, CT, MRI, and ultrasound fundamentals with hands-on case studies.",
    image: "https://img-c.udemycdn.com/course/750x422/4475632_fc79_2.jpg",
    duration: "40 hours",
    modules: 12,
    students: 1234,
    rating: 4.9,
    reviews: 328,
    price: 299,
    instructor: {
      name: "Dr. Michael Roberts",
      title: "Chief Radiologist, Stanford Medical",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop",
    },
    features: [
      "40+ hours of HD video content",
      "12 comprehensive modules",
      "Downloadable resources & notes",
      "Certificate of completion",
      "Lifetime access",
      "Practice exams included",
    ],
    curriculum: [
      { 
        title: "Introduction to Radiology", 
        lessons: 5, 
        duration: "3h 20m", 
        free: true,
        videos: [
          { id: 1, title: "Welcome to Radiology", duration: "12:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 2, title: "History of Medical Imaging", duration: "18:45", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 3, title: "Physics Basics", duration: "25:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 4, title: "Safety Protocols", duration: "15:10", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 5, title: "Equipment Overview", duration: "20:15", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
        ]
      },
      { 
        title: "X-Ray Fundamentals", 
        lessons: 8, 
        duration: "4h 45m", 
        free: false,
        videos: [
          { id: 1, title: "X-Ray Production", duration: "22:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 2, title: "Radiographic Principles", duration: "28:15", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 3, title: "Image Quality", duration: "19:45", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 4, title: "Positioning Techniques", duration: "31:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 5, title: "Chest X-Rays", duration: "26:10", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 6, title: "Extremity X-Rays", duration: "24:50", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 7, title: "Spine X-Rays", duration: "29:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 8, title: "Abdomen X-Rays", duration: "25:00", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
        ]
      },
      { 
        title: "CT Imaging Principles", 
        lessons: 7, 
        duration: "4h 10m", 
        free: false,
        videos: [
          { id: 1, title: "CT Fundamentals", duration: "28:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 2, title: "Hounsfield Units", duration: "16:45", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 3, title: "Windowing Techniques", duration: "22:10", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 4, title: "Multiplanar Reconstruction", duration: "25:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 5, title: "Contrast Administration", duration: "20:15", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 6, title: "CT Artifacts", duration: "24:00", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 7, title: "Clinical Applications", duration: "29:40", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
        ]
      },
      { 
        title: "MRI Basics", 
        lessons: 9, 
        duration: "5h 30m", 
        free: false,
        videos: [
          { id: 1, title: "MRI Physics Introduction", duration: "32:15", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 2, title: "Magnetic Field Fundamentals", duration: "28:40", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 3, title: "Spin Echo Sequences", duration: "25:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 4, title: "Gradient Echo Sequences", duration: "23:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 5, title: "T1 and T2 Weighting", duration: "19:50", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 6, title: "MRI Safety", duration: "21:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 7, title: "Artifacts in MRI", duration: "26:45", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 8, title: "Contrast Agents", duration: "20:10", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 9, title: "Clinical MRI Applications", duration: "31:00", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
        ]
      },
      { 
        title: "Ultrasound Techniques", 
        lessons: 6, 
        duration: "3h 45m", 
        free: false,
        videos: [
          { id: 1, title: "Ultrasound Physics", duration: "24:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 2, title: "Transducers and Probes", duration: "19:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 3, title: "Image Optimization", duration: "23:15", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 4, title: "Doppler Techniques", duration: "27:40", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 5, title: "Abdominal Ultrasound", duration: "30:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 6, title: "OB/GYN Ultrasound", duration: "25:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q"},
        ]
      },
      { 
        title: "Chest Radiology", 
        lessons: 8, 
        duration: "4h 20m", 
        free: false,
        videos: [
          { id: 1, title: "Chest Anatomy Review", duration: "28:45", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 2, title: "Normal Chest X-Ray", duration: "26:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 3, title: "Lung Pathology", duration: "31:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 4, title: "Mediastinal Masses", duration: "25:15", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 5, title: "Cardiac Pathology", duration: "24:50", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 6, title: "Pleural Diseases", duration: "22:40", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 7, title: "Pneumothorax and Hemothorax", duration: "20:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 8, title: "Chest CT Review", duration: "27:00", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
        ]
      },
      { 
        title: "Abdominal Imaging", 
        lessons: 7, 
        duration: "4h 00m", 
        free: false,
        videos: [
          { id: 1, title: "Abdominal Anatomy", duration: "29:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 2, title: "Liver Imaging", duration: "28:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 3, title: "Pancreatic Pathology", duration: "25:40", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 4, title: "Kidney and Ureter Imaging", duration: "26:15", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 5, title: "Bowel Pathology", duration: "24:50", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 6, title: "Abdominal Ultrasound", duration: "27:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 7, title: "Abdominal CT Interpretation", duration: "30:00", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
        ]
      },
      { 
        title: "Musculoskeletal Radiology", 
        lessons: 6, 
        duration: "3h 30m", 
        free: false,
        videos: [
          { id: 1, title: "MSK Anatomy Basics", duration: "26:40", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 2, title: "Shoulder Imaging", duration: "28:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 3, title: "Knee Imaging", duration: "31:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 4, title: "Hip and Pelvis", duration: "25:15", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 5, title: "Spine Imaging", duration: "29:00", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 6, title: "Fracture Patterns", duration: "24:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
        ]
      },
      { 
        title: "Neuroimaging", 
        lessons: 8, 
        duration: "4h 40m", 
        free: false,
        videos: [
          { id: 1, title: "Brain Anatomy", duration: "30:45", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 2, title: "Stroke Imaging", duration: "27:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 3, title: "Intracranial Hemorrhage", duration: "26:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 4, title: "Brain Tumors", duration: "28:40", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 5, title: "Infections and Inflammation", duration: "25:10", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 6, title: "Neurodegenerative Diseases", duration: "24:50", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 7, title: "Spine and Spinal Cord", duration: "29:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 8, title: "Advanced Neuro Techniques", duration: "31:00", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
        ]
      },
      { 
        title: "Pediatric Radiology", 
        lessons: 5, 
        duration: "2h 50m", 
        free: false,
        videos: [
          { id: 1, title: "Pediatric Physiology", duration: "24:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 2, title: "Pediatric Chest Imaging", duration: "26:15", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 3, title: "Pediatric Abdominal Imaging", duration: "28:45", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 4, title: "Pediatric Bone Disease", duration: "25:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 5, title: "Pediatric CNS Imaging", duration: "27:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
        ]
      },
      { 
        title: "Emergency Radiology", 
        lessons: 7, 
        duration: "3h 45m", 
        free: false,
        videos: [
          { id: 1, title: "Trauma Overview", duration: "25:40", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 2, title: "Head Trauma", duration: "28:30", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 3, title: "Chest Trauma", duration: "26:45", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 4, title: "Abdominal Trauma", duration: "29:15", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 5, title: "Spine Trauma", duration: "27:00", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 6, title: "Acute Abdomen", duration: "24:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 7, title: "Emergency Procedures", duration: "26:50", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
        ]
      },
      { 
        title: "Final Assessment", 
        lessons: 3, 
        duration: "1h 30m", 
        free: false,
        videos: [
          { id: 1, title: "Review Session", duration: "35:20", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 2, title: "Practice Exam Walkthrough", duration: "38:45", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
          { id: 3, title: "Final Tips and Strategies", duration: "16:00", videoUrl: "https://www.youtube.com/embed/tW2SjlMGj0Q" },
        ]
      },
    ],
  },
};

const CourseDetail = () => {
  const { id } = useParams();
  const course = courseData[Number(id) as keyof typeof courseData] || courseData[1];
  const [expandedModuleIndex, setExpandedModuleIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{title: string, videoUrl: string, duration: string} | null>(null);

  return (
    <>
      <Helmet>
        <title>{course.title} - Imagingpedia</title>
        <meta name="description" content={course.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24">
          {/* Hero Section */}
          <section className="relative py-16 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
              >
                <ArrowLeft size={18} />
                Back to Courses
              </Link>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Course Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-2"
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    Radiology
                  </span>
                  
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                    {course.title}
                  </h1>

                  <p className="text-muted-foreground text-lg mb-8">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center gap-2">
                      <Star size={20} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-foreground">{course.rating}</span>
                      <span className="text-muted-foreground">({course.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users size={18} />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={18} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen size={18} />
                      <span>{course.modules} modules</span>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
                    <img
                      src={course.instructor.image}
                      alt={course.instructor.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      <h4 className="font-display font-semibold text-foreground">{course.instructor.name}</h4>
                      <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Purchase Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-1"
                >
                  <div className="glass-card p-6 sticky top-28">
                    <div className="aspect-video rounded-lg overflow-hidden mb-6 relative group cursor-pointer">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-background/50 flex items-center justify-center group-hover:bg-background/60 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                          <Play className="text-primary-foreground" size={28} fill="currentColor" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-4xl font-bold text-foreground">${course.price}</span>
                      <span className="text-muted-foreground line-through">$499</span>
                      <span className="text-primary text-sm font-medium">40% off</span>
                    </div>

                    <Button variant="hero" size="xl" className="w-full mb-4">
                      Enroll Now
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      Add to Wishlist
                    </Button>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                      30-day money-back guarantee
                    </p>

                    <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <CheckCircle size={16} className="text-primary" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Course Curriculum */}
          <section className="py-16 bg-card/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                Course Curriculum
              </h2>

              <div className="space-y-4 max-w-4xl">
                {course.curriculum.map((module, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="glass-card overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedModuleIndex(expandedModuleIndex === index ? null : index)}
                      className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{module.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {module.lessons} lessons • {module.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {module.free ? (
                          <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Preview</span>
                        ) : (
                          <Lock size={16} className="text-muted-foreground" />
                        )}
                        <ChevronDown 
                          size={20} 
                          className={`text-muted-foreground transition-transform ${expandedModuleIndex === index ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </button>

                    {/* Videos List */}
                    {expandedModuleIndex === index && module.videos && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-border/50"
                      >
                        <div className="bg-background/50 p-4 space-y-3">
                          {module.videos.map((video: any, videoIndex: number) => (
                            <div
                              key={video.id}
                              onClick={() => setSelectedVideo(video)}
                              className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/30 transition-colors group cursor-pointer"
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center bg-primary/10 text-primary text-xs font-semibold">
                                {videoIndex + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                  {video.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Duration: {video.duration}
                                </p>
                              </div>
                              <div className="flex-shrink-0 flex items-center gap-2">
                                <Play size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="text-xs text-muted-foreground">{video.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                What You'll Get
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: Play, title: "HD Video Lessons", desc: "Crystal clear video content" },
                  { icon: Download, title: "Downloadable Notes", desc: "Study materials included" },
                  { icon: Award, title: "Certification", desc: "Industry-recognized certificate" },
                  { icon: Globe, title: "Lifetime Access", desc: "Learn at your own pace" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="glass-card p-6 text-center"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="text-primary" size={24} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl w-full p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-xl font-semibold">{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {selectedVideo && (
              <iframe
                src={selectedVideo.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseDetail;
