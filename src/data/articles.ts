import { Article, AdPlacement, CommentItem } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'cal-state-graduation',
    title: 'Despite pandemic, Cal State graduation rates climbed, but equity gaps persist',
    subtitle: 'Systemwide initiatives drove four-year degree completion to record highs, though student achievement disparities remain.',
    category: 'Education',
    subcategory: 'Higher Ed',
    author: 'Penci Design',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    date: '5 years ago',
    readTime: '4 min read',
    commentCount: 14,
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Students walking across campus quad following morning lectures.',
    excerpt: 'Graduation rates among California State University students reached all-time highs despite the unprecedented challenges of virtual learning, campus closures, and economic turbulence.',
    content: [
      'Graduation rates across the 23-campus California State University system climbed to historic heights this year, driven by intensive student advisory interventions and digital credit recovery initiatives.',
      'According to fresh data released by system administrators, the four-year graduation rate for first-time freshmen reached 33%, more than doubling the pace recorded just a decade ago. Six-year graduation milestones also edged upward toward a record 63%.',
      'However, state education monitors cautioned that profound achievement and equity disparities between historically underserved students and their peers remain essentially unchanged.',
      '“We celebrate these gains as tangible proof of what coordinated institutional support can accomplish,” remarked Chancellor Joseph I. Castro during the board of trustees presentation. “Yet we cannot rest when completion gaps between underrepresented minorities and their classmates stubbornly hover near 12 percentage points.”',
      'Campus leaders are preparing to allocate an additional $150 million in targeted emergency completion grants and expanded mental health counselors across urban and rural campuses throughout the upcoming academic term.'
    ],
    featured: true,
    trending: true,
    hotBadge: 'SPECIAL REPORT',
    tags: ['Education', 'Universities', 'California', 'Higher Ed', 'Student Debt'],
    views: 14820
  },
  {
    id: 'us-taiwan-china-relations',
    title: 'U.S. wants to deepen relations with Taiwan amid rising tensions with China',
    subtitle: 'Bipartisan diplomatic engagement expands as high-level talks focus on semiconductor supply resilience.',
    category: 'Politics',
    subcategory: 'Foreign Affairs',
    author: 'Robert Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    date: '5 years ago',
    readTime: '5 min read',
    commentCount: 0,
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'President delivering remarks on bilateral cooperation and Pacific security.',
    excerpt: 'American policymakers have signaled intentions to broaden strategic coordination with Taipei, focusing on technology export security and democratic resilience in the Indo-Pacific.',
    content: [
      'The Biden administration took fresh steps this week to signal unwavering American commitment to Taiwan’s democratic integrity, dispatching a high-profile commercial delegation to discuss semiconductor supply stability.',
      'State Department representatives emphasized that U.S. policy toward the Taiwan Strait remains guided by the Taiwan Relations Act and three joint communiqués, while reiterating strong opposition to unilateral changes to regional status quo.',
      'Beijing swiftly denounced the exchanges, warning that escalating foreign contacts violate international sovereign protocols.',
      'Economic analysts point to Taiwan Semiconductor Manufacturing Co. (TSMC) as the critical fulcrum in global geopolitics, with over 60% of modern microchip fabrication taking place across Taiwanese foundries.'
    ],
    featured: true,
    tags: ['Politics', 'Foreign Policy', 'Taiwan', 'US Diplomacy', 'China'],
    views: 11200
  },
  {
    id: 'tech-tweetstorm-christmas',
    title: 'The real story behind a tech founder’s ‘tweetstorm that saves Christmas’',
    subtitle: 'How a viral supply chain diagnostic thread mobilized freight ships and bypassed container choke points.',
    category: 'Business',
    subcategory: 'Supply Chain',
    author: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    date: '5 years ago',
    readTime: '6 min read',
    commentCount: 0,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80',
    imageCaption: 'Container freight terminal stacked high during critical port congestion.',
    excerpt: 'When port bottlenecks threatened to starve holiday retail shelves, an overnight viral thread outlined simple spatial fixes that city dock officials adopted in days.',
    content: [
      'Last October, logistics entrepreneur Ryan Petersen chartered a boat to tour the paralyzed Ports of Los Angeles and Long Beach. What he observed was a gridlock of stacked empty containers that zoning laws prevented truckers from moving.',
      'Over a 24-tweet breakdown that garnered over 50,000 shares within twelve hours, Petersen presented a concrete 5-step triage: temporarily lift container stacking height restrictions, establish inland sorting depots, and let terminal operators unblock chassis.',
      'Within 48 hours, Long Beach city officials declared a local state of emergency allowing six-high stacking, breaking the maritime logjam.',
      '“It showed the immense power of transparent grassroots logistics visibility,” said maritime analyst Gordon Lee.'
    ],
    featured: true,
    tags: ['Business', 'Logistics', 'Shipping', 'Technology', 'Ports'],
    views: 9450
  },
  {
    id: 'vaccine-mandate-protest',
    title: 'Parents in California protest student COVID-19 vaccine mandate',
    subtitle: 'Demonstrators gather outside state capital building demanding parental autonomy over school health guidelines.',
    category: 'Education',
    subcategory: 'Policy',
    author: 'Elena Gomez',
    date: '5 years ago',
    readTime: '3 min read',
    commentCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Hundreds of parents and teachers organized walkouts across major school districts in protest of proposed statewide vaccine requirements.',
    content: [
      'School campuses across Sacramento and Orange County witnessed protests Monday as family groups called on state leaders to reconsider mandatory immunization directives for classroom attendance.',
      'Public health officials countered with clinical evidence demonstrating vaccination efficacy in curbing seasonal classroom outbreaks.'
    ],
    tags: ['Education', 'California', 'Health', 'Public Policy'],
    views: 8200
  },
  {
    id: 'boyle-heights-casa',
    title: 'After months of COVID-closed doors, Boyle Heights’ Casa steps forward',
    subtitle: 'The historic Latino cultural and performing arts center welcomes audiences back for live theater.',
    category: 'Entertainment',
    subcategory: 'Theater',
    author: 'Marco Delgado',
    date: '5 years ago',
    readTime: '4 min read',
    commentCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Boyle Heights community members joined hands as Casa 0101 Theater reopened with vibrant bilingual performances.',
    content: [
      'The stage lights are blazing once more at Casa 0101 in East Los Angeles. Founded by playwright Josefina López, the theater unveiled a triumphant autumn lineup celebrating neighborhood resilience.'
    ],
    tags: ['Entertainment', 'Arts', 'Culture', 'Los Angeles', 'Theater'],
    views: 6100
  },
  {
    id: 'climate-talks-summit',
    title: 'Global climate talks is happening. Here’s what you need to know',
    subtitle: 'World leaders assemble for high-stakes environmental conference targeting greenhouse emissions reductions.',
    category: 'Environment',
    subcategory: 'Global Summit',
    author: 'Astrid Lind',
    date: '5 years ago',
    readTime: '5 min read',
    commentCount: 19,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Delegates from 197 nations are convening to finalize enforceable rules for carbon pricing mechanisms and climate resilience funding for developing countries.',
    content: [
      'The stakes could hardly be greater as youth activists and international negotiators convene for the COP climate summit.',
      'Primary agenda items include phasing out unabated coal power, establishing loss-and-damage climate finance facilities, and strengthening national emission targets.'
    ],
    tags: ['Environment', 'Climate Change', 'COP Summit', 'Sustainability'],
    views: 13400
  },
  {
    id: 'five-substitutes-football',
    title: 'Five substitutes sport rule set to become permanent in football',
    subtitle: 'IFAB approves lasting implementation of rule modification introduced during congested fixture schedules.',
    category: 'Sports',
    subcategory: 'Football',
    author: 'Liam O’Connor',
    date: '5 years ago',
    readTime: '3 min read',
    commentCount: 27,
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    excerpt: 'The International Football Association Board (IFAB) has recommended permanently enshrining the five-substitution rule across all premier competitions.',
    content: [
      'Originally brought in as a temporary measure to protect player welfare during pandemic-crammed schedules, the five-sub rule will now be permanently codified in the Laws of the Game.'
    ],
    tags: ['Sports', 'Football', 'Premier League', 'FIFA'],
    views: 7800
  },
  {
    id: 'china-carbon-emitter',
    title: 'China, world’s top carbon emitter, offers few new climate targets ahead of U.N. summit',
    subtitle: 'Updated national contribution document reiterates existing 2030 peak emissions timeframe without stricter curbs.',
    category: 'World News',
    subcategory: 'Asia',
    author: 'Kenji Sato',
    date: '5 years ago',
    readTime: '4 min read',
    commentCount: 11,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Beijing formally submitted its updated nationally determined contribution, pledging to peak carbon emissions before 2030 and achieve carbon neutrality prior to 2060.',
    content: [
      'Environmental groups noted that the formal submission largely formalized promises previously articulated by top officials, falling short of Western hopes for accelerated timelines.'
    ],
    tags: ['World News', 'China', 'Climate', 'Asia'],
    views: 9200
  },
  {
    id: 'halloween-trick-or-treat',
    title: 'Is it OK to go trick-or-treating during the pandemic this Halloween?',
    subtitle: 'Epidemiologists issue neighborhood safety recommendations for outdoor trick-or-treating and candy distribution.',
    category: 'News',
    subcategory: 'Health & Lifestyle',
    author: 'Chloe Bennett',
    date: '5 years ago',
    readTime: '3 min read',
    commentCount: 5,
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Health advisors recommend outdoor candy stations, pre-packaged treat bags, and festive face masks for Halloween celebrations.',
    content: [
      'With transmission levels subsiding in many communities, pediatricians suggest outdoor trick-or-treating presents minimal transmission risk when basic precautions are observed.'
    ],
    tags: ['News', 'Health', 'Halloween', 'Family'],
    views: 5400
  },
  {
    id: 'un-net-zero-pledges',
    title: 'Net zero pledges offer hope of avoiding catastrophe, says UN report',
    subtitle: 'Analysis reveals collective national commitments could hold global temperature rises below key tipping points if fully delivered.',
    category: 'World News',
    subcategory: 'Global Affairs',
    author: 'Astrid Lind',
    date: '5 years ago',
    readTime: '4 min read',
    commentCount: 7,
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
    excerpt: 'UN climate chiefs stressed that while current targets bend the emissions curve downward, urgent financing and real-world deployment remain essential.',
    content: [
      'The latest assessment synthesis offers cautious optimism, finding that recent national net-zero pledges significantly diminish catastrophic extreme warming scenarios.'
    ],
    tags: ['World News', 'UN', 'Climate', 'Environment'],
    views: 6700
  },
  {
    id: 'us-economic-growth-covid',
    title: 'U.S. economic growth slowed to a 2% annual rate last quarter in face of COVID',
    subtitle: 'Supply shortages and waning federal stimulus tempered consumer spending in the third quarter.',
    category: 'Business',
    subcategory: 'Economy',
    author: 'David Sterling',
    date: '5 years ago',
    readTime: '5 min read',
    commentCount: 16,
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Gross domestic product expanded at its slowest pace in over a year as automotive factory shutdowns and shipping bottlenecks constrained retail output.',
    content: [
      'Commerce Department reports revealed that domestic gross domestic product rose at a 2.0% annualized clip, markedly down from the 6.7% expansion recorded in the preceding quarter.'
    ],
    tags: ['Business', 'Economy', 'GDP', 'Markets'],
    views: 8900
  },
  {
    id: 'wealth-tax-explainer',
    title: 'What is a wealth tax, and how would it work with the current system?',
    subtitle: 'A breakdown of proposed asset levies targeting multi-millionaires and billionaires to fund social programs.',
    category: 'Business',
    subcategory: 'Finance & Tax',
    author: 'David Sterling',
    date: '5 years ago',
    readTime: '6 min read',
    commentCount: 31,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Unlike income tax on annual earnings, an annual wealth levy applies directly to net asset holdings including stocks, real estate, and private equity.',
    content: [
      'As congressional lawmakers debate fiscal packages, proposals for an annual levy on extreme fortunes have taken center stage in national discourse.',
      'Critics point to constitutional hurdles and asset valuation complexity, while advocates point to record wealth concentration across top percentiles.'
    ],
    tags: ['Business', 'Tax Policy', 'Wall Street', 'Economy'],
    views: 12100
  },
  {
    id: 'corporate-earnings-tech',
    title: 'Corporate earnings rebound as tech and green infrastructure boom',
    subtitle: 'S&P 500 profit margins defy inflation fears fueled by cloud infrastructure and enterprise automation spending.',
    category: 'Business',
    subcategory: 'Markets',
    author: 'Sarah Jenkins',
    date: '5 years ago',
    readTime: '4 min read',
    commentCount: 9,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Corporate balance sheets exhibited surprising resilience as quarterly revenues across major technology conglomerates surpassed Wall Street consensus estimates.',
    content: [
      'Enterprise software adoption, digital advertising growth, and unprecedented clean energy investments buoyed corporate profits across second and third quarter reporting periods.'
    ],
    tags: ['Business', 'Tech', 'Stock Market', 'Corporate'],
    views: 7400
  },
  {
    id: 'classic-movies-socal',
    title: 'Classic movies in SoCal: ‘Pan’s Labyrinth’, ‘Phantasm’, ‘Psycho’ and more',
    subtitle: 'Revival cinemas and drive-in venues across Southern California host spine-tingling autumn repertory screenings.',
    category: 'Entertainment',
    subcategory: 'Cinema',
    author: 'Cynthia Wu',
    date: '5 years ago',
    readTime: '3 min read',
    commentCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    excerpt: 'From Quentin Tarantino’s New Beverly to the vintage Hollywood Legion Theater, cinephiles have an extraordinary lineup of 35mm horror masterpieces this weekend.',
    content: [
      'Film buffs across the Southland are flocking to restored picture palaces to witness cult classics on genuine celluloid.'
    ],
    tags: ['Entertainment', 'Movies', 'Culture', 'Cinema'],
    views: 4800
  },
  {
    id: 'inspiring-books-reading-list',
    title: '11 inspiring and entertaining books to add to your reading list next month',
    subtitle: 'From gripping literary mysteries to insightful philosophical memoirs, here are top editorial selections.',
    category: 'Entertainment',
    subcategory: 'Literature',
    author: 'Cynthia Wu',
    date: '5 years ago',
    readTime: '5 min read',
    commentCount: 12,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Curl up this November with our handpicked literature catalog spanning investigative journalism, heartwarming biographies, and visionary sci-fi.',
    content: [
      'As daylight savings winds down and cozy evenings settle in, our editors curated the most compelling new hardcovers arriving on bookstore shelves.'
    ],
    tags: ['Entertainment', 'Books', 'Reading', 'Culture'],
    views: 6500
  },
  {
    id: 'baseball-tbs-nfl-espn',
    title: 'Baseball boosts TBS, NFL gives ESPN a kick and streamers love ‘Squid’',
    subtitle: 'Postseason baseball ratings surges alongside record primetime sports viewership on cable networks.',
    category: 'Sports',
    subcategory: 'Broadcasting',
    author: 'Liam O’Connor',
    date: '5 years ago',
    readTime: '4 min read',
    commentCount: 6,
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Major sports broadcasts captured the vast majority of weekly television audience ratings, holding off competitive digital streaming debuts.',
    content: [
      'October drama on the baseball diamond yielded banner ratings for network partners, providing a welcome advertising surge ahead of winter fixtures.'
    ],
    tags: ['Sports', 'Baseball', 'NFL', 'Television', 'Media'],
    views: 9100
  },
  {
    id: 'premiership-rugby-guide',
    title: 'Detailed team-by-team guide for the new Premiership season this year',
    subtitle: 'Key squad arrivals, tactical overhauls, and championship contenders analyzed for rugby enthusiasts.',
    category: 'Sports',
    subcategory: 'Rugby',
    author: 'Liam O’Connor',
    date: '5 years ago',
    readTime: '7 min read',
    commentCount: 8,
    imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop&q=80',
    excerpt: 'With full stadiums permitted once again, rugby clubs across the nation are gearing up for the most fiercely contested domestic campaign in years.',
    content: [
      'Everything you need to know about every club’s title prospects, marquee international signings, and tactical setups for the new campaign.'
    ],
    tags: ['Sports', 'Rugby', 'Premiership', 'Athletics'],
    views: 4300
  },
  {
    id: 'padraig-harrington-ryder-cup',
    title: 'Padraig Harrington: Ryder Cup crowd left parents of players in tears',
    subtitle: 'European captain opens up regarding intense partisan pressure and memorable sportsmanship moments.',
    category: 'Sports',
    subcategory: 'Golf',
    author: 'Liam O’Connor',
    date: '5 years ago',
    readTime: '4 min read',
    commentCount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Reflecting on the Whistling Straits tournament, the veteran Irishman praised the emotional resilience of both squad members and their families.',
    content: [
      'Harrington shared intimate reflections on the sheer atmospheric intensity that defines transatlantic match play.'
    ],
    tags: ['Sports', 'Golf', 'Ryder Cup'],
    views: 5200
  },
  {
    id: 'frodon-bryony-frost',
    title: 'Frodon and Bryony Frost edge rival duo in thrilling encounter this season',
    subtitle: 'Jockey Bryony Frost guides bold-jumping chaser to dramatic steeplechase triumph in front of cheering grandstands.',
    category: 'Sports',
    subcategory: 'Equestrian',
    author: 'Arthur Pendelton',
    date: '5 years ago',
    readTime: '3 min read',
    commentCount: 3,
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80',
    excerpt: 'A masterclass in front-running jumping carried the popular gelding to yet another historic victory over Cheltenham turf.',
    content: [
      'The beloved partnership between Bryony Frost and Frodon delivered another chapter of racing folklore at Down Royal.'
    ],
    tags: ['Sports', 'Horse Racing', 'Equestrian'],
    views: 3900
  },
  {
    id: 'mortgage-credit-scores',
    title: 'When mortgage shopping, does checking your credit scores lower them?',
    subtitle: 'Demystifying the difference between hard inquiries, soft pulls, and 45-day rate-shopping windows.',
    category: 'Business',
    subcategory: 'Personal Finance',
    author: 'Emily Thorne',
    date: '5 years ago',
    readTime: '4 min read',
    commentCount: 0,
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Consumer financial protection rules treat multiple mortgage inquiries within a 14 to 45-day window as a single credit check.',
    content: [
      'Prospective homeowners often fear that soliciting quotes from multiple mortgage lenders will decimate their FICO scores. Here is what actually happens behind the scenes.'
    ],
    tags: ['Business', 'Mortgages', 'Credit Scores', 'Real Estate'],
    views: 10400
  },
  {
    id: 'fake-students-scam',
    title: '65,000 fake students applied for financial aid in wide community college scam',
    subtitle: 'Automated identity fraud ring targeted Pell grants across California community colleges before state detection.',
    category: 'Education',
    subcategory: 'Investigation',
    author: 'Elena Gomez',
    date: '5 years ago',
    readTime: '5 min read',
    commentCount: 0,
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    excerpt: 'State collegiate auditors discovered tens of thousands of automated bot submissions exploiting open enrollment portals to siphon emergency federal financial aid.',
    content: [
      'California community college officials announced enhanced cybersecurity validation after discovering a sprawling identity fraud operation.'
    ],
    tags: ['Education', 'Cybersecurity', 'Financial Aid', 'Investigation'],
    views: 11800
  },
  {
    id: 'coronavirus-california-example',
    title: 'Coronavirus Today: California is not exactly leading by example',
    subtitle: 'Regional transmission disparities and conflicting county protocols complicate the state’s reopening roadmaps.',
    category: 'Politics',
    subcategory: 'State News',
    author: 'Penci Design',
    date: '5 years ago',
    readTime: '4 min read',
    commentCount: 22,
    imageUrl: 'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=800&auto=format&fit=crop&q=80',
    excerpt: 'A deep dive into regulatory inconsistencies across Bay Area and Southern California health jurisdictions.',
    content: [
      'Public health guidelines that vary by street address have left small business owners and residents frustrated as winter approaches.'
    ],
    tags: ['Politics', 'California', 'Health Policy', 'Public Health'],
    views: 9900
  },
  {
    id: 'crews-union-deal',
    title: 'Crews union reaches deal on film and TV contract for US workers',
    subtitle: 'IATSE secures landmark agreement addressing 54-hour rest periods and wage increases for behind-the-scenes film crews.',
    category: 'Entertainment',
    subcategory: 'Labor',
    author: 'Marco Delgado',
    date: '5 years ago',
    readTime: '4 min read',
    commentCount: 14,
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=80',
    excerpt: 'A crippling Hollywood strike was narrowly averted over the weekend as union negotiators and alliance producers agreed to historic workplace reforms.',
    content: [
      'The three-year pact establishes mandatory 10-hour rest intervals between shifts and substantial pension contributions from streaming platforms.'
    ],
    tags: ['Entertainment', 'Labor', 'Hollywood', 'Union'],
    views: 8300
  },
  {
    id: 'judge-vaccine-mandate-nyc',
    title: 'Judge won’t stop vaccine mandate for NYC cops, other workers',
    subtitle: 'State supreme court justice denies police union preliminary injunction ahead of city enforcement deadline.',
    category: 'Politics',
    subcategory: 'Law',
    author: 'Robert Vance',
    date: '5 years ago',
    readTime: '3 min read',
    commentCount: 38,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    excerpt: 'New York City’s municipal employee immunization mandate cleared its final legal obstacle following a ruling in Staten Island supreme court.',
    content: [
      'Justice Lizette Colon denied the Police Benevolent Association’s request for a temporary restraining order, leaving the municipal requirement in place.'
    ],
    tags: ['Politics', 'Law', 'New York', 'Municipal'],
    views: 14100
  }
];

export const ADS: AdPlacement[] = [
  {
    id: 'ad-hero-right',
    type: 'medium-rectangle',
    title: 'TOP SELLING MULTIPURPOSE WORDPRESS THEME',
    subtitle: 'Crafted with passion for publishers, blogs & magazines',
    ctaText: 'GET IT NOW',
    ctaUrl: 'https://soledaddemo.pencidesign.net/soledad-times-magazine/',
    dimensions: '300 x 250 Ad Space',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    active: true
  },
  {
    id: 'ad-leaderboard',
    type: 'leaderboard',
    title: 'MULTI-PURPOSE WORDPRESS THEME',
    subtitle: '728 x 90 Ads Space • Clean, Fast & High Performance',
    ctaText: 'PURCHASE NOW',
    ctaUrl: 'https://soledaddemo.pencidesign.net/soledad-times-magazine/',
    dimensions: '728 x 90 Ads Space',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80',
    active: true
  }
];

export const INITIAL_COMMENTS: Record<string, { id: string; author: string; avatar: string; date: string; content: string; likes: number }[]> = {
  'cal-state-graduation': [
    {
      id: 'c1',
      author: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      date: '2 days ago',
      content: 'The advisory programs at Cal State Long Beach were phenomenal in helping students navigate degree requirements. Glad to see institutional numbers reflect that!',
      likes: 6
    },
    {
      id: 'c2',
      author: 'Dr. Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      date: '1 day ago',
      content: 'The equity gap is what we must continue to urgently fund. Closing that 12-point differential requires direct grants for housing and textbooks.',
      likes: 9
    }
  ]
};
