import { Badge } from "@/components/ui/badge";
import type { Event } from "@/lib/types";
import { cn } from "@/lib/utils";

type EventBadgeProps = {
  type: Event['event_type'];
};

const badgeStyles: Record<Event['event_type'], string> = {
  fire: 'bg-red-500/80 border-red-500 text-white hover:bg-red-500/90',
  accident: 'bg-orange-500/80 border-orange-500 text-white hover:bg-orange-500/90',
  crowd: 'bg-yellow-500/80 border-yellow-500 text-yellow-900 hover:bg-yellow-500/90',
  traffic_violation: 'bg-blue-500/80 border-blue-500 text-white hover:bg-blue-500/90',
  normal: 'bg-gray-500/80 border-gray-500 text-white hover:bg-gray-500/90',
};

export function EventBadge({ type }: EventBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize",
        badgeStyles[type] || badgeStyles.normal
      )}
    >
      {type.replace('_', ' ')}
    </Badge>
  );
}
