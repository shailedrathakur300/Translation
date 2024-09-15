"use client";
import "regenerator-runtime/runtime";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import TextArea from "../components/inputs/TextArea";
import FileUpload from "../components/inputs/FileUpload";
import { rtfToText } from "../utils/rtfToText";
import LinkPaste from "../components/inputs/LinkPaste";
import useTranslate from "../hooks/useTranslate";
import LanguageSelector from "../components/inputs/LanguageSelector";
import SpeechRecognitionComponent from "../components/SpeechRecognition/SpeechRecognition";
import { IconFileUpload, IconVolume } from "@tabler/icons-react";

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favourite, setFavourite] = useState<boolean>(false);
  const [languages] = useState<string[]>([
    "English",
    "French",
    "Spanish",
    "German",
    "Hindi",
    "Arabic",
    "Portuguese",
    "Chinese",
    "Japanese",
    "Korean",
    "Russian",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("hindi");
  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLinkPaste = (text: string) => {};

  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative overflow-hidden h-screen">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">
              Easy<span className="text-[#f87315]">Talk</span>
            </h1>
            <p className="mt-3 text-neutral-400">
              EasyTalk: Breaking Language Barriers for a Connected World
            </p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div className="relative z-10 flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id="source-language"
                    value={sourceText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                      setSourceText(e.target.value);
                    }}
                    placeholder="Source Language"
                  />
                  <div className="flex flex-row justify-between w-full ">
                    <span className="cursor-pointer flex space-x-2 flex-row">
                      <SpeechRecognitionComponent
                        setSourceText={setSourceText}
                      />
                      <IconVolume
                        size={22}
                        onClick={() => handleAudioPlayback(sourceText)}
                      />
                      {/* file upload component */}
                      <FileUpload handleFileUpload={handleFileUpload} />
                      <LinkPaste handleLinkPaste={handleLinkPaste} />
                    </span>
                    <span className="text-sm pr-4">
                      {sourceText.length} / 2000
                    </span>
                  </div>
                </div>
                <div className="relative z-10 flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id={"target-language"}
                    value={targetText}
                    onChange={() => {}}
                    placeholder={"Target Language"}
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex space-x-2 flex-row iteam-center">
                      <LanguageSelector
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        languages={languages}
                      />
                      <IconVolume
                        size={22}
                        onClick={() => handleAudioPlayback(targetText)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
