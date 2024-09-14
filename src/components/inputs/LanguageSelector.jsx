import React from "react";
import { IconLanguage } from "@tabler/icons-react";

const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => (
  <span className="cursor-pointer roundel-full space-x-1 pl-2 bg-black flex items-center flex-row ">
    <IconLanguage size={20} />
    <select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      className="bg-black flex flex-row rounded-full py-1 text-white"
    >
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  </span>
);

export default LanguageSelector;
