export type Project = {
  stage?: 'early';
  story?: string[];
  id: string; title: string; category: string; status: string; description: string;
  image: string; caption: string; role: string; tools: string[];
  cardImage?: { src: string; alt: string };
  problem: string; constraints: string; approach: string; results: string; lessons: string;
  gallery: { image: string; caption: string; portrait?: boolean; fullWidth?: boolean }[]; source: string;
}
export const projects: Project[] = [
  {
    id: 'mars-rover', stage: 'early', title: 'Mars Rover Challenge', category: 'Senior capstone design', status: 'Ongoing · early design · 2026–27',
    description: 'Our four-person team is developing a rocket, payload container, and rover for the GW Rocket team’s entry in the Battle of the Rockets Mars Rover Challenge. The project is in progress, with updates on the way.',
    cardImage: { src: '/assets/rover-card-cover.png', alt: 'Illustration of a rocket, rover, astronaut, and satellite on Mars.' },
    image: 'rover-mission', caption: 'Planned mission sequence from our team’s concept-of-operations (CONOPS) graphic, presented at the System Requirements Review.',
    role: 'As Rover Design Lead, I will lead the rover’s mechanical design and fabrication, including the fixturing that secures it inside the payload container. I will also support rover control-system design and work with the structure, electronics, and flight leads to integrate the rover with the rest of the system.',
    tools: ['Mechanical design', 'Prototyping & fabrication', 'System integration', 'Testing & iteration'],
    problem: 'Design a rover that can fit inside a rocket payload container, withstand flight and recovery, and then operate on the ground. After recovery and inspection, the rover will be placed in an arena, where our team must remotely retrieve an instrument package without directly viewing the field.',
    constraints: '',
    approach: '',
    results: 'We are defining requirements and developing the initial design. This page will grow with the project as we build prototypes, test the rover, and refine the system. Design updates and test results are on the way.',
    lessons: 'I expect to gain experience taking a mechanical design from requirements through fabrication and testing. I also want to strengthen my ability to make design tradeoffs, coordinate interfaces with other subsystems, and use test results to improve a working prototype.',
    gallery: [],
    source: 'Project scope and assigned responsibilities: Capstone Team Charter and System Requirements Review, October 5, 2026. Card cover: supplied CoverPicture.png. Project detail image: the team’s CONOPS graphic from that review. Learning goals describe what I hope to gain as the project develops.'

  },
  {
    id: 'oscillating-fan', title: 'Oscillating Fan Design', category: 'Mechanical design', status: 'Completed coursework',
    description: 'A semester-long team project to develop design plans for a desktop oscillating fan. I led the SolidWorks assembly and gear-train design, then used motion studies and FEA to support our engineering analysis.',
    image: 'fan', caption: 'The complete oscillating fan assembly in SolidWorks, integrating the team’s component designs.',
    role: 'I was responsible for the overall SolidWorks assembly, CAD design of the gear train, and motion studies and motion analysis of the assembly and gear train. I brought together parts created by different team members and conducted FEA on the assembly and individual components to support our analytical findings. I also conducted fatigue failure analysis on the shaft connecting the gear train to the oscillation linkage.',
    tools: ['SolidWorks', 'CAD assembly', 'Gear-train design', 'Motion studies & analysis', 'Finite element analysis (FEA)', 'Component failure analysis'],
    problem: 'Develop a complete design for a desktop oscillating fan, with in-depth failure analysis of each component and engineering justification for part selection.',
    constraints: 'The motor, gear train, shafts, and linkage had to work together as one mechanism. Components designed separately by team members needed to fit and move correctly in the final assembly. Our component analyses also had to account for the expected loads and potential failure conditions.',
    approach: 'I designed the gear train in SolidWorks and took the lead on integrating everyone’s parts into the full assembly. Getting the separately modeled components to work together required resolving fit and assembly issues. Once the assembly was in working order, I ran motion studies and motion analysis on the fan mechanism and gear train, then used FEA on the assembly and individual parts to support our calculations.',
    results: 'We completed the fan’s design plans, SolidWorks assembly, component failure analyses, and part-selection justifications. For an assumed jammed linkage, my shaft analysis reported a von Mises stress of 130.67 kPa. The team’s analysis of Gear 4 reported a bending stress of 20.86 MPa and a bending factor of safety of 1.189, indicating a limited margin against bending failure. These are analytical results from our final report, not measurements from a physical prototype.',
    lessons: 'This project strengthened one of my favorite skills: CAD. I learned how much coordination it takes to turn parts modeled by different people into a coherent, working assembly. It also gave me experience using motion studies and FEA alongside analytical calculations to evaluate the design.',
    gallery: [{ image: 'fan-gears', caption: 'The worm and spur gear train I designed in SolidWorks to drive the oscillation linkage.' }, { image: 'fan-fea', caption: 'Shaft analysis plot supporting the component-level evaluation of the fan mechanism.' }, { image: 'fan-drawing', caption: 'Technical assembly drawing of the oscillating fan, with component callouts and two views.', fullWidth: true }],
    source: 'Justin’s cover-letter excerpt and clarification of CAD assembly, gear-train design, motion studies, and FEA responsibilities; Mechanical Design — Fan Project / Final Report.docx: Shaft Analysis — Justin Ames (130.67 kPa); Gear Analysis — Anya Spevacek (bending stress 20.86 MPa, bending factor of safety 1.189). CAD images and drawing.png supplied in the same folder.'

  },
  {
    id: 'grabber', title: 'Mechanical Grabber', category: 'Manufacturing', status: 'Completed · Fall 2024',
    description: 'An aluminum grabber, taken through process planning, machining, fitting, and assembly with a four-person team.',
    image: 'grabber', caption: 'Our assembled aluminum grabber.',
    role: 'I led and organized our four-student team, designed the shaft and handle-housing backings in CAD, and shared the machining work. I also presented the claw NC program and manufacturing process.',
    tools: ['SolidWorks', 'Turning & milling', 'NC programming', '3D printing', 'Tolerancing'],
    problem: 'Design and manufacture a working trash-grabber mechanism while learning how process planning and real machine-shop constraints influence the final design.',
    constraints: 'Component fit, tool access, workholding, surface finish, available shop equipment, and the semester schedule. A 3D-printed handle and machined housing required fit adjustments during assembly.',
    approach: 'The team modeled components and checked their assembly, developed process plans, and shared machining. We used a bolted fixture to hold the two claw blanks, adjusted interference fits, and reduced chatter through smaller cuts and better support.',
    results: 'The team assembled a working grabber using machined aluminum parts, a printed handle, a cable linkage, and return springs. We met most of our objectives, with room to improve surface finishing and tolerances.',
    lessons: 'Plan surface finishing early, start simple parts while complex ones are still being designed, and communicate every dimension and process change. Shop feedback and hands-on iteration changed the original CAD design.',
    gallery: [{ image: 'grabber-machining', caption: 'Machining the claw geometry using the team’s workholding setup.' }, { image: 'grabber-fixture', caption: 'Workholding diagram: two claw blanks bolted to a mounting piece to provide parallel vise surfaces.' }],
    source: 'Manufacturing Processes and Design — Grabber Project Report and Presentation; Resume.md.'
  },
  {
    id: 'food-flow', title: 'A little fluid mechanics. A better brunch.', category: 'Experiment & photography', status: 'Completed · Fall 2025',
    description: 'Three butter temperatures. Three very different sauces. An experiment in emulsions, observation, and visual storytelling.',
    image: 'food', caption: 'My final photograph: Hollandaise made with butter at 27°C, 50°C, and 85°C, left to right.',
    role: 'Individual project. I designed the experiment, prepared the sauces, photographed their flow, edited the images, and composed the exhibition poster.',
    tools: ['Experimental design', 'Canon EOS Rebel T3i', 'Lightroom Classic', 'Canva'],
    problem: 'Explore how the temperature of clarified butter affects the visible flow and texture of Hollandaise sauce.',
    constraints: 'Compare three butter temperatures while controlling ingredient proportions and the egg-yolk mixture temperature. Evaluate flow qualitatively through photographs, without a viscometer.',
    approach: 'Prepare three batches using butter at 27°C, 50°C, and 85°C. Photograph each sauce falling from a spoon against a black background, with controlled lighting and a prefocused camera.',
    results: 'The 50°C batch dripped smoothly; the colder batch fell in clumps, while the hotter batch was sticky and scarcely flowed. These are qualitative observations, not measured viscosity values. The final poster was presented at the project showcase.',
    lessons: 'Clear experimental photography can make an otherwise subtle material behavior visible. A next step would be to use a viscometer to compare the sauces quantitatively.',
    gallery: [{ image: 'food-showcase-2', caption: 'Discussing my hollandaise experiment at the project showcase.' }, { image: 'food-setup', caption: 'Original photography setup with a black backdrop and camera.' }],
    source: 'Food Flow and Photography — Fluid Mechanics of Hollandaise Sauce; Final Photo Description; supplied photographs.'
  },
  {
    id: 'tap-mount', title: 'Duct tape had a good run.', category: 'Personal project', status: 'Completed',
    description: 'A custom kegerator tap mount, reverse engineered from the original part, modeled in SolidWorks, and 3D printed. The new mount fitted successfully and replaced the temporary duct-tape fix.',
    image: 'tap-comparison', caption: 'My blue 3D-printed replacement beside the original black mount. The wider flange adapts the mounting interface while retaining the hollow center and locating tabs.',
    role: 'I reverse engineered the existing mount, developed the replacement in SolidWorks, worked through design iterations, and 3D printed and installed the finished part.',
    tools: ['SolidWorks', 'Reverse engineering', '3D printing', 'Fit checks & iteration'],
    problem: 'My roommate’s replacement tap stem did not fit the kegerator’s existing mount, so the tower was held in place with duct tape. I wanted a fitted mechanical connection that would secure the replacement stem.',
    constraints: 'The new mount had to connect the replacement tap stem to the existing kegerator. That meant preserving the features that locate the mount in the base while adapting the flange and fastening layout to the new stem.',
    approach: 'I used the original mount as a reference and modeled a replacement in SolidWorks. The old-versus-new photo shows the geometry carried over: a hollow central passage, raised cylindrical collar, and locating tabs. The blue part has a wider flange and a revised screw-hole layout. I developed two CAD versions, then 3D printed the part and checked its fit on the tap stem before final installation.',
    results: 'The installation worked. The printed mount fitted the replacement stem and secured the tap tower to the kegerator. The assembly photo shows the mount fastened to the stem, and the completed setup shows the tower seated on the new blue base without the duct tape around the mounting interface.',
    lessons: 'This project connected reverse engineering to a practical fit problem: retain the original part’s useful locating features, adapt the interface that no longer fits, and check the printed part against the real assembly. Working in SolidWorks and testing the physical fit made it possible to move from a temporary repair to a working replacement.',
    gallery: [
      { image: 'tap-before', portrait: true, caption: 'Before: duct tape held the replacement tap tower against the kegerator.' },
      { image: 'tap-v1', caption: 'First SolidWorks concept: developing the replacement mount geometry.' },
      { image: 'tap-v2', caption: 'Version 2 in SolidWorks: the revised flange, central opening, and mounting holes.' },
      { image: 'tap-printed', portrait: true, caption: 'The completed 3D print, showing the mounting flange, four screw holes, and central passage.' },
      { image: 'tap-stem-fit', portrait: true, caption: 'Fit and assembly: the blue printed mount fastened to the bottom of the replacement tap stem.' },
      { image: 'tap-installed', portrait: true, caption: 'Successful installation: the tap tower seated on the new mount, with the blue base visible beneath the metal trim.' }
    ],
    source: 'Personal tap mount project description, version 1 and version 2 SolidWorks images, and five build and installation photographs. Design software, 3D printing, and successful installation confirmed by Justin.'

  },
  {
    id: 'sailboat-belt', title: 'A belt repair on the water', category: 'Personal project', status: 'Personal project',
    description: 'A tape measure left in the engine bay interrupted our Father’s Day boat trip. We worked with the tools on board and made it back to shore.',
    image: 'sailboat', caption: 'The engine bay, with the forgotten tape measure beside the drive belt.',
    story: [
      'What happens when you mix a nice, relaxing Father’s Day boat excursion with a forgetful boat mechanic (said in the kindest possible way)? In our case, a plume of smoke and soot rising from the engine bay, and a disengaged engine belt.',
      'The culprit was a tape measure. The mechanic had left it extended in the engine compartment after using it to check the belt tension. Not the best place to leave a tool.',
      'Our afternoon turned into an impromptu exercise in thinking on our feet and solving a problem with only the tools at hand. In the end, we made it back to shore safely, with just one casualty: the tape measure.'
    ],
    role: '', tools: [], problem: '', constraints: '', approach: '', results: '', lessons: '',
    gallery: [{ image: 'sailboat-belt-closeup', portrait: true, caption: 'The tape measure, still extended beside the belt. Mystery solved.' }],
    source: 'Personal Projects / Sailboat Engine Drive Belt / sailboat engine belt description.md and supplied HEIC photographs.'
  },
  {
    id: 'prosthetic-leg', stage: 'early', title: 'Prosthetic Leg Design', category: 'Advanced mechanical design', status: 'In progress',
    description: 'An ongoing coursework project to design an above-knee prosthetic leg in SolidWorks, with a planned seven-bar knee linkage and analysis of each component. Design updates are on the way.',
    image: 'prosthetic-reference', caption: 'Reference for a seven-bar knee linkage, based on the Össur TOTAL KNEE 2000. Reference image, not my design.',
    role: 'I plan to develop the prosthetic leg in SolidWorks, incorporating a seven-bar knee linkage based on the Össur TOTAL KNEE 2000, and analyze each component to assess whether the design can meet the project requirements.',
    tools: ['SolidWorks (planned)', 'Linkage design', 'Component analysis (planned)'],
    problem: 'Design an above-knee prosthetic leg, from the femur down, for a 200 lb person who is 6 ft tall. The coursework brief calls for everyday use and a normal walking pattern. The work will combine linkage design, SolidWorks modeling, and component analysis to assess the concept’s feasibility.',
    constraints: 'Coursework design brief: a 200 lb, 6 ft user, with the design extending from the femur down. This is a design study, not a clinically validated device.',
    approach: 'Explore a seven-bar knee linkage using the commercial mechanism as a reference, then model and analyze the components in SolidWorks.',
    results: 'This project is still in progress. The design brief and reference knee mechanism are the starting point; the next steps are to develop the SolidWorks model and analyze the individual parts. I’ll share the evolving design and analysis findings as the project develops.',
    lessons: 'I expect to strengthen my ability to translate a set of user requirements into a mechanical design, model a multi-link mechanism, and use component analysis to evaluate design decisions. I also want to build a better understanding of how knee-linkage geometry affects motion.',
    gallery: [], source: 'Advanced Mechanical Engineering Design — Prosthetic Leg / project description and sample seven-bar linkage image.'
  },
  {
    id: 'heat-sink', title: 'Finding a path for 650 watts.', category: 'Thermal systems', status: 'Completed coursework',
    description: 'Comparing fin geometries and materials for the cooling of an enclosed data-acquisition system.',
    image: 'heat-sink', caption: 'Our team’s sketches of the rectangular-fin concept.',
    role: 'Three-person team. I developed and thermally analyzed Concept 3 (diamond rectangular fins), performed comparative analysis, and took meeting notes. Another team member developed the selected brass-fin design.',
    tools: ['Python', 'Thermal analysis', 'Concept comparison'],
    problem: 'Transfer a 650 W electronics load from an external brass block to the surrounding air while keeping the block at or below 65°C.',
    constraints: 'A 120 × 120 mm mounting surface, 25°C ambient air, and a specified 2 m/s forced-convection velocity; balance thermal performance with cost, size, and manufacturability.',
    approach: 'Compare aluminum plate fins, brass parabolic fins, and diamond plate fins. My work investigated the diamond option and helped compare the alternatives.',
    results: 'The team selected an adjusted brass parabolic-fin design. Our calculations predict approximately 660 W heat dissipation; this is an analytical result, not an experimental measurement or an outcome attributable solely to my concept.',
    lessons: 'The team comparison favored a practical, manufacturable concept over material conductivity alone and we found that the geometry of the fins can be very impactful towards aiding in heat transfer.',
    gallery: [{ image: 'heat-analysis', caption: 'Parabolic-fin concept developed by another member of our team.' }],
    source: 'Thermal Systems Design — Heat Sink Project, particularly “Team member contributions” and final design selection.'
  },
  {
    id: 'tensile-testing', title: 'What happens before a material breaks?', category: 'Solid mechanics', status: 'Completed lab',
    description: 'A laboratory investigation of material response under tensile loading.',
    image: 'tensile', caption: 'Results from our tensile-testing lab.',
    role: 'On our four-person lab team, I wrote the yield-strength discussion and contributed to the interpretation of elastic modulus, ultimate strength, ductility, and reduction of area versus elongation. I also prepared the appendix and helped format our findings.',
    tools: ['Tensile testing', 'Stress–strain analysis'],
    problem: 'Characterize material behavior under tensile loading and relate experimental observations to solid-mechanics concepts.',
    constraints: 'One trial per specimen: 6061 aluminum, 7075 aluminum, 1075 steel, and tempered martensite. Possible specimen misalignment and extensometer slippage were sources of uncertainty.',
    approach: 'The team used tensile-machine load and deformation measurements to construct stress–strain curves and estimate stiffness, strength, and ductility. I contributed to the interpretation and discussion of those material properties.',
    results: 'We measured yield strengths of 316 MPa for 6061 aluminum, 598 MPa for 7075 aluminum, 404 MPa for 1075 steel, and 856 MPa for tempered martensite. These are team lab results from single trials, not certified material specifications.',
    lessons: 'Stiffness, yield strength, and ductility describe different behaviors. Repeating trials and improving specimen alignment would help reduce uncertainty. I also examined the limitations of percent elongation.',
    gallery: [], source: 'Solid Mechanics — Tensile Testing Lab Report.pdf.'
  },
  {
    id: 'electric-fields', title: 'Making invisible fields visible.', category: 'Physics II', status: 'Completed lab',
    description: 'Using charge simulations and measurements to connect electric fields, potential, and superposition.',
    image: 'electric-field', caption: 'Charge-distribution simulation from my electric-field study.',
    role: 'I completed the simulation measurements, calculations, plots, and interpretation for this individual lab project.',
    tools: ['Simulation', 'Data analysis', 'Electric-field visualization'],
    problem: 'Investigate how charge and distance affect electric field and potential, and estimate Coulomb’s constant from simulation measurements.',
    constraints: 'Sensor and charge positions were set within the simulation; placement precision was a source of discrepancy.',
    approach: 'Examine point charges, dipoles, line charges, and more complex arrangements. Compare measured values with predictions and plot the relationships.',
    results: 'My estimate of Coulomb’s constant had a 2.002% error. This is a simulation-based result, not a physical laboratory measurement.',
    lessons: 'Field is a vector quantity and potential is scalar; their cancellation conditions differ. Sensor placement also affected the accuracy of the results.',
    gallery: [{ image: 'electric-plot', caption: 'My plot of measured electric field versus q/r².' }],
    source: 'Physics II — Electric Field and Potential Lab.docx.'
  }
]
