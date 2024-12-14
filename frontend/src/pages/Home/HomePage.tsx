import { Link } from "react-router-dom"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import Header from "@components/common/Header"
import { ArrowRight, BarChart2, Truck, ShieldCheck, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 pt-24 pb-10">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
              Welcome to TrackSure
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your IoT-powered food supply chain tracking system for enhanced safety and efficiency
            </p>
            <div className="mt-8 flex justify-center gap-4 pb-16">
              <Button asChild size="lg">
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/signin">Sign In</Link>
              </Button>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-4 mb-24">
            <Card>
              <CardHeader>
                <Truck className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Real-time Tracking</CardTitle>
                <CardDescription>Monitor your shipments in real-time with IoT sensors</CardDescription>
              </CardHeader>
              <CardContent>
                Track temperature, humidity, and location of your food products throughout the supply chain.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <ShieldCheck className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Enhanced Food Safety</CardTitle>
                <CardDescription>Ensure compliance with food safety regulations</CardDescription>
              </CardHeader>
              <CardContent>
                Receive instant alerts for any deviations in storage conditions to maintain product quality.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BarChart2 className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Data-Driven Insights</CardTitle>
                <CardDescription>Make informed decisions with advanced analytics</CardDescription>
              </CardHeader>
              <CardContent>
                Gain valuable insights into your supply chain performance and optimize operations.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Efficient Operations</CardTitle>
                <CardDescription>Streamline your supply chain processes</CardDescription>
              </CardHeader>
              <CardContent>
              Designed for reliability, the platform retrieves and can stores data locally, ensuring uninterrupted operations even during internet outages.
              </CardContent>
            </Card>
          </section>

          <section className="text-center py-5">
            <h2 className="text-3xl font-bold mb-4">Ready to optimize your food supply chain?</h2>
            <Button asChild size="lg">
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left py-2 md:py-4">
            <p className="text-sm text-muted-foreground">
              © 2024 TrackSure. Team NoMads
            </p>
          </div>
          <nav className="flex gap-4 py-2 md:py-4">
            <Link to="/about" className="text-sm text-muted-foreground hover:underline">
              About
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

