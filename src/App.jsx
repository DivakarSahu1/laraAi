import React, { useEffect, useState } from "react";
import img from "./ai-humanoid.avif";

const App = () => {
  const [transcript, setTarnscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [information, setInformation] = useState("");
  const [voices, setvoice] = useState([]);
  const [askingQuestions, setAskingQuestions] = useState(false);
  const [questions, setQuestions] = useState([
    "What is your favorite hobby?",
    "What is your dream job?",
    "Where do you see yourself in 5 years?",
    "What inspires you the most?",
    "What is your biggest achievement so far?",
    "What motivates you to keep going?",
    "What is the best advice you've ever received?",
    "What are your strengths and weaknesses?",
    "If you could travel anywhere, where would you go?",
    "What book has had the most impact on your life?",
    "What do you think is the key to success?",
    "Who is your role model?",
    "If you could have dinner with any person, dead or alive, who would it be?",
    "What skill do you want to learn next?",
    "What is one thing you want to accomplish this year?",
    "What are you most passionate about?",
    "What do you want your legacy to be?",
    "What does happiness mean to you?",
    "What makes you feel fulfilled?",
    "How do you handle stress and pressure?",
  ]);
  const [userAnswer, setUserAnswer] = useState(""); // Store the answer
  const [responseReady, setResponseReady] = useState(false); // Flag for response readiness

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  const loadVoice = () => {
    const allVoice = window.speechSynthesis.getVoices();
    setvoice(allVoice);
    console.log("Available voices: ", allVoice);
  };

  useEffect(() => {
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoice;
    } else {
      loadVoice();
    }
  }, []);

  const startListening = () => {
    console.log("Starting speech recognition...");
    recognition.start();
    setIsListening(true);
  };

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript.toLowerCase();
    setTarnscript(spokenText);
    console.log("Recognized speech:", spokenText);
    handleVoiceCommand(spokenText);
  };

  recognition.onend = () => setIsListening(false);

  const speakText = (text) => {
    if (voices.length === 0) {
      console.warn("No voice available yet.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    const maleEnglishVoice =
      voices.find(
        (voice) =>
          voice.lang.startsWith("en-") &&
          voice.name.toLowerCase().includes("male")
      ) ||
      voices.find((voice) => voice.lang.startsWith("en-")) ||
      voices[0];

    utterance.voice = maleEnglishVoice;
    utterance.lang = maleEnglishVoice.lang || "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
    console.log("Speaking:", text);
  };

  const handleVoiceCommand = async (command) => {
    console.log("Handling command:", command);

    if (command.startsWith("open ")) {
      const site = command.split("open ")[1].trim();

      const sitesMap = {
        youtube: "https://www.youtube.com",
        facebook: "https://www.facebook.com",
        google: "https://www.google.com",
        twitter: "https://www.twitter.com",
        instagram: "https://www.instagram.com",
        github: "https://www.github.com",
      };

      if (sitesMap[site]) {
        window.open(sitesMap[site], "_blank");
        speakText(`Opening ${site}`);
        setInformation(`Opened ${site}`);
      } else {
        speakText(`I don't know how to open ${site}`);
        setInformation(`Could not find the website for ${site}`);
      }
      return;
    }

    if (command.includes("lara ask me a question")) {
      const response = "Sure, I will ask you some questions.";
      speakText(response);
      setInformation(response);
      askRandomQuestion();
    } else if (command.includes("answer")) {
      const response = "Ok, do you want to answer another one?";
      speakText(response);
      setInformation(response);
      setResponseReady(true); // Mark that the assistant is ready for the next response
    } else if (command.includes("yeah next please")) {
      if (askingQuestions) {
        askRandomQuestion();
      }
    } else if (command.includes("i don't know")) {
      const response = "Ok, feel free to ask. I will assist you.";
      speakText(response);
      setInformation(response);
      setAskingQuestions(false); // Stop asking questions
    } else if (command.includes("what is your name")) {
      const response =
        "Hello Sir, I'm lara, Your voice assistant created by Divaakar Sahu.";
      speakText(response);
      setInformation(response);
    } else if (command.includes("hello lara")) {
      const response = "Hello Sir, I'm lara. How can I help you?";
      speakText(response);
      setInformation(response);
    } else if (command.includes("what is your age")) {
      const response = "Hello Sir, I'm lara. I'm 2 days old.";
      speakText(response);
      setInformation(response);
    } else if (command.includes("how are you")) {
      const response =
        "I'm doing great, thank you for asking! How can I assist you today?";
      speakText(response);
      setInformation(response);
    } else if (command.includes("what are your hobbies")) {
      const response =
        "I love helping people, answering questions, and learning new things!";
      speakText(response);
      setInformation(response);
    } else if (command.includes("tell me a joke")) {
      const response =
        "Why don't scientists trust atoms? Because they make up everything!";
      speakText(response);
      setInformation(response);
    } else if (command.includes("what is the time")) {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const response = `The current time is ${time}.`;
      speakText(response);
      setInformation(response);
    } else if (command.includes("what is the date")) {
      const now = new Date();
      const date = now.toLocaleDateString();
      const response = `Today's date is ${date}.`;
      speakText(response);
      setInformation(response);
    } else if (command.includes("what can you do")) {
      const response =
        "I can assist you with various tasks like answering questions, opening websites, and providing information.";
      speakText(response);
      setInformation(response);
    } else if (command.includes("who created you")) {
      const response = "I was created by Divakar Sahu.";
      speakText(response);
      setInformation(response);
    } else {
      const fallbackMessage = `Here is the information about ${command}`;
      speakText(fallbackMessage);
    }
  };

  const askRandomQuestion = () => {
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];
    speakText(randomQuestion);
    setInformation(randomQuestion);
    setAskingQuestions(true); // Start asking questions
  };

  return (
    <div>
      <div className="voice-assistant">
        <img src={img} alt="AI" className="ai-image" />
        <h2>Voice Assistant (lara)</h2>

        <button className="btn" onClick={startListening} disabled={isListening}>
          <i className="fas fa-microphone"></i>
          {isListening ? "Listening..." : "Start Listening"}
        </button>
        <p className="tarnscript">{transcript}</p>
        <p className="information">{information}</p>
      </div>
    </div>
  );
};

export default App;
