import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";

interface CancelRequestDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function CancelRequestDialog({ isOpen, onConfirm, onClose }: CancelRequestDialogProps) {
  return (
    <Dialog isOpen={isOpen} title="انصراف از درخواست؟" onClose={onClose}>
      <p className="text-label leading-7 text-text-secondary">
        کارفرما دیگر درخواستت را نمی‌بیند و برای این آگهی می‌توانی دوباره درخواست بدهی.
      </p>
      <div className="mt-5 flex flex-col gap-2 md:flex-row">
        <Button color="error" className="md:flex-1" onClick={onConfirm}>
          انصراف از درخواست
        </Button>
        <Button variant="secondary" className="md:flex-1" onClick={onClose}>
          برگشت
        </Button>
      </div>
    </Dialog>
  );
}
