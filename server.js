const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

function readMessages() {
  try {
    const data = fs.readFileSync('messages.json', 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeMessages(messages) {
  fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));
}

app.get('/api/messages', (req, res) => {
  res.json(readMessages());
});

app.post('/api/messages', (req, res) => {
  const messages = readMessages();
  messages.push(req.body);
  writeMessages(messages);
  res.sendStatus(200);
});

app.post('/api/reply', (req, res) => {
  const { parentId, reply } = req.body;
  const messages = readMessages();

  function addReply(list) {
    for (let msg of list) {
      if (msg.id === parentId) {
        msg.replies = msg.replies || [];
        msg.replies.push(reply);
        return true;
      }
      if (msg.replies && addReply(msg.replies)) return true;
    }
    return false;
  }

  addReply(messages);
  writeMessages(messages);
  res.sendStatus(200);
});

app.post('/api/react', (req, res) => {
  const { id, email, type } = req.body;
  const messages = readMessages();

  function updateReaction(list) {
    for (let msg of list) {
      if (msg.id === id) {
        msg.likedBy = msg.likedBy || [];
        msg.dislikedBy = msg.dislikedBy || [];

        msg.likedBy = msg.likedBy.filter(e => e !== email);
        msg.dislikedBy = msg.dislikedBy.filter(e => e !== email);

        if (type === 'like') msg.likedBy.push(email);
        else if (type === 'dislike') msg.dislikedBy.push(email);

        return true;
      }
      if (msg.replies && updateReaction(msg.replies)) return true;
    }
    return false;
  }

  updateReaction(messages);
  writeMessages(messages);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
