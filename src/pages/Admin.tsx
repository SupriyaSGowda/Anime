import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Upload, Calendar, Users } from "lucide-react";
import { generateCaption, generateProposal } from "@/lib/openaiClient";

const Admin = () => {
  const { toast } = useToast();

  // ------------------- STATE -------------------
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [isGeneratingProposal, setIsGeneratingProposal] = useState(false);

  const [generatedCaption, setGeneratedCaption] = useState<string>("");
  const [proposalResult, setProposalResult] = useState<string>("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    category: "",
    gender: "",
    season: "",
    animeTitle: "",
    keywords: "",
  });

  const [proposalForm, setProposalForm] = useState({
    influencer: "",
    theme: "",
    style: "",
  });

  // ------------------- AI CAPTION GENERATOR -------------------
  const handleGenerateCaption = async () => {
    setIsGeneratingCaption(true);
    try {
      const result = await generateCaption(formData);
      setGeneratedCaption(result);

      toast({
        title: "Caption Ready! ✨",
        description: "AI generated a new caption.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to generate caption.",
        variant: "destructive",
      });
    }
    setIsGeneratingCaption(false);
  };

  // ------------------- SCHEDULE POST -------------------
  const handleSchedulePost = async () => {
    if (!generatedCaption) {
      toast({
        title: "No Caption!",
        description: "Please generate a caption first.",
        variant: "destructive",
      });
      return;
    }

    const postTimeInput = document.getElementById("postTime") as HTMLInputElement | null;
    const postTime = postTimeInput?.value;
    if (!postTime) {
      toast({
        title: "Missing Schedule",
        description: "Choose a schedule time.",
        variant: "destructive",
      });
      return;
    }

    try {
      await fetch("http://localhost:5000/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: generatedCaption, time: postTime }),
      });

      toast({
        title: "Scheduled! 🕒",
        description: "Your post is now scheduled.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to schedule post.",
        variant: "destructive",
      });
    }
  };

  // ------------------- COLLAB PROPOSAL -------------------
  const handleGenerateProposal = async () => {
    setIsGeneratingProposal(true);
    try {
      const result = await generateProposal(proposalForm);
      setProposalResult(result);

      toast({
        title: "Proposal Ready 🎉",
        description: "AI generated a collaboration proposal.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Proposal generation failed.",
        variant: "destructive",
      });
    }
    setIsGeneratingProposal(false);
  };

  // ------------------- IMAGE UPLOAD -------------------
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // ------------------- UI -------------------
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold bg-anime-gradient bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Manage anime fashion & AI content</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">

          {/* --------- AI CAPTION GENERATOR --------- */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold">AI Caption Generator</h2>
            </div>

            <div className="space-y-4">
              {/* IMAGE UPLOAD */}
              <div>
                <Label>Upload Fashion Image</Label>
                <div className="mt-3 flex flex-col items-center">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    {!imagePreview ? (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload</p>
                      </>
                    ) : (
                      <img src={imagePreview} alt="Preview" className="h-full object-contain p-2" />
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </div>

              {/* FORM FIELDS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
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
                  <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
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
                <Select value={formData.season} onValueChange={(v) => setFormData({ ...formData, season: v })}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spring">Spring</SelectItem>
                    <SelectItem value="summer">Summer</SelectItem>
                    <SelectItem value="fall">Fall</SelectItem>
                    <SelectItem value="winter">Winter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Input
                placeholder="Anime Title"
                value={formData.animeTitle}
                onChange={(e) => setFormData({ ...formData, animeTitle: e.target.value })}
              />

              <Input
                placeholder="Keywords"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              />

              <Button className="w-full" onClick={handleGenerateCaption} disabled={isGeneratingCaption}>
                {isGeneratingCaption ? "Generating..." : "Generate Caption"}
              </Button>

              {/* BIGGER CAPTION DISPLAY */}
              {generatedCaption && (
                <div>
                  <Label className="text-lg font-semibold mt-2">Generated Caption</Label>
                  <Textarea
                    value={generatedCaption}
                    readOnly
                    className="min-h-[160px] text-base whitespace-pre-wrap"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* --------- SCHEDULE POST --------- */}
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-bold">Auto-Schedule Posts</h2>
            </div>

            <div className="space-y-4">
              <Input id="postTime" type="datetime-local" />
              <Label className="text-sm">Preview Caption</Label>
              <Textarea value={generatedCaption} readOnly className="min-h-[120px] whitespace-pre-wrap" />

              <Button className="w-full bg-secondary" onClick={handleSchedulePost}>
                Schedule Post
              </Button>
            </div>
          </Card>

          {/* --------- COLLAB PROPOSAL --------- */}
          <Card className="p-6 bg-card border-border md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold">Collaboration Proposal Generator</h2>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Target Influencer/Designer"
                value={proposalForm.influencer}
                onChange={(e) => setProposalForm({ ...proposalForm, influencer: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Anime Theme"
                  value={proposalForm.theme}
                  onChange={(e) => setProposalForm({ ...proposalForm, theme: e.target.value })}
                />
                <Input
                  placeholder="Fashion Style"
                  value={proposalForm.style}
                  onChange={(e) => setProposalForm({ ...proposalForm, style: e.target.value })}
                />
              </div>

              <Button className="w-full bg-accent" onClick={handleGenerateProposal} disabled={isGeneratingProposal}>
                {isGeneratingProposal ? "Generating..." : "Generate Proposal"}
              </Button>

              {/* PROPOSAL OUTPUT */}
              <div className="mt-6">
                <Label className="text-lg font-semibold">Generated Proposal</Label>
                <div className="mt-2 p-4 border rounded-lg bg-muted max-h-[260px] overflow-y-auto whitespace-pre-wrap">
                  {proposalResult ? (
                    <pre className="whitespace-pre-wrap">{proposalResult}</pre>
                  ) : (
                    <p className="text-muted-foreground">No proposal generated yet.</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Admin;
