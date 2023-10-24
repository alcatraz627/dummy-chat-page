const INITIAL_MESSAGES = [
  {
    sender: "other",
    message: "hello! mera naam priya hai",
  },
  {
    sender: "other",
    message: "Aap se milke accha laga",
  },
  {
    sender: "other",
    message: "Aapka naam kya hai?",
  },
  {
    sender: "self",
    message: "Photo bhejo",
  },
  {
    sender: "other",
    message: "In the office yesterday",
    media: "../assets/chat-img.png",
  },
];

let messages = [];
const appendMessageToChat = () => {
  const chat = document.getElementsByClassName("chat")[0];
  const chatBox = document.getElementsByName("chat-textbox")[0];
  const message = messages[messages.length - 1];

  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.classList.add(message.sender);
  messageElement.innerText = message.message;

  if (message?.media) {
    const mediaElement = document.createElement("img");
    mediaElement.classList.add("chat-media");
    mediaElement.src = message.media;
    messageElement.appendChild(mediaElement);
  }

  chat.appendChild(messageElement);
  chatBox.value = "";
};

const handleSendMessage = () => {
  event.preventDefault();
  sendMessage();
};

const pushMessage = async (message, sender = "self", media) => {
  if (!message) {
    return;
  }
  messages.push({
    sender,
    message,
    media,
  });

  appendMessageToChat();
};

const loadOldMessages = () => {
  INITIAL_MESSAGES.forEach(({ message, sender, media }) => {
    pushMessage(message, sender, media);
  });
};

const sendMessage = () => {
  const typedMessage = document.getElementsByName("chat-textbox")[0].value;
  if (!typedMessage) return;

  if (typedMessage.startsWith("sender:")) {
    pushMessage(typedMessage.split("sender:")[1], "other");
  } else {
    pushMessage(typedMessage);
  }
};

const main = () => {
  loadOldMessages();

  // Seed the initial messages
  messages = [...INITIAL_MESSAGES];
};
window.addEventListener("load", main);
