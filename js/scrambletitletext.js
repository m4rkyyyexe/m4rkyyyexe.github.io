// this whole idea of the terminal title being glitched came to my mind when i took a huge massive shit

function scrambletext(text) {
    const arr = text.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }
  function scrambletitle() {
    const titleElement = document.getElementById('title');
    const ogtitle = titleElement.textContent;
  
    setInterval(() => {
      const scrambledText = scrambletext(ogtitle);
      titleElement.textContent = scrambledText;
    }, 1);
  }
  scrambletitle();  