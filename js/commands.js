// command map

const cmds = {
    help: displaycmd,
    screenfetch: fetchsysteminfo,
    clear: cls,
    cls: cls,
    whoami: fetchuserinfo,
    visits: uservisits,
    rsvisit: rsv,
    devmode: devmodeenable,
    visitormode: visitmodeenable,
    echo: echo,
    cat: cat,
    ls: list_files,
    dir: list_files,
    del: delete_file,
    aboutme: aboutme,
    reboot: reboot,
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
    const coding = 'HTML, CSS, JS';
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
  
  function rsv() {
    localStorage.setItem('visitcount', 1);
    display_output('> your visit count has been reset to 1');
  }
  
  function devmodeenable() {
    if (!developer_mode) {
      developer_mode = true;
      localStorage.setItem('mode', 'developer');
      display_output('> activated DEVELOPER MODE');
    } else {
      display_output('> DEVELOPER MODE already activated');
    }
  }
  
  function visitmodeenable() {
    if (developer_mode) {
      developer_mode = false;
      localStorage.setItem('mode', 'visitor');
      display_output('> activated VISITOR MODE');
    } else {
      display_output('> VISITOR MODE already activated');
    }
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
  
  let developer_mode = localStorage.getItem('mode') === 'developer';
  
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
  const latestupdateszar = '2024. 08. 27. 1:25AM';
  const latest_major_update = new Date('2024-08-27T01:26:00').getTime();
  
  function calculate_major() {
    const now = Date.now();
    const uptime_milliseconds = now - latest_major_update;
  
    const minutes = Math.floor((uptime_milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((uptime_milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(uptime_milliseconds / (1000 * 60 * 60 * 24));
  
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  }
  
  function echo(command) {
    const parts = command.split(/>\s*/);
    if (parts.length !== 2) {
      display_output('> invalid echo command');
      return;
    }
    const text = parts[0].trim();
    const filename = parts[1].trim();
    if (!filename) {
      display_output('> missing filename');
      return;
    }
    localStorage.setItem(filename, text);
    display_output(`> saved text to \'${filename}\'`);
  }
  
  function cat(command) {
    const parts = command.split(' ');
    const filename = parts.slice(1).join(' ').trim();
    if (!filename) {
      display_output('> missing filename');
      return;
    }
    const filecontent = localStorage.getItem(filename);
    if (filecontent) {
      display_output(`> \'${filename}\': ${filecontent}`);
    } else {
      display_output(`> \'${filename}\' not found`);
    }
  }
  
  function list_files() {
    display_output('> listing files in storage:');
    if (localStorage.length === 0) {
      display_output('> no files found');
      return;
    }
  
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      display_output(`> ${key}`);
    }
  }
  
  function delete_file(command) {
    const parts = command.split(' ');
    const filename = parts.slice(1).join(' ').trim();
    if (!filename) {
      display_output('> missing filename');
      return;
    }
    if (filename === 'visitcount' || filename === 'mode') {
      display_output('> nice try motherfucker');
      return;
    }
    const filecontent = localStorage.getItem(filename);
    if (filecontent) {
      localStorage.removeItem(filename);
      display_output(`> \'${filename}\' has been deleted`);
    } else {
      display_output(`> \'${filename}\' not found`);
    }
  }