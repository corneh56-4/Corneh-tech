"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { adams } = require("../Ibrahim/adams");
const BaseUrl = process.env.GITHUB_GIT;
const adamsapikey = process.env.BOT_OWNER;

adams(
  { nomCom: "alive", reaction: "🪄", nomFichier: __filename },
  async (dest, zk, commandeOptions) => {
    console.log("Alive command triggered!");

    // List of 5 random audio URLs
    const audioUrls = [
      "https://files.catbox.moe/oordg5.mp3",
      "https://files.catbox.moe/zdti7y.wav",
      "https://files.catbox.moe/nwreb4.mp3",
      "https://files.catbox.moe/y1uawp.mp3",
      "https://files.catbox.moe/x4h8us.mp3"
    ];

    // Pre-adjust your image dimensions before hosting for best results
    const imageUrl = "https://files.catbox.moe/va22vq.jpeg";  // Replace with your optimized image URL

    const varmess = `🚘 *BWM XMD IS ACTIVE* 🚘\n\n✨ Health Status: Excellent ✨`;

    try {
      // Randomly pick an audio file
      const randomAudio = audioUrls[Math.floor(Math.random() * audioUrls.length)];

      // Send the image with the caption
      await zk.sendMessage(dest, {
        image: { url: imageUrl },
        caption: varmess,
        width: 335, // Adjust this value based on your needs
            height: 340 // Adjust this value based on your needs
  
    });

      // Wait a moment to create a smooth transition (optional)
      await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 second delay

      // Send the audio message with the same caption
      await zk.sendMessage(dest, {
        audio: { url: randomAudio },
        mimetype: "audio/mpeg",  // Ensure correct MIME type for MP3
        ptt: true,  // Send as a voice message (playable with audio waves)
        caption: varmess
      });

      console.log("Alive message with image and audio sent successfully!");

    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  }
);

console.log("WhatsApp bot is ready.");




adams(
  { nomCom: "test", reaction: "🕎", nomFichier: __filename },
  async (dest, zk, commandeOptions) => {
    console.log("Alive command triggered!");

    // List of 5 random audio URLs
    const audioUrls = [
      "https://files.catbox.moe/oordg5.mp3",
      "https://files.catbox.moe/zdti7y.wav",
      "https://files.catbox.moe/nwreb4.mp3",
      "https://files.catbox.moe/y1uawp.mp3",
      "https://files.catbox.moe/x4h8us.mp3"
    ];

    // Pre-adjust your image dimensions before hosting for best results
    const imageUrl = "https://files.catbox.moe/va22vq.jpeg";  // Replace with your optimized image URL

    const varmess = `🚘 *BWM XMD IS ACTIVE* 🚘\n\n✨ Health Status: Excellent ✨`;

    try {
      // Randomly pick an audio file
      const randomAudio = audioUrls[Math.floor(Math.random() * audioUrls.length)];

      // Send the image with the caption
      await zk.sendMessage(dest, {
        image: { url: imageUrl },
        caption: varmess,
        width: 335, // Adjust this value based on your needs
       height: 340 // Adjust this value based on your needs
        
      });

      // Wait a moment to create a smooth transition (optional)
      await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 second delay

      // Send the audio message with the same caption
      await zk.sendMessage(dest, {
        audio: { url: randomAudio },
        mimetype: "audio/mpeg",  // Ensure correct MIME type for MP3
        ptt: true,  // Send as a voice message (playable with audio waves)
        caption: varmess
      });

      console.log("Alive message with image and audio sent successfully!");

    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  }
);

console.log("WhatsApp bot is ready.");
