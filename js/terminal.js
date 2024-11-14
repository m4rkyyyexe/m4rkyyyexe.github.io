const output_div = document.getElementById('output');
const input_field = document.getElementById('command-input');

function sargageci(text) {
  const span = document.createElement('span');
  span.textContent = text;
  span.style.color = 'yellow';
  return span;
}

function display_output(message, is_user_input = false) {
  const p = document.createElement('p');
  const message_array = message.split(' ');

  message_array.forEach((word, index) => {
    if (index === 0 && (word.startsWith('visitor@cshmark.xyz:'))) {
      const prompt_span = sargageci(word);
      p.appendChild(prompt_span);
      p.appendChild(document.createTextNode(' '));
    } else if (word.startsWith('http')) {
      const a = document.createElement('a');
      a.href = word;
      a.textContent = word;
      a.style.color = '#fff';
      p.appendChild(a);
      p.appendChild(document.createTextNode(' '));
    } else {
      const span = document.createElement('span');
      span.textContent = word;
      p.appendChild(span);
      p.appendChild(document.createTextNode(' '));
    }
  });

  if (is_user_input) {
    p.style.color = '#fff';
  }

  output_div.appendChild(p);
  scroll_to_bottom();
}

function scroll_to_bottom() {
  const target_scroll = output_div.scrollHeight;
  const start_scroll = output_div.scrollTop;
  const scroll_distance = target_scroll - start_scroll;
  const duration = 500;
  let start_time = null;

  function scroll_step(timestamp) {
    if (!start_time) start_time = timestamp;
    const progress = timestamp - start_time;
    const percent = Math.min(progress / duration, 1);
    output_div.scrollTop = start_scroll + scroll_distance * percent;
    if (progress < duration) {
      requestAnimationFrame(scroll_step);
    }
  }

  requestAnimationFrame(scroll_step);
}

input_field.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const command = input_field.value.trim();
    if (command === '') {
      return;
    }
    display_output('visitor@cshmark.xyz: ' + command, true);
    execute_command(command);
    input_field.value = '';
  }
});