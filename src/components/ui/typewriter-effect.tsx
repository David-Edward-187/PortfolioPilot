
"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const totalChars = wordsArray.reduce((acc, word) => acc + word.text.length, 0) + words.length - 1;

  const renderWords = () => {
    let charIndex = 0;
    return (
      <div className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => {
                const currentTotalIndex = charIndex;
                charIndex++;
                return (
                  <motion.span
                    key={`char-${index}`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{
                      duration: 0.1,
                      delay: currentTotalIndex * 0.08,
                    }}
                    viewport={{ once: true }}
                    className={cn('text-foreground', word.className)}
                  >
                    {char}
                  </motion.span>
                );
              })}
              {idx < wordsArray.length - 1 && <span>&nbsp;</span>}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("text-3xl md:text-5xl font-medium", className)}>
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: totalChars * 0.08 + 0.5, // Delay cursor until typing is done
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-9 md:h-12 bg-primary ml-2",
          cursorClassName
        )}
      />
    </div>
  );
};
