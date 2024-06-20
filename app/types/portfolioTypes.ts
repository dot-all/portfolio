import { Dispatch, SetStateAction } from "react";

//Home
export interface LinkProps {
  text: string;
  hiddenText: string;
  className?: string;
  href: string;
}

// Common - AnimatedText Types
interface TransitionOptions {
  duration?: number;
  delay?: number;
}

export interface TextVariant {
  [key: string]: {
    y: number;
    transition?: TransitionOptions;
  };
}

// Project types
export interface ProjectInterface {
  title: string;
  type: string;
  src: string;
  color?: string;
}

export interface ModalState {
  active: boolean;
  index: number;
}

// UseState

export type SetUseState = Dispatch<SetStateAction<boolean>>;