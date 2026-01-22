"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";

interface QuestionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  isValid?: boolean;
  canGoNext?: boolean;
  canGoBack?: boolean;
  onNext?: () => void;
  onBack?: () => void;
  stepNumber?: number;
  totalSteps?: number;
}

export function QuestionCard({
  title,
  description,
  children,
  isValid = true,
  canGoNext = true,
  canGoBack = true,
  onNext,
  onBack,
  stepNumber,
  totalSteps,
}: QuestionCardProps) {
  const { primaryColor } = useAppStore();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepNumber}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.4,
        }}
        className="w-full max-w-[900px] mx-auto"
      >
        <Card className="glass border-[var(--primary-color)]/20 shadow-2xl shadow-[var(--primary-color)]/5">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                {stepNumber !== undefined && totalSteps && (
                  <Badge
                    variant="default"
                    className="text-xs"
                    style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                  >
                    Section {stepNumber} of {totalSteps}
                  </Badge>
                )}
                <CardTitle className="text-3xl font-bold tracking-tight">
                  {title}
                </CardTitle>
                {description && (
                  <p className="text-base text-white/70">{description}</p>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>{children}</div>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                {canGoBack && onBack && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={onBack}
                    className="w-full md:w-auto"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {stepNumber !== undefined && totalSteps && stepNumber < totalSteps - 1 && (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => window.location.reload()}
                    className="w-full md:w-auto"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Restart
                  </Button>
                )}

                {canGoNext && onNext && isValid && (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={onNext}
                    className="w-full md:w-auto"
                    disabled={!isValid}
                  >
                    {stepNumber === totalSteps && totalSteps > 0 ? "Generate Prompt" : "Next"}
                    {stepNumber !== undefined && stepNumber < totalSteps - 1 && (
                      <ChevronRight className="ml-2 h-5 w-5" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
