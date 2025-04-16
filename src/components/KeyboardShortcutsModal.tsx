import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Command } from 'lucide-react';
import { getKeyboardShortcutsList } from '@/hooks/use-keyboard-shortcuts';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeyboardShortcutsModal = ({ isOpen, onClose }: KeyboardShortcutsModalProps) => {
  const shortcuts = getKeyboardShortcutsList();

  const categories = [
    {
      title: "Navigation",
      shortcuts: shortcuts,
      icon: "🎮"
    },
    {
      title: "Quick Actions",
      shortcuts: [
        { key: 'Ctrl/⌘ + K', description: 'Open quick search' },
        { key: 'Alt + K', description: 'Show keyboard shortcuts' },
      ],
      icon: "⚡"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Command className="w-5 h-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {categories.map((category) => (
            <div key={category.title} className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-medium text-slate-200">
                <span>{category.icon}</span>
                {category.title}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {category.shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-slate-700/50"
                  >
                    <span className="text-sm text-slate-300">{shortcut.description}</span>
                    <kbd className="px-2 py-1 text-xs font-mono rounded bg-slate-900 text-violet-400 border border-slate-700">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 text-center text-xs text-slate-500">
          Press <kbd className="px-2 py-0.5 text-xs rounded bg-slate-800 text-violet-400">Esc</kbd> to close
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsModal;