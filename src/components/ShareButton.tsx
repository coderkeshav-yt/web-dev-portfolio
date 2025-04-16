import { Share2, Copy, Twitter, Facebook, Linkedin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ShareButtonProps {
  title: string;
  description: string;
  className?: string;
}

const ShareButton = ({ title, description, className }: ShareButtonProps) => {
  const { toast } = useToast();
  const currentUrl = window.location.href;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Link copied!",
        description: "The link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the URL manually.",
        variant: "destructive",
      });
    }
  };

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-2 ${className}`}
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-slate-900/95 border-slate-800">
        <DropdownMenuItem
          onClick={() => openShareWindow(shareUrls.twitter)}
          className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white"
        >
          <Twitter className="w-4 h-4 text-blue-400" />
          <span>Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openShareWindow(shareUrls.facebook)}
          className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white"
        >
          <Facebook className="w-4 h-4 text-blue-600" />
          <span>Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => openShareWindow(shareUrls.linkedin)}
          className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white"
        >
          <Linkedin className="w-4 h-4 text-blue-500" />
          <span>LinkedIn</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={copyToClipboard}
          className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white"
        >
          <Copy className="w-4 h-4 text-violet-400" />
          <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;