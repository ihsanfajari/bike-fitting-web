import { createElement, type ComponentType } from "react";
import {
  IconBike, IconMountain, IconGravel, IconFolding, IconBolt, IconKids,
  IconFrame, IconGear, IconWheel, IconCockpit, IconBackpack, IconShirt,
  IconTag, IconHelpCircle,
} from "./icons";

type IconComp = ComponentType<{ size?: number; className?: string }>;

const CATEGORY_ICON_MAP: Record<string, IconComp> = {
  roadbike: IconBike,
  mtb: IconMountain,
  gravel: IconGravel,
  folding: IconFolding,
  bmx: IconBike,
  electric: IconBolt,
  kids: IconKids,
  lainnya: IconHelpCircle,
  frame: IconFrame,
  groupset: IconGear,
  wheelset: IconWheel,
  cockpit: IconCockpit,
  accessory: IconBackpack,
  apparel: IconShirt,
};

export function categoryIconFor(slug: string): IconComp {
  return CATEGORY_ICON_MAP[slug] ?? IconTag;
}

export function CategoryIcon({
  slug,
  size = 22,
  className,
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  return createElement(categoryIconFor(slug), { size, className });
}
