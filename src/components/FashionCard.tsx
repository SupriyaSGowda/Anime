import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FashionCardProps {
  title: string;
  caption: string;
  animeTitle: string;
  category: string;
  season: string;
  imageUrl: string;
}

export const FashionCard = ({
  title,
  caption,
  animeTitle,
  category,
  season,
  imageUrl,
}: FashionCardProps) => {
  return (
    <Card className="overflow-hidden group cursor-pointer bg-card border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20">
      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl animate-float">{imageUrl}</div>
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge className="bg-primary/90 text-primary-foreground">{category}</Badge>
          <Badge className="bg-secondary/90 text-secondary-foreground">{season}</Badge>
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{caption}</p>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-accent border-accent">
            {animeTitle}
          </Badge>
        </div>
      </div>
    </Card>
  );
};
