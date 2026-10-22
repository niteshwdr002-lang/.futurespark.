const mainContent = document.getElementById("mainContent");
const navButtons = [...document.querySelectorAll(".nav-button")];
const modal = document.getElementById("exploreModal");
const toast = document.getElementById("toast");
let currentPage = "home";
let quizIndex = 0;
let quizScore = 0;
let answeredQuiz = false;
let toastTimer;

const pages = {
  home: {
    eyebrow: "YOUR FUTURE STARTS HERE",
    title: 'The future starts with <em>curiosity.</em>',
    description: "Big ideas begin with small questions. Explore the science behind our world, discover how AI is changing everyday life, and find inspiring ways to shape a brighter, smarter and more sustainable future.",
    stats: [["07", "worlds to explore"], ["∞", "ideas to imagine"], ["01", "future to shape"]],
    cards: []
  },
  science: {
    eyebrow: "UNDERSTAND THE UNIVERSE",
    title: 'Wonder more. <em>Discover why.</em>',
    description: "From the tiniest building blocks of matter to the farthest galaxies, science helps us ask better questions and understand how our world works.",
    highlight: ["Science starts with a question", "Observe closely, test an idea, learn from the result. Every discovery begins with curiosity."],
    cards: [
      ["⚛","The Tiny World of Atoms","Everything around us—from the air we breathe to the stars above—is made from atoms and their building blocks.","Explore the building blocks of matter."],
      ["☄","Space & Distant Galaxies","The universe is filled with stars, planets, nebulae and galaxies, each telling a story about cosmic history.","Look beyond our own planet."],
      ["🧬","DNA: Life's Instruction Book","DNA stores biological instructions that help living things grow, function and pass traits to the next generation.","Discover the code inside life."],
      ["🌈","Light & Colour","Light travels as electromagnetic waves, and the colours we see depend on wavelength and how materials interact with light.","See everyday things differently."],
      ["🌋","Earth's Moving Planet","Earth's crust is divided into moving tectonic plates. Their movement helps shape mountains, volcanoes and ocean floors.","Our planet is always changing."],
      ["🧠","The Amazing Human Brain","The brain processes information, supports memory and helps coordinate movement, emotion and decision-making.","Explore the organ that helps us explore."],
      ["🦠","The Invisible Universe","Microscopic organisms live in soil, water and on our bodies. Many support ecosystems and human health.","Meet life too small to see."],
      ["⚡","Energy All Around Us","Energy can move between objects and change form—from sunlight to electricity to the motion of a bicycle.","Follow the energy trail."]
    ]
  },
  technology: {
    eyebrow: "TOOLS THAT CHANGE TOMORROW",
    title: 'Technology is how ideas <em>take flight.</em>',
    description: "Explore the digital tools, smart systems and creative inventions changing how we learn, communicate, travel and solve problems.",
    highlight: ["Technology is more than a screen", "The best technology solves real problems, helps people and is designed with care."],
    cards: [
      ["⌘","Artificial Intelligence","AI systems can recognise patterns, generate content and help people work through complex tasks when used thoughtfully.","Meet the tools learning from data."],
      ["🤖","Robots in Real Life","Robots can perform repetitive, precise or hazardous tasks in factories, hospitals, farms and research labs.","Where could a robot lend a hand?"],
      ["🌐","The Internet of Things","Connected sensors let devices share information—helping homes, cities and industries respond to changing conditions.","A world of connected objects."],
      ["🛡","Cyber Safety","Strong passwords, software updates, careful sharing and critical thinking can help protect your digital identity.","Make smart choices online."],
      ["🖨","3D Printing","3D printers create objects layer by layer, supporting rapid prototypes, customised parts and creative designs.","Turn a digital design into an object."],
      ["🛰","Satellites & GPS","Satellites support navigation, weather forecasts, communication and observation of changes across our planet.","Technology with a view from space."],
      ["🥽","Virtual & Augmented Reality","Immersive tools can place learners inside simulations or add digital information to the world around them.","Learn by stepping into an experience."],
      ["🔋","The Next Battery","Researchers are exploring ways to store energy more efficiently to support electric transport and renewable power.","Power a cleaner, more flexible future."]
    ]
  },
  innovation: {
    eyebrow: "IMAGINE. DESIGN. IMPROVE.",
    title: 'Every breakthrough begins with <em>“what if?”</em>',
    description: "Innovation turns curiosity into useful change. Meet creative approaches that rethink old problems and open up new possibilities.",
    highlight: ["A simple innovation loop", "Notice a problem → imagine options → build a small prototype → test it → improve it."],
    cards: [
      ["💡","Design Thinking","Understand people’s needs before jumping to solutions. Test early ideas and improve them using real feedback.","Start with people, not assumptions."],
      ["🧩","Biomimicry","Designers study nature’s patterns—from leaf surfaces to termite mounds—to find ideas for efficient systems.","Nature has been experimenting for ages."],
      ["🚲","Rethinking Everyday Things","Small changes to packaging, transport or household tools can make everyday routines easier and reduce waste.","Improve something you use daily."],
      ["🧪","The Power of Prototypes","A rough model can reveal what works and what needs changing before a final product is built.","Make a version you can learn from."],
      ["🏙","Smarter Cities","Thoughtful public transport, green spaces, accessible streets and responsive infrastructure can improve urban life.","Design cities for people."],
      ["📦","Circular Product Design","Products designed to be repaired, reused or recycled can keep materials useful for longer.","Waste can be a design problem."],
      ["🎨","Creative Coding","Code can become interactive art, playful learning tools, simulations and experiences that respond to users.","Mix logic with imagination."],
      ["🤝","Ideas That Include Everyone","Inclusive design considers different abilities, languages, ages and needs from the beginning.","Better design welcomes more people."]
    ]
  },
  sustainability: {
    eyebrow: "SMALL ACTIONS. SHARED PLANET.",
    title: 'A greener future is a future we <em>build together.</em>',
    description: "Discover practical ways to care for our shared home—from clean energy and biodiversity to everyday habits that save resources.",
    highlight: ["Progress is made from repeatable actions", "Choose one practical change, make it a habit, and invite others to join in."],
    cards: [
      ["☀","Solar Power","Solar panels turn sunlight into electricity, helping homes and communities generate energy without burning fuel at the point of use.","Catch a little sunshine."],
      ["🌬","Wind Energy","Wind turbines convert the movement of air into electricity, providing a renewable source of power in suitable locations.","Let moving air do useful work."],
      ["💧","Save Every Drop","Fixing leaks, collecting rainwater where appropriate and using water thoughtfully can help protect local supplies.","Water is a resource, not an endless supply."],
      ["🌳","Biodiversity Matters","Different plants, animals and microorganisms help ecosystems function and can make them more resilient to change.","Make room for living things."],
      ["♻","Rethink Waste","Refusing unnecessary items, reusing what you have, repairing and recycling correctly can reduce waste.","Use resources more thoughtfully."],
      ["🚶","Cleaner Journeys","Walking, cycling, public transport and shared rides can reduce emissions when they are safe and practical options.","Rethink the daily commute."],
      ["🥬","Food with Less Waste","Planning meals, storing food well and using leftovers safely can reduce the resources lost when food is thrown away.","Let good food get eaten."],
      ["🐝","Pollinators & Plants","Bees, butterflies and other pollinators support many flowering plants and crops. Native plants can provide helpful habitat.","Make your space pollinator-friendly."]
    ]
  },
  "future-tech": {
    eyebrow: "PEEK BEYOND THE PRESENT",
    title: 'Tomorrow is being imagined <em>today.</em>',
    description: "Explore emerging ideas that could change healthcare, transport, exploration and how humans work with intelligent machines.",
    highlight: ["The future is not guaranteed", "New technologies create opportunities and challenges. Good questions and responsible choices matter."],
    cards: [
      ["🧬","Personalised Medicine","Healthcare may increasingly use a person’s biology and health information to help guide prevention and treatment decisions.","Care designed around individual needs."],
      ["🚀","Reusable Spacecraft","Reusable launch systems aim to bring parts of rockets back for inspection and reuse, potentially changing the economics of spaceflight.","Make space access more reusable."],
      ["🧠","Brain–Computer Interfaces","These systems translate certain brain signals into commands, with research exploring ways to support communication and mobility.","A new kind of human-computer link."],
      ["🚗","Autonomous Mobility","Sensors and software help automated vehicles perceive surroundings and plan movement, but reliability and safety remain essential.","How could transport evolve?"],
      ["⚛","Quantum Computing","Quantum computers use quantum effects to approach certain specialised problems in ways different from ordinary computers.","A different way to compute."],
      ["🏗","Buildings That Adapt","Smart sensors and efficient design can help buildings respond to occupancy, weather and energy needs.","Spaces that use resources wisely."],
      ["🌊","Ocean Exploration","New sensors, remotely operated vehicles and mapping tools help researchers study deep-sea habitats and ocean change.","Discover the blue unknown."],
      ["🌱","Carbon Capture Ideas","Different methods aim to capture carbon dioxide from industrial sources or air; their benefits depend on energy, cost and safe storage.","Explore the challenges of carbon removal."]
    ]
  },
  contact: {
    eyebrow: "LET'S SPARK AN IDEA",
    title: 'Your curiosity belongs <em>here.</em>',
    description: "Have a question, a topic you want us to explore, or an idea that could make Future Spark better? This space is for curious minds and future builders.",
    highlight: ["Good ideas grow when they are shared", "Use the message form below to draft your note. This demo does not send messages to a server yet."],
    cards: [
      ["✉","Share a Topic","Tell us what you would love to learn about next—space, climate, AI, design or something completely unexpected.","Suggest the next discovery."],
      ["💬","Ask a Question","Curiosity starts with asking. Write a question and turn it into a learning mission.","No question is too small."],
      ["🌟","Share an Idea","Have an activity, challenge or feature in mind? Describe how it could help visitors explore.","Help shape the next version."],
      ["🤝","Learn Together","Invite classmates or friends to explore a topic, compare ideas and build a small project together.","Better ideas can be collaborative."]
    ]
  }
};

const activityPages = {
  quiz: {
    eyebrow:"QUICK QUIZ", title:"Give your curiosity a quick workout.",
    description:"Five bite-sized questions. Take your best guess, learn from the answer and see how many sparks you collect."
  },
  facts: {
    eyebrow:"DID YOU KNOW?", title:"A few facts to make you look twice.",
    description:"The world is full of details that sound surprising because nature and science are wonderfully inventive."
  },
  impact: {
    eyebrow:"MAKE A DIFFERENCE", title:"Small habits can add up.",
    description:"You do not need to change everything at once. Start with a practical action you can repeat."
  },
  challenge: {
    eyebrow:"FUTURE CHALLENGE", title:"Design one idea for a better tomorrow.",
    description:"Use your imagination to solve a real-world problem. The first draft can be simple; the thinking is what matters."
  }
};

const quizQuestions = [
  {q:"Which star is closest to Earth?", a:["Sirius","The Sun","Polaris","Proxima Centauri"], correct:1, why:"The Sun is our closest star. Proxima Centauri is the closest star beyond our solar system."},
  {q:"What do plants absorb from the atmosphere for photosynthesis?", a:["Oxygen","Helium","Carbon dioxide","Hydrogen"], correct:2, why:"Plants use carbon dioxide, water and light energy to make sugars during photosynthesis."},
  {q:"Which material is commonly used to make most modern solar cells?", a:["Silicon","Cotton","Limestone","Rubber"], correct:0, why:"Silicon is a semiconductor widely used in photovoltaic solar cells."},
  {q:"What does GPS help a device estimate?", a:["Its location","Its battery chemistry","Its screen size","Its password"], correct:0, why:"GPS uses signals from satellites to help a receiver estimate its position and time."},
  {q:"Which action generally helps reduce waste?", a:["Throwing away repairable items","Using single-use items more often","Repairing and reusing items","Buying duplicates without need"], correct:2, why:"Repairing and reusing items can extend their useful life and reduce demand for new materials."}
];

function makeSparkField() {
  const field = document.getElementById("sparkField");
  for (let i=0;i<24;i++) {
    const dot = document.createElement("span");
    dot.className = "spark";
    dot.style.left = `${Math.random()*100}%`;
    dot.style.top = `${50+Math.random()*60}%`;
    dot.style.animationDuration = `${14+Math.random()*18}s`;
    dot.style.animationDelay = `${-Math.random()*24}s`;
    dot.style.opacity = `${.18+Math.random()*.3}`;
    const size = 2+Math.random()*4;
    dot.style.width = `${size}px`; dot.style.height = `${size}px`;
    field.appendChild(dot);
  }
}

function cardMarkup(card, i) {
  return `<article class="content-card hex-card" role="button" tabindex="0" data-card-open data-card-title="${escapeAttr(card[1])}" data-card-description="${escapeAttr(card[2])}" data-card-extra="${escapeAttr(card[3] || card[2])}" style="--accent:var(--page-accent);animation-delay:${Math.min(i*55,350)}ms">
    <div class="card-topline"><span class="card-number">DISCOVERY / ${String(i+1).padStart(2,"0")}</span><span class="card-icon">${card[0]}</span></div>
    <h3>${card[1]}</h3><p>${card[2]}</p>
    <button class="card-link" type="button">Explore this idea <span>↗</span></button>
  </article>`;
}
function escapeAttr(value) {
  return String(value).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function homeMarkup() {
  return `<section class="hero">
    <div class="hero-copy">
      <div class="eyebrow"><span class="eyebrow-line"></span>${pages.home.eyebrow}</div>
      <h1>${pages.home.title}</h1>
      <p class="hero-description">${pages.home.description}</p>
      <div class="hero-actions"><button class="primary-btn" id="openExplore">Explore More <span>↗</span></button><span class="hero-note">7 topics · endless possibilities</span></div>
    </div>
    <div class="hero-art" aria-label="Decorative honeycomb illustration">
      <div class="orbit orbit-three"></div><div class="orbit orbit-two"></div><div class="orbit"></div>
      <div class="core-hex"><div class="core-inner"><span class="core-symbol">✦</span></div></div>
      <div class="orbit-label label-top">IDEAS IN MOTION<small>Think beyond today</small></div>
      <div class="orbit-label label-bottom">STAY CURIOUS<small>Every question matters</small></div>
    </div>
  </section>
  <section class="stats-strip" aria-label="Future Spark highlights">
    ${pages.home.stats.map((s,i)=>`<div class="stat"><span class="stat-icon">${["⬡","✧","✦"][i]}</span><div><strong>${s[0]}</strong><span>${s[1]}</span></div></div>`).join("")}
  </section>
  <section class="section-block">
    <div class="section-top"><div><div class="section-kicker">A LITTLE LOOK AHEAD</div><h2>Find your next <span style="color:#D69A18">spark.</span></h2></div><p>Curiosity can take you from the smallest particle to the biggest questions about tomorrow. Choose a world below and start exploring.</p></div>
    <div class="feature-row">
      <div class="feature-banner"><span class="feature-tag">✦ THE FUTURE IS A WORK IN PROGRESS</span><h3>Big change begins with one bright idea.</h3><p>Learn something new, challenge an assumption, or find one small way to make a difference today.</p></div>
      <div class="feature-side">
        <div class="mini-feature"><span class="mini-symbol">⚛</span><div><h3>Ask why.</h3><p>Science helps us understand the world around us.</p></div></div>
        <div class="mini-feature"><span class="mini-symbol">✧</span><div><h3>Imagine how.</h3><p>Creative thinking turns questions into possibilities.</p></div></div>
      </div>
    </div>
    <div class="section-top"><div><div class="section-kicker">CHOOSE YOUR PATH</div><h2>Seven worlds. <span style="color:#D69A18">One curious mind.</span></h2></div><p>Tap a hexagon in the floating navigation bar to open a topic. Each world is packed with bite-sized ideas to explore.</p></div>
    <div class="card-grid">${[
      ["⚛","Science","Explore atoms, space, living systems and the forces shaping our universe.","science"],
      ["⌘","Technology & AI","Meet intelligent tools, connected devices and the technologies changing daily life.","technology"],
      ["✧","Innovation","Learn how design, experimentation and fresh perspectives turn ideas into useful solutions.","innovation"],
      ["❋","Sustainability","Discover renewable energy, biodiversity and everyday actions that help protect our planet.","sustainability"],
      ["◈","Future Tech","Look at emerging technologies and the questions they raise for tomorrow.","future-tech"],
      ["✉","Contact & Ideas","Share a question, suggest a topic or sketch an idea for the Future Spark community.","contact"]
    ].map((c,i)=>`<article class="content-card hex-card" style="--accent:${["#4D9FFF","#35C9D0","#FFB347","#61B86B","#A68AFF","#F4B942"][i]};animation-delay:${i*60}ms"><div class="card-topline"><span class="card-number">YOUR PATH / 0${i+1}</span><span class="card-icon">${c[0]}</span></div><h3>${c[1]}</h3><p>${c[2]}</p><button class="card-link" data-goto="${c[3]}">Open this world <span>↗</span></button></article>`).join("")}</div>
    <div class="cta-band"><div><h3>Ready for a little surprise?</h3><p>Try a quick quiz, collect a curious fact, or take on a future-focused challenge.</p></div><button class="primary-btn" id="openExploreBottom">Explore More <span>↗</span></button></div>
  </section>`;
}
function pageMarkup(key) {
  const page = pages[key];
  document.documentElement.style.setProperty("--page-accent", navButtons.find(b=>b.dataset.page===key)?.dataset.accent || "#F4B942");
  return `<section class="page-heading"><div class="eyebrow"><span class="eyebrow-line"></span>${page.eyebrow}</div><h1>${page.title}</h1><p>${page.description}</p></section>
    <div class="page-highlight"><span class="highlight-icon">✦</span><div><strong>${page.highlight[0]}</strong><p>${page.highlight[1]}</p></div></div>
    <section class="section-block"><div class="section-top"><div><div class="section-kicker">EXPLORE THE COLLECTION</div><h2>Ideas worth <span style="color:var(--page-accent)">discovering.</span></h2></div><p>Start with a card that catches your attention. Every big idea becomes easier to understand one small discovery at a time.</p></div>
    <div class="card-grid">${page.cards.map(cardMarkup).join("")}</div>
    <div class="cta-band"><div><h3>Keep your curiosity moving.</h3><p>Want a different kind of
