// command map

const cmds = {
  help: displaycmd,
  screenfetch: fetchsysteminfo,
  clear: cls,
  cls: cls,
  whoami: fetchuserinfo,
  visits: uservisits,
  aboutme: aboutme,
};

// meow

function execute_command(command) {
  const [cmdname] = command.split(' ');
  const cmdfunc = cmds[cmdname];

  if (cmdfunc) {
    cmdfunc(command);
  } else {
    display_output(`> command \'${cmdname}\' not found`);
  }
}

// functions

function aboutme() {
  const name = 'Mark';
  const gender = 'Boy';
  const age = calculate_age();
  const nationality = 'Hungarian';
  const coding = 'HTML, CSS, JS, LUA, C';
  const website = 'https://cshmark.xyz/ (you\'re here)'

  display_output(`> Name: ${name}`);
  display_output(`> Gender: ${gender}`);
  display_output(`> Age: ${age}`);
  display_output(`> Nationality: ${nationality}`);
  display_output(`> Coding: ${coding}`);
  display_output(`> Website: ${website}`)
}

function displaycmd() {
  display_output('> aboutme - information about me.')
  display_output('> clear - clear the terminal.');
  display_output('> screenfetch - fetch information in terminal.');
  display_output('> whoami - information about you (exec at own risk).');
  display_output('> visits - display your visit count.');
}

function fetchsysteminfo() {
  display_output(`> OS: cshmark.xyz ${OSver}`);
  display_output(`> latest terminal update: ${latestupdateszar}`);
  display_output(`> latest major terminal update since ${calculate_major()}`);
}

function cls() {
  display_output('> clearing...');
  setTimeout(() => {
    output_div.innerHTML = '';
    display_output("> you've successfully cleared the terminal");
  }, 350);
}

function fetchuserinfo() {
  fetch('https://ipapi.co/json/')
    .then((response) => response.json())
    .then((data) => {
      display_output(`> ip: ${data.ip} (${data.version})`);
      display_output(`> country: ${data.country_name} (${data.country}), ${data.continent_code}`);
      display_output(`> timezone: ${data.timezone}`);
      display_output(`> hostname: ${data.org}`);
    })
    .catch((error) => {
      display_output('> error fetching information');
    });
}

function uservisits() {
  const visit_count = localStorage.getItem('visitcount');
  display_output(`> your visit count: ${visit_count}`);
}

function reboot() {
  display_output('> rebooting...');
  setTimeout(() => {
    location.reload();
  }, 350);
}

// other important stuff (dev commands and other shit)

if (!localStorage.getItem('visitcount')) {
  localStorage.setItem('visitcount', 0);
}

localStorage.setItem('visitcount', parseInt(localStorage.getItem('visitcount')) + 1);

function calculate_age() {
  const birth = new Date('2009-06-11T00:00:00');
  const now = new Date();

  let age = now.getFullYear() - birth.getFullYear();
  const monthdiff = now.getMonth() - birth.getMonth();
  const daydiff = now.getDate() - birth.getDate();


  if (monthdiff < 0 || (monthdiff === 0 && daydiff < 0)) {
    age--;
  }

  return age;
}

const OSver = 'v0.1';
const latestupdateszar = '2024. 11. 19. 5:53PM';
const latest_major_update = new Date('2024-11-19T17:53:56').getTime();

function calculate_major() {
  const now = Date.now();
  const uptime_milliseconds = now - latest_major_update;

  const minutes = Math.floor((uptime_milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((uptime_milliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor(uptime_milliseconds / (1000 * 60 * 60 * 24));

  return `${days} days, ${hours} hours, ${minutes} minutes`;
}
