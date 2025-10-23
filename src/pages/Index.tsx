import AdminLoginModal from "@/components/AdminLoginModal";
import { useNavigate } from "react-router-dom";
import ChatbotLoader from "@/components/ChatbotLoader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FashionCard } from "@/components/FashionCard";
import { Sparkles, Lock } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const afterLogin = () => {
    setLoginOpen(false);
    navigate("/admin");
  };

  const maleFashion = [
    {
      title: "Anime Street Hoodie",
      caption: "Unleash your inner titan with this bold Attack on Titan inspired hoodie. Freedom never looked so good. 🔥",
      animeTitle: "Attack on Titan",
      category: "Hoodie",
      season: "Winter",
      imageUrl: "👔",
    },
    {
      title: "Tokyo Drift T-Shirt",
      caption: "Channel the rebellion of Tokyo Revengers with this epic street tee. Youth energy meets urban style. ⚡",
      animeTitle: "Tokyo Revengers",
      category: "T-Shirt",
      season: "Summer",
      imageUrl: "👕",
    },
    {
      title: "Hero Academia Jacket",
      caption: "Plus Ultra! This varsity jacket brings My Hero Academia vibes to your everyday style. Be the hero. 💫",
      animeTitle: "My Hero Academia",
      category: "Jacket",
      season: "Spring",
      imageUrl: "🧥",
    },
  ];

  const femaleFashion = [
    {
      title: "Sakura Spirit Dress",
      caption: "Grace meets power in this Nezuko-inspired sakura dress. Elegant, fierce, and unforgettable. 🌸",
      animeTitle: "Demon Slayer",
      category: "Dress",
      season: "Spring",
      imageUrl: "👗",
    },
    {
      title: "Celestial Hoodie",
      caption: "Connect with the cosmos in this dreamy Your Name inspired hoodie. Pastel perfection for starry souls. ✨",
      animeTitle: "Your Name",
      category: "Hoodie",
      season: "Winter",
      imageUrl: "🌟",
    },
    {
      title: "Sailor Moon Tee",
      caption: "In the name of the moon, slay all day! This magical girl tee brings 90s anime nostalgia. 🌙",
      animeTitle: "Sailor Moon",
      category: "T-Shirt",
      season: "Summer",
      imageUrl: "💖",
    },
  ];

  const allFashion = [...maleFashion, ...femaleFashion];

  return (
    <>
      <ChatbotLoader />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <header className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-anime-gradient opacity-10 animate-glow"></div>
          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="text-center space-y-6">
              <div className="inline-block">
                <h1 className="text-5xl md:text-7xl font-bold bg-anime-gradient bg-clip-text text-transparent animate-float">
                  Anime Fashion
                </h1>
                <div className="h-1 bg-anime-gradient mt-2 rounded-full"></div>
              </div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                AI-Powered Anime-Inspired Fashion. Where Your Favorite Characters Meet Street Style.
              </p>
              <div className="flex gap-4 justify-center items-center flex-wrap">
                <Button size="lg" className="bg-primary hover:bg-primary/90 group">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Explore Collection
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary/10"
                  onClick={() => setLoginOpen(true)}
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Admin Login
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Fashion Gallery */}
        <main className="container mx-auto px-4 py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-card border border-border">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  All Styles
                </TabsTrigger>
                <TabsTrigger value="male" className="data-[state=active]:bg-muted data-[state=active]:text-foreground">
                  👔 Male
                </TabsTrigger>
                <TabsTrigger value="female" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                  👗 Female
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allFashion.map((item, index) => (
                <FashionCard key={index} {...item} />
              ))}
            </TabsContent>

            <TabsContent value="male" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {maleFashion.map((item, index) => (
                <FashionCard key={index} {...item} />
              ))}
            </TabsContent>

            <TabsContent value="female" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {femaleFashion.map((item, index) => (
                <FashionCard key={index} {...item} />
              ))}
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-16">
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-muted-foreground">
              Powered by AI Captions • Anime Fashion © 2025
            </p>
          </div>
        </footer>
      </div>
      <AdminLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={afterLogin} />
    </>
  );
};

export default Index;
