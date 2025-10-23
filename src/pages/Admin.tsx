import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Upload, Calendar, Users } from "lucide-react";

const Admin = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    gender: "",
    season: "",
    animeTitle: "",
    keywords: "",
    captionStyle: "",
  });

  const handleGenerateCaption = async () => {
    setIsGenerating(true);
    // Simulate AI caption generation
    setTimeout(() => {
      toast({
        title: "Caption Generated! ✨",
        description: "AI has created a perfect caption for your anime fashion piece.",
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold bg-anime-gradient bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Manage anime fashion & AI captions</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Upload & AI Caption Generator */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">AI Caption Generator</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="image-upload">Upload Fashion Image</Label>
                <div className="mt-2 flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                    <input id="image-upload" type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hoodie">Hoodie</SelectItem>
                      <SelectItem value="tshirt">T-Shirt</SelectItem>
                      <SelectItem value="dress">Dress</SelectItem>
                      <SelectItem value="jacket">Jacket</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Gender</Label>
                  <Select value={formData.gender} onValueChange={(v) => setFormData({...formData, gender: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="unisex">Unisex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Season</Label>
                <Select value={formData.season} onValueChange={(v) => setFormData({...formData, season: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="summer">Summer</SelectItem>
                    <SelectItem value="fall">Fall</SelectItem>
                    <SelectItem value="winter">Winter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Anime Title Inspiration</Label>
                <Input
                  placeholder="e.g., Attack on Titan, Demon Slayer"
                  value={formData.animeTitle}
                  onChange={(e) => setFormData({...formData, animeTitle: e.target.value})}
                />
              </div>

              <div>
                <Label>Keywords (comma separated)</Label>
                <Input
                  placeholder="e.g., freedom, battle spirit, urban"
                  value={formData.keywords}
                  onChange={(e) => setFormData({...formData, keywords: e.target.value})}
                />
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleGenerateCaption}
                disabled={isGenerating}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate AI Caption"}
              </Button>
            </div>
          </Card>

          {/* Auto-Schedule */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-bold">Auto-Schedule Posts</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Post Time</Label>
                <Input type="datetime-local" />
              </div>

              <div>
                <Label>Generated Caption</Label>
                <Textarea
                  placeholder="AI-generated caption will appear here..."
                  className="min-h-[120px]"
                  disabled
                />
              </div>

              <Button className="w-full bg-secondary hover:bg-secondary/90">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
            </div>
          </Card>

          {/* Collaborator Proposals */}
          <Card className="p-6 bg-card border-border md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold">Collaborator Proposal Generator</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Target Influencer/Designer</Label>
                <Input placeholder="Enter name or @ handle" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Anime Theme</Label>
                  <Input placeholder="e.g., Cyberpunk, Shonen" />
                </div>
                <div>
                  <Label>Fashion Style</Label>
                  <Input placeholder="e.g., Streetwear, Elegant" />
                </div>
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Proposal
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
