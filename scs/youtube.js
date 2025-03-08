// Import necessary modules and environment variables
require('dotenv').config(); // Load environment variables
const { adams } = require("../Ibrahim/adams");
const yts = require('yt-search');
const axios = require('axios');

// Retrieve sensitive data from environment variables
const BaseUrl = process.env.GITHUB_GIT;
const adamsapikey = process.env.BOT_OWNER;

// Validate that the necessary environment variables are set
function validateConfig() {
  if (!BaseUrl || !adamsapikey) {
    throw new Error("Configuration error: Missing BaseUrl or API key.");
  }
}
validateConfig();

// Delay function to control timing
function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Loading animation with the provided pattern
async function loading(dest, zk) {
  const lod = [
    "*▰▰▰▱▱▱▱▱▱▱▱▱▱*", 
    "*▰▰▰▰▱▱▱▱▱▱▱▱▱*", 
    "*▰▰▰▰▰▱▱▱▱▱▱▱▱*", 
    "*▰▰▰▰▰▰▱▱▱▱▱▱▱*",
    "*▰▰▰▰▰▰▰▱▱▱▱▱▱*", 
    "*▰▰▰▰▰▰▰▰▱▱▱▱▱*", 
    "*▰▰▰▰▰▰▰▰▰▱▱▱▱*", 
    "*▰▰▰▰▰▰▰▰▰▰▱▱▱*"
  ];

  // Send initial loading message
  const { key } = await zk.sendMessage(dest, { text: 'Loading, please wait...' });

  // Loop through each stage with a delay
  for (let i = 0; i < 4; i++) { // Loop 4 times for a 4-second effect
    for (const stage of lod) {
      await delay(250); // Adjust delay as needed for a smooth animation
      await zk.sendMessage(dest, { text: stage, edit: key });
    }
  }

  // Completion message
  await delay(500); // Short pause before completion message
  await zk.sendMessage(dest, { text: "Loading Completed ✅", edit: key });
}

// Reaction function
function react(dest, zk, msg, reaction) {
  zk.sendMessage(dest, { react: { text: reaction, key: msg.key } });
}

// YouTube search function
async function searchYouTube(query) {
  try {
    const search = await yts(query);
    return search.videos.length > 0 ? search.videos[0] : null;
  } catch (error) {
    console.error('YouTube Search Error:', error);
    return null;
  }
}

// Download media function
async function downloadMedia(url, type) {
  try {
    const endpoint = `${BaseUrl}/api/download/yt${type}?url=${encodeURIComponent(url)}&apikey=${adamsapikey}`;
    const { data } = await axios.get(endpoint);
    return data.status === 200 && data.success ? data.result.download_url : null;
  } catch (error) {
    console.error(`API Error (${type}):`, error);
    return null;
  }
}

// Video download command
adams({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  if (!arg[0]) return repondre("Please insert a song/video name.");

  // Start the loading animation
  await loading(dest, zk);

  const video = await searchYouTube(arg.join(" "));
  if (!video) return repondre("No videos found. Try another name.");

  await zk.sendMessage(dest, {
    image: { url: video.thumbnail },
    caption: `Bwm XMD is downloading *${video.title}* by ${video.author.name}\n⏱️ Time: ${video.timestamp}\n\n> ©Ibrahim Adams`
  }, { quoted: ms });

  const videoDlUrl = await downloadMedia(video.url, 'mp4');
  if (!videoDlUrl) return repondre("Failed to download the video.");

  await zk.sendMessage(dest, {
    video: { url: videoDlUrl },
    mimetype: 'video/mp4'
  }, { quoted: ms });

  repondre('Downloaded Successfully ✅');
});

// Audio download command
adams({
  nomCom: "play",
  categorie: "Download",
  reaction: "🎧"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  if (!arg[0]) return repondre("Please insert a song name.");

  // Start the loading animation
  await loading(dest, zk);

  const video = await searchYouTube(arg.join(" "));
  if (!video) return repondre("No audio found. Try another name.");

  await zk.sendMessage(dest, {
    image: { url: video.thumbnail },
    caption: `*BMW SONG PLAYER*\n\n*◁ II ▷ 1:00 • ${video.timestamp}*\n\n*©Ibrahim Adams*`
  }, { quoted: ms });

  const audioDlUrl = await downloadMedia(video.url, 'mp3');
  if (!audioDlUrl) return repondre("Failed to download the audio.");

  await zk.sendMessage(dest, {
    audio: { url: audioDlUrl },
    mimetype: 'audio/mp4'
  }, { quoted: ms });

  repondre(`*Bwm xmd Just Downloaded ${video.title}*\n\n*®Adams 2024*`);
});


// Audio download command
adams({
  nomCom: "song",
  categorie: "Download",
  reaction: "🎧"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  if (!arg[0]) return repondre("Please insert a song name.");

  // Start the loading animation
  await loading(dest, zk);

  const video = await searchYouTube(arg.join(" "));
  if (!video) return repondre("No audio found. Try another name.");

  await zk.sendMessage(dest, {
    image: { url: video.thumbnail },
    caption: `*BMW SONG PLAYER*\n\n*◁ II ▷ 1:00 • ${video.timestamp}*\n\n*©Ibrahim Adams*`
  }, { quoted: ms });

  const audioDlUrl = await downloadMedia(video.url, 'mp3');
  if (!audioDlUrl) return repondre("Failed to download the audio.");

  await zk.sendMessage(dest, {
    audio: { url: audioDlUrl },
    mimetype: 'audio/mp4'
  }, { quoted: ms });

  repondre(`*Bwm xmd Just Downloaded ${video.title}*\n\n*®Adams 2024*`);
});
// Export functions
module.exports = {
  delay,
  loading,
  react
};
