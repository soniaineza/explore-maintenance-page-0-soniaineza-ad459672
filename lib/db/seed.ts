import { db } from "./index"
import { destinations, tours } from "./schema"

async function seed() {
  console.log("Clearing existing data...")
  await db.delete(tours)
  await db.delete(destinations)

  console.log("Seeding destinations...")

  await db.insert(destinations).values([
    {
      slug: "volcanoes-national-park",
      name: "Volcanoes National Park",
      region: "Musanze",
      tagline: "Home to the magnificent mountain gorillas",
      description:
        "Volcanoes National Park is a breathtaking protected area in northwestern Rwanda, part of the Virunga Mountains. It is world-famous for its population of endangered mountain gorillas, which were brought to global attention by primatologist Dian Fossey. The park features five of the eight volcanoes in the Virunga range, including Mount Karisimbi — the highest at 4,507 meters. Visitors can trek through dense bamboo forests to observe gorilla families in their natural habitat, hike volcanoes, and visit the Dian Fossey Grave and research center. The park is also home to golden monkeys, forest elephants, and over 200 bird species.",
      bestTime: "June to September (dry season)",
      highlights: [
        "Mountain gorilla trekking permits available year-round",
        "Golden monkey tracking in bamboo forests",
        "Summit hike to Mount Bisoke or Mount Karisimbi",
        "Visit the Dian Fossey Research Center and grave",
        "Birdwatching with over 200 recorded species",
      ],
      imageUrl: "/images/volcanoes-national-park.webp",
      featured: true,
    },
    {
      slug: "nyungwe-forest",
      name: "Nyungwe Forest National Park",
      region: "Southwest",
      tagline: "One of Africa's oldest rainforests",
      description:
        "Nyungwe Forest National Park is a sprawling montane rainforest in southwestern Rwanda, one of the oldest in Africa. Spanning over 1,000 square kilometers, it is a biodiversity hotspot with over 1,000 plant species, 300 bird species, and 13 species of primates — including chimpanzees, colobus monkeys, and L'Hoest's monkeys. The park is famous for its canopy walkway suspended 50 meters above the forest floor, offering panoramic views of the lush greenery. Nyungwe is a paradise for hikers and nature enthusiasts, with over 130 kilometers of well-maintained trails.",
      bestTime: "June to August and December to February",
      highlights: [
        "Chimpanzee tracking in their natural habitat",
        "Canopy walkway 50 meters above the forest floor",
        "Colobus monkey troops of up to 400 individuals",
        "Hiking trails ranging from 2 hours to 3 days",
        "Over 300 bird species including the great blue turaco",
      ],
      imageUrl: "/images/nyungwe-forest.webp",
      featured: true,
    },
    {
      slug: "akagera-national-park",
      name: "Akagera National Park",
      region: "East",
      tagline: "Rwanda's Big Five safari destination",
      description:
        "Akagera National Park is Rwanda's premiere savanna national park, covering 1,122 square kilometers in the east of the country. Established in 1934, it has undergone an incredible conservation revival, reintroducing lion, black rhino, and other species in recent years. Today it is one of the most accessible parks in Africa, offering classic game drives through diverse landscapes of acacia woodland, swamp, and open plains. Lake Ihema is the largest of several lakes within the park and provides excellent boat safaris where visitors can spot hippos, crocodiles, and abundant waterbirds.",
      bestTime: "June to September",
      highlights: [
        "Big Five game drives (lion, leopard, elephant, buffalo, rhino)",
        "Boat safaris on Lake Ihema with hippos and crocodiles",
        "Over 500 bird species including African fish eagles",
        "Night game drives for nocturnal wildlife spotting",
        "Stunning views across the Kagera River floodplains",
      ],
      imageUrl: "/images/akagera-safari.webp",
      featured: true,
    },
    {
      slug: "lake-kivu",
      name: "Lake Kivu",
      region: "Western Province",
      tagline: "Serene lakeside escapes and island adventures",
      description:
        "Lake Kivu is one of the African Great Lakes, situated along the western border of Rwanda with the Democratic Republic of Congo. Its crystal-clear waters, terraced hillsides, and sandy beaches create an idyllic setting for relaxation and water activities. The main resort towns of Gisenyi (Rubavu), Kibuye (Karongi), and Cyangugu (Rusizi) each offer their own unique charm. Visitors can enjoy kayaking, boat trips to islands, coffee plantation tours on the hillsides, and watching spectacular sunsets over the lake while enjoying locally caught fish.",
      bestTime: "June to September",
      highlights: [
        "Kayaking and stand-up paddleboarding on calm waters",
        "Boat trips to Napoleon Island (fruit bat colony)",
        "Coffee farm tours on the surrounding hills",
        "Beach resorts and lakeside swimming",
        "Sunset cruises with views of the DRC mountains",
      ],
      imageUrl: "/images/lake-kivu.webp",
      featured: false,
    },
    {
      slug: "kigali",
      name: "Kigali",
      region: "Kigali Province",
      tagline: "Africa's cleanest and most welcoming capital",
      description:
        "Kigali is the vibrant capital city of Rwanda, nestled among rolling hills and known for its cleanliness, safety, and warm hospitality. As the economic and cultural heart of the nation, Kigali offers a fascinating blend of modern development and traditional Rwandan culture. The city is home to world-class restaurants, a burgeoning arts scene, the moving Kigali Genocide Memorial, and excellent craft markets. Kigali also serves as the gateway to the rest of the country, with easy access to all major national parks.",
      bestTime: "Year-round destination",
      highlights: [
        "Kigali Genocide Memorial — a powerful educational experience",
        "Inema Arts Centre showcasing contemporary Rwandan art",
        "Kimironko Market for authentic local crafts and produce",
        "Mount Kigali hiking trail with panoramic city views",
        "Rooftop dining and café culture in Kacyiru and Nyarutarama",
      ],
      imageUrl: "/images/kigali-city.webp",
      featured: false,
    },
  ])
  console.log("Seeding tours...")
  await db.insert(tours).values([
    {
      slug: "gorilla-trekking-adventure",
      title: "Gorilla Trekking Adventure",
      category: "Adventure",
      summary:
        "An unforgettable encounter with Rwanda's mountain gorillas in Volcanoes National Park, with expert guides leading every trek.",
      description:
        "This 3-day journey takes you to the heart of Volcanoes National Park for one of the most profound wildlife experiences on Earth. Led by expert trackers and guides, you will trek through misty bamboo forests to spend a precious hour observing a mountain gorilla family in their natural habitat. The experience is humbling, thrilling, and deeply moving. Beyond the trek, you will stay at a comfortable eco-lodge and have the opportunity to visit the nearby Dian Fossey Research Center or participate in a community village walk. This tour includes all permits, accommodations, meals, and ground transport from Kigali.",
      durationDays: 3,
      groupSize: "2-8 people",
      difficulty: "Moderate",
      priceUsd: 2100,
      destinationSlug: "volcanoes-national-park",
      highlights: [
        "One-hour close encounter with a mountain gorilla family",
        "Guided trek through bamboo and montane forest terrain",
        "Visit the Dian Fossey Research Center and grave site",
        "Community walk to meet local Batwa communities",
        "Accommodation at a premium eco-lodge near the park",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kigali & transfer to Musanze",
          detail: "You will be met at Kigali International Airport and driven north through the stunning terraced hills to Musanze, the gateway to Volcanoes National Park. After settling into your lodge, enjoy a briefing from your guide about what to expect on your gorilla trek.",
        },
        {
          day: 2,
          title: "Gorilla trekking experience",
          detail: "An early breakfast is followed by a drive to the park headquarters. After a briefing from park rangers, you will set off into the forest with your tracking group. The trek can last between 1 and 4 hours depending on gorilla location. Once you find the family, you'll spend a magical hour observing their social interactions, feeding, and play. Return to the lodge for a well-deserved rest and dinner.",
        },
        {
          day: 3,
          title: "Optional excursion & departure",
          detail: "Choose between a golden monkey tracking experience, a visit to the Dian Fossey Grave, or a community walk. After lunch, you will be transferred back to Kigali for your departure, with spectacular views of the Virunga volcanoes along the way.",
        },
      ],
      included: [
        "All transfers and ground transport in a private vehicle",
        "2 nights accommodation at a mid-range or premium eco-lodge",
        "Gorilla trekking permit ($1,500 per person)",
        "Professional English-speaking guide",
        "All meals as specified in the itinerary",
        "Park entrance fees and ranger guide",
      ],
      imageUrl: "/images/gorilla-trekking.webp",
      featured: true,
    },
    {
      slug: "chimpanzee-tracking-nyungwe",
      title: "Chimpanzee Tracking in Nyungwe",
      category: "Adventure",
      summary:
        "Track habituated chimpanzee troops through one of Africa's oldest rainforests and experience the canopy walkway.",
      description:
        "Nyungwe Forest offers one of Africa's most accessible chimpanzee tracking experiences. This 2-day exploration takes you deep into the ancient rainforest to observe chimpanzees in their natural habitat alongside 12 other primate species. The forest is alive with the calls of colobus monkeys, birds, and insects. When you are not tracking, you will walk the famous canopy walkway suspended 50 meters above the forest floor, offering breathtaking views over the vast green canopy. This tour is perfect for nature lovers and those seeking a more active wildlife experience.",
      durationDays: 2,
      groupSize: "2-6 people",
      difficulty: "Moderate",
      priceUsd: 900,
      destinationSlug: "nyungwe-forest",
      highlights: [
        "Chimpanzee tracking with expert guides and rangers",
        "Canopy walkway experience at 50 meters above the forest",
        "Colobus monkey troops numbering up to 400 individuals",
        "Guided nature walks on well-maintained forest trails",
        "Overnight stay near the park with forest views",
      ],
      itinerary: [
        {
          day: 1,
          title: "Transfer from Kigali to Nyungwe",
          detail: "Depart Kigali early morning and drive through the scenic southern route to Nyungwe Forest, arriving by early afternoon. After check-in, enjoy an afternoon guided walk along one of the shorter trails, learning about the forest's medicinal plants, orchids, and birdlife.",
        },  
        {
          day: 2,
          title: "Chimpanzee tracking and canopy walk",
          detail: "An early 5:00 AM start for chimpanzee tracking. Your guide and trackers will lead you through the forest in search of the habituated chimp troop. The trek can be challenging but immensely rewarding. After your hour with the chimps, return for breakfast then visit the Igishigishigi canopy walkway for panoramic forest views. Transfer back to Kigali in the afternoon.",
        },
      ],
      included: [
        "Private round-trip transport from Kigali",
        "1 night accommodation near Nyungwe",
        "Chimpanzee tracking permit ($90 per person)",
        "Canopy walkway entrance fee",
        "Professional guide and park ranger",
        "Full board meals during the tour",
      ],
      imageUrl: "/images/nyungwe-forest.webp",
      featured: true,
    },
    {
      slug: "akagera-big-five-safari",
      title: "Akagera Big Five Safari",
      category: "Safari",
      summary:
        "A classic savanna safari in Rwanda's only Big Five reserve, with game drives and boat safaris across 1,100 sq km of wilderness.",
      description:
        "Experience the wild side of Rwanda on this 4-day safari through Akagera National Park. After a remarkable conservation story that saw lion and black rhino successfully reintroduced, Akagera is now a fully functioning Big Five reserve. Explore the park's diverse ecosystems — from open savanna to acacia woodland, lakes and papyrus swamps — on guided game drives, night drives, and boat safaris on Lake Ihema. Accommodation in a tented camp or lodge near the lake provides an immersive safari experience with stunning sunsets and the sounds of the African bush.",
      durationDays: 4,
      groupSize: "2-8 people",
      difficulty: "Easy",
      priceUsd: 1800,
      destinationSlug: "akagera-national-park",
      highlights: [
        "Full-day game drives with Big Five sightings",
        "Night game drives to see nocturnal wildlife",
        "Boat safari on Lake Ihema (hippos, crocs, birds)",
        "Sundowners overlooking the vast savanna plains",
        "Visit the Karenge Bush Camp for a conservation talk",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kigali to Akagera",
          detail: "After an early departure from Kigali, you'll arrive at Akagera National Park in time for a late morning game drive en route to your lodge. Enjoy lunch overlooking Lake Ihema, then an afternoon boat safari to see hippos, crocodiles, and hundreds of waterbirds. Overnight at a lakeside lodge or tented camp.",
        },
        {
          day: 2,
          title: "Full-day game drive",
          detail: "Set out after breakfast for a full day of wildlife viewing in the northern and southern sectors of the park. The park's diverse habitats support elephant, buffalo, giraffe, zebra, eland, and the reintroduced lion and black rhino. A picnic lunch is served at a scenic spot within the park. Return to camp before sunset.",
        },
        {
          day: 3,
          title: "Morning game drive and night drive",
          detail: "An early morning game drive offers the best chance to see predators on the move. Return for brunch and some rest before heading out again in the late afternoon. A night game drive after dinner reveals the park's nocturnal inhabitants — genet cats, hyenas, bushbabies, and possibly leopard.",
        },
        {
          day: 4,
          title: "Final game drive and return to Kigali",
          detail: "Enjoy one last morning game drive before breakfast, then bid farewell to Akagera. The drive back to Kigali takes you through the lush eastern province, arriving by early afternoon in time for onward travel.",
        },
      ],
      included: [
        "Private safari vehicle and driver-guide for all game drives",
        "3 nights accommodation in a tented camp or lodge",
        "Park entrance and activity fees",
        "Night game drive and boat safari",
        "All meals and drinking water during the safari",
        "Round-trip transport from Kigali",
      ],
      imageUrl: "/images/akagera-safari.webp",
      featured: true,
    },
    {
      slug: "rwanda-grand-tour",
      title: "Rwanda Grand Tour",
      category: "Multi-day",
      summary:
        "The ultimate Rwanda experience — gorillas, chimp tracking, savanna safari, and lakeside relaxation in one unforgettable journey.",
      description:
        "Our Grand Tour is the definitive Rwanda experience, taking you across the entire country over 8 days. You will trek mountain gorillas in Volcanoes National Park, track chimpanzees in Nyungwe, go on Big Five game drives in Akagera, and unwind on the shores of Lake Kivu. This journey showcases the extraordinary diversity of Rwanda — from misty volcanic peaks and ancient rainforests to vast savanna plains and serene lakes. Each day brings a new landscape and a new adventure, with expert guides and premium accommodations throughout.",
      durationDays: 8,
      groupSize: "2-6 people",
      difficulty: "Moderate",
      priceUsd: 5200,
      destinationSlug: "volcanoes-national-park",
      highlights: [
        "Mountain gorilla trekking in Volcanoes National Park",
        "Chimpanzee tracking in Nyungwe Forest",
        "Big Five game drives in Akagera National Park",
        "Relaxation and water activities on Lake Kivu",
        "Cultural visits including a community walk and craft market",
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Kigali",
          detail: "Arrive at Kigali International Airport and transfer to your hotel. Depending on arrival time, enjoy a city tour including the Kigali Genocide Memorial, Inema Arts Centre, and dinner at one of Kigali's excellent rooftop restaurants.",
        },
        {
          day: 2,
          title: "Kigali to Akagera National Park",
          detail: "Drive east to Akagera for a two-day safari. Afternoon game drive en route to your lodge. Evening boat safari on Lake Ihema.",
        },
        {
          day: 3,
          title: "Full-day game drive in Akagera",
          detail: "A full day exploring Akagera's diverse habitats. Morning and afternoon game drives with a break at your lodge for lunch and rest. Night game drive after dinner.",
        },
        {
          day: 4,
          title: "Akagera to Volcanoes National Park",
          detail: "Transfer north to Musanze. Afternoon at leisure with optional community walk. Overnight at a lodge near Volcanoes National Park.",
        },
        {
          day: 5,
          title: "Gorilla trekking day",
          detail: "The highlight of your trip. Early morning briefing followed by gorilla trekking. Spend one hour with a mountain gorilla family. Celebration dinner at your lodge.",
        },
        {
          day: 6,
          title: "Volcanoes to Lake Kivu",
          detail: "Morning golden monkey tracking or Dian Fossey visit. Afternoon transfer to Lake Kivu. Sunset cruise and overnight at a lakeside resort.",
        },
        {
          day: 7,
          title: "Lake Kivu to Nyungwe Forest",
          detail: "Morning kayaking or coffee tour on Lake Kivu. Scenic drive south to Nyungwe Forest. Afternoon canopy walkway experience.",
        },
        {
          day: 8,
          title: "Chimpanzee tracking and departure",
          detail: "Early morning chimpanzee tracking in Nyungwe. Return for breakfast and transfer to Kigali International Airport for departure.",
        },
      ],
      included: [
        "All domestic ground transport with professional driver-guide",
        "7 nights premium accommodation throughout",
        "Gorilla trekking permit ($1,500)",
        "Chimpanzee tracking permit ($90)",
        "All park entrance and activity fees",
        "Full board meals throughout the itinerary",
        "Boat safaris, night drives, and guided walks",
        "All taxes and service charges",
      ],
      imageUrl: "/images/rwanda-hero.webp",
      featured: true,
    },
    {
      slug: "kigali-city-tour",
      title: "Kigali City Discovery",
      category: "Culture",
      summary:
        "Discover the vibrant culture, history, and cuisine of Africa's most remarkable capital city in a single day.",
      description:
        "Kigali is more than just a gateway to Rwanda's national parks — it is a destination in its own right. This full-day tour takes you to the heart of the city, exploring its poignant history, thriving arts scene, and incredible food culture. Visit the award-winning Kigali Genocide Memorial for a profound educational experience, explore the Contemporary art at Inema Arts Centre, shop for handcrafted souvenirs at the Caplaki Craft Village, and taste your way through local specialties at a traditional restaurant. This is the perfect introduction to Rwanda for anyone with a day in the capital.",
      durationDays: 1,
      groupSize: "1-10 people",
      difficulty: "Easy",
      priceUsd: 120,
      destinationSlug: "kigali",
      highlights: [
        "Guided visit to the Kigali Genocide Memorial",
        "Contemporary art tour at Inema Arts Centre",
        "Local lunch experience in Kacyiru",
        "Shopping at Caplaki Craft Village",
        "Photo stops at Kigali's iconic viewpoints",
      ],
      itinerary: [
        {
          day: 1,
          title: "Full-day Kigali exploration",
          detail: "Your guide will pick you up from your hotel at 9 AM. Begin at the Kigali Genocide Memorial for a 2-hour guided visit. Then drive to the Mt Kigali viewpoint for panoramic photos. Visit Inema Arts Centre to meet local artists, followed by lunch at a restaurant serving Rwandan specialties. After lunch, explore Caplaki Craft Village for souvenirs, then walk through the bustling Kimironko Market. The tour concludes with a coffee tasting at a local café in Kacyiru, followed by drop-off at your hotel around 4 PM.",
        },
      ],
      included: [
        "Professional English-speaking guide",
        "Hotel pickup and drop-off in Kigali",
        "Entrance fees to all listed attractions",
        "Traditional lunch at a local restaurant",
        "Bottled water throughout the tour",
        "Coffee tasting experience",
      ],
      imageUrl: "/images/kigali-city.webp",
      featured: false,
    },
    {
      slug: "lake-kivu-retreat",
      title: "Lake Kivu Wellness Retreat",
      category: "Relaxation",
      summary:
        "Unwind on the shores of Lake Kivu with kayaking, coffee tours, and serene sunsets in this relaxing getaway.",
      description:
        "Escape the hustle and spend 3 days relaxing on the pristine shores of Lake Kivu. Based in the charming town of Kibuye, this retreat combines gentle water activities with cultural experiences and plenty of time to simply unwind. Kayak across the calm waters, take a boat trip to Napoleon Island to see thousands of fruit bats, visit a coffee plantation on the terraced hillsides, and enjoy spectacular sunsets over the lake. With comfortable lakeside accommodation, fresh local cuisine, and the sound of lapping water, this is the perfect way to recharge during your Rwanda journey.",
      durationDays: 3,
      groupSize: "1-8 people",
      difficulty: "Easy",
      priceUsd: 750,
      destinationSlug: "lake-kivu",
      highlights: [
        "Kayaking and stand-up paddleboarding on Lake Kivu",
        "Boat excursion to Napoleon Island with fruit bat colony",
        "Guided coffee plantation tour and tasting",
        "Lakeside swimming at sandy beaches",
        "Sunset dhow cruise with refreshments",
      ],
      itinerary: [
        {
          day: 1,
          title: "Transfer from Kigali to Lake Kivu",
          detail: "Depart Kigali after breakfast for the scenic 3-hour drive to Kibuye on Lake Kivu. Check into your lakeside lodge and enjoy a welcome lunch. Afternoon at leisure to swim, relax on the beach, or explore the town. Evening sunset cruise with drinks.",
        },
        {
          day: 2,
          title: "Kayaking and island excursion",
          detail: "Morning kayaking expedition along the coastline, visiting hidden coves and beaches. After lunch, take a boat trip to Napoleon Island to observe the colony of fruit bats and enjoy panoramic views of the lake. Return for a cooking demonstration of local fish dishes.",
        },
        {
          day: 3,
          title: "Coffee tour and departure",
          detail: "Visit a local coffee cooperative on the hills above Kibuye for a guided tour of the plantation and washing station. Learn about Rwanda's specialty coffee and enjoy a tasting. After lunch, transfer back to Kigali for your departure.",
        },
      ],
      included: [
        "Round-trip transfer from Kigali",
        "2 nights lakeside accommodation",
        "All meals (breakfast, lunch, dinner)",
        "Kayaking equipment and guided trip",
        "Boat excursion to Napoleon Island",
        "Coffee plantation tour and tasting",
        "Sunset cruise",
      ],
      imageUrl: "/images/lake-kivu.webp",
      featured: false,
    },
    {
      slug: "cultural-immersion-rwanda",
      title: "Rwanda Cultural Immersion",
      category: "Culture",
      summary:
        "Experience authentic Rwandan culture through village visits, traditional dancing, craft workshops, and local cuisine.",
      description:
        "This 2-day cultural immersion takes you beyond the tourist trail to experience the authentic traditions and daily life of Rwanda. Visit a traditional village near Volcanoes National Park to learn about the traditions of the Batwa and Banyarwanda people. Participate in a cooking class to prepare Rwandan staples like ugali, isombe, and brochettes. Visit a local pottery cooperative and try your hand at the wheel. The experience culminates in an evening of traditional Intore dance performance followed by a farm-to-table dinner with a local family. This tour offers genuine connection and cultural exchange.",
      durationDays: 2,
      groupSize: "2-8 people",
      difficulty: "Easy",
      priceUsd: 500,
      destinationSlug: "volcanoes-national-park",
      highlights: [
        "Traditional Intore dance performance with drumming",
        "Rwandan cooking class with local family",
        "Visit to a Batwa community and cultural site",
        "Hands-on pottery workshop",
        "Farm-to-table dinner experience",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kigali to Musanze cultural village",
          detail: "Depart Kigali and drive to the Musanze region. Visit a community-run cultural village for an introduction to Rwandan traditions. Enjoy a cooking class preparing local dishes with your hosts. Evening traditional dance and drumming performance.",
        },
        {
          day: 2,
          title: "Craft workshops and return to Kigali",
          detail: "Morning pottery workshop with local artisans. Visit the Musanze market for a guided tour explaining local produce and crafts. Late morning transfer back to Kigali with lunch en route, arriving by mid-afternoon.",
        },
      ],
      included: [
        "Private transport from and to Kigali",
        "1 night accommodation in a community guesthouse",
        "All meals and cooking class ingredients",
        "Cultural village entrance and activity fees",
        "Pottery workshop materials",
        "Local guide and translator",
      ],
      imageUrl: "/images/cultural-experience.webp",
      featured: false,
    },
    {
      slug: "golden-monkey-trek",
      title: "Golden Monkey Tracking Experience",
      category: "Adventure",
      summary:
        "Track the rare and playful golden monkeys through the bamboo forests of Volcanoes National Park.",
      description:
        "While mountain gorillas are the stars of Volcanoes National Park, the golden monkey is a delightfully charming alternative that fewer visitors know about. These beautiful primates with their golden-orange fur and playful antics live in the same bamboo forests as the gorillas. This half-day trek takes you into their habitat where you will spend an unforgettable hour watching troops of golden monkeys as they forage, play, and interact. The trek is generally shorter and less strenuous than gorilla trekking, making it perfect for families with children or those seeking a lighter adventure.",
      durationDays: 1,
      groupSize: "2-12 people",
      difficulty: "Easy",
      priceUsd: 350,
      destinationSlug: "volcanoes-national-park",
      highlights: [
        "Track rare golden monkeys in bamboo forests",
        "Observe playful monkey troops in their natural habitat",
        "Shorter, less strenuous trek suitable for families",
        "Stunning views of the Virunga volcanoes",
        "Optional community walk in nearby villages",
      ],
      itinerary: [
        {
          day: 1,
          title: "Golden monkey tracking",
          detail: "After an early breakfast and briefing at the park headquarters, you will set off with your guide and ranger into the bamboo forest. The trek typically lasts 1-2 hours. Once located, you will spend one hour observing the golden monkeys as they leap through the trees and interact with each other. Return to the base for a celebratory lunch before your transfer back to Kigali or onwards to your next destination.",
        },
      ],
      included: [
        "Park entrance and golden monkey permit",
        "Professional guide and park ranger",
        "Round-trip transport from Musanze or Kigali",
        "Bottled water and snacks",
      ],
      imageUrl: "/images/rwanda-hills.webp",
      featured: true,
    },
    {
      slug: "akagera-birding-safari",
      title: "Akagera Birding Safari",
      category: "Safari",
      summary:
        "A paradise for birdwatchers — over 500 bird species across diverse wetlands, savanna and lakes.",
      description:
        "Akagera National Park is one of Africa's premier birding destinations with over 500 recorded species. This specialized 3-day birding safari takes you to the best habitats across the park — from the papyrus swamps and lakes in the south to the acacia woodlands and open savanna in the north. Led by an expert ornithologist guide, you will search for the elusive shoebill stork, papyrus gonolek, African fish eagle, and hundreds more. The park's diverse ecosystems support an incredible variety of waterbirds, raptors, and forest species, making this a must-do for any serious birder.",
      durationDays: 3,
      groupSize: "2-6 people",
      difficulty: "Easy",
      priceUsd: 1200,
      destinationSlug: "akagera-national-park",
      highlights: [
        "Expert-led birding with specialist ornithologist guide",
        "Search for the elusive shoebill stork in papyrus swamps",
        "Boat safari on Lake Ihema for waterbirds and raptors",
        "Early morning and late afternoon birding walks",
        "Over 500 species including the great blue turaco",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kigali to Akagera — afternoon birding",
          detail: "Depart Kigali early and arrive at Akagera in time for morning birding along the lake shore. After lunch at your lodge, head out for an afternoon birding drive across the southern wetlands. Evening boat safari on Lake Ihema to spot African fish eagles, kingfishers, and the papyrus gonolek.",
        },
        {
          day: 2,
          title: "Full-day birding expedition",
          detail: "An early 5:30 AM start for the best birding of the day. Explore the northern sector's acacia woodlands for birds like the crimson-rumped waxbill and white-browed coucal. After a picnic lunch, continue to the Mutumba hills for panoramic views and forest bird species.",
        },
        {
          day: 3,
          title: "Morning walk and departure",
          detail: "Early morning guided birding walk along the Ihema lakeshore — the best time to spot the shoebill. Return for brunch and a final game drive as you make your way back to the park exit. Transfer to Kigali arriving mid-afternoon.",
        },
      ],
      included: [
        "Private safari vehicle with pop-up roof",
        "Specialist ornithologist guide",
        "2 nights accommodation in the park",
        "Boat safari on Lake Ihema",
        "All park entrance fees",
        "Full board meals and drinking water",
      ],
      imageUrl: "/images/african-bird.webp",
      featured: false,
    },
    {
      slug: "kigali-food-tour",
      title: "Kigali Food & Market Tour",
      category: "Culture",
      summary:
        "Taste your way through Kigali — from sizzling street food to farm-to-table Rwandan cuisine.",
      description:
        "Rwanda's burgeoning food scene reflects its rich agricultural heritage and growing cosmopolitan culture. This half-day food tour takes you on a culinary journey through Kigali. Start at the bustling Kimironko Market where you will taste exotic fruits, spices, and fresh produce. Sample sambaza (Lake Kivu sardines), brochettes (grilled meat skewers), and the famous Rwandan coffee at artisan cafes. Visit a traditional kitchen to learn how ugali, isombe, and akabanga are prepared. The tour ends at one of Kigali's best farm-to-table restaurants for a curated tasting menu.",
      durationDays: 1,
      groupSize: "1-8 people",
      difficulty: "Easy",
      priceUsd: 85,
      destinationSlug: "kigali",
      highlights: [
        "Guided tour of Kimironko Market with tastings",
        "Street food sampling — brochettes, sambaza, samosas",
        "Specialty Rwandan coffee tasting at artisan cafe",
        "Visit a traditional kitchen for cooking demo",
        "Farm-to-table lunch at top Kigali restaurant",
      ],
      itinerary: [
        {
          day: 1,
          title: "Half-day food tour",
          detail: "Your guide picks you up at 9 AM. Begin at Kimironko Market for a guided tour with food tastings. Then walk to nearby street food stalls for brochettes and fresh juice. Visit a coffee shop for a tasting of Rwanda's award-winning specialty coffee. End with a cooking demonstration and lunch at a farm-to-table restaurant featuring local ingredients and traditional dishes with a modern twist.",
        },
      ],
      included: [
        "Professional food guide",
        "Hotel pickup and drop-off in Kigali",
        "All food and drink tastings",
        "Coffee tasting experience",
        "Farm-to-table lunch",
        "Market tour with local translator",
      ],
      imageUrl: "/images/kigali-street.webp",
      featured: false,
    },
    {
      slug: "nyungwe-multi-day-hike",
      title: "Nyungwe Forest Multi-Day Hike",
      category: "Adventure",
      summary:
        "An epic 3-day hike through one of Africa's oldest rainforests, exploring remote trails and staying in forest camps.",
      description:
        "For active travelers who want to immerse themselves in the rainforest, this multi-day hike through Nyungwe is the ultimate adventure. Covering over 40 kilometers of trails across three days, you will traverse the heart of the forest, staying overnight at a simple forest camp and a community guesthouse. Your guide will point out the incredible biodiversity — from orchids and giant lobelias to colobus monkeys, birds, and butterflies. The hike culminates with the canopy walkway and a well-earned rest. This is a truly off-the-beaten-path experience that few travelers get to enjoy.",
      durationDays: 3,
      groupSize: "2-6 people",
      difficulty: "Challenging",
      priceUsd: 650,
      destinationSlug: "nyungwe-forest",
      highlights: [
        "40km multi-day hike through ancient rainforest",
        "Overnight at a forest camp deep in Nyungwe",
        "Spot 13 species of primate including colobus and chimpanzee",
        "Birdwatching for over 300 bird species",
        "Canopy walkway experience on the final day",
      ],
      itinerary: [
        {
          day: 1,
          title: "Igishigishigi trail to forest camp",
          detail: "Start from the Uwinka reception and begin hiking the Igishigishigi trail through dense montane forest. Your guide will identify plants, birds, and monkeys along the way. After 5-6 hours of hiking, arrive at the forest camp for a simple overnight stay under the canopy. Evening guided night walk to spot bushbabies and chameleons.",
        },
        {
          day: 2,
          title: "Cross-park traverse to guesthouse",
          detail: "After breakfast, continue the traverse across the park on the Imbaraga trail. The terrain is challenging but rewarding with spectacular views over the forest canopy. Picnic lunch at a waterfall. Arrive at a community guesthouse on the park edge in the late afternoon. Evening cultural performance and local dinner.",
        },
        {
          day: 3,
          title: "Canopy walkway and departure",
          detail: "Morning transfer back to the park headquarters. Walk the canopy walkway suspended 50 meters above the forest floor for breathtaking views. After lunch, transfer back to Kigali with a stop at the Butare National Museum en route.",
        },
      ],
      included: [
        "Expert hiking guide and park ranger",
        "2 nights accommodation (forest camp + guesthouse)",
        "All meals and drinking water during the hike",
        "Canopy walkway entrance fee",
        "Camping equipment (sleeping bag, mat, tent)",
        "Round-trip transport from Kigali",
        "Butare National Museum entrance",
      ],
      imageUrl: "/images/nyungwe-bird.webp",
      featured: true,
    },
    {
      slug: "volcanoes-summit-challenge",
      title: "Mount Bisoke Summit Challenge",
      category: "Adventure",
      summary:
        "Conquer Mount Bisoke (3,711m) with its stunning crater lake — the ultimate volcano hike in Rwanda.",
      description:
        "Mount Bisoke is one of the most accessible of the Virunga volcanoes to summit, yet it offers a genuinely challenging and rewarding hiking experience. The ascent takes you through four distinct vegetation zones — from bamboo forest to Hagenia woodland, through giant lobelias, and finally to the afro-alpine zone at the summit. At the top, you are rewarded with the breathtaking sight of Bisoke's crater lake, one of the highest elevation lakes in Africa. On clear days, the panoramic views across the Virunga range and into the Democratic Republic of Congo and Uganda are simply unforgettable.",
      durationDays: 1,
      groupSize: "2-10 people",
      difficulty: "Challenging",
      priceUsd: 400,
      destinationSlug: "volcanoes-national-park",
      highlights: [
        "Summit one of the Virunga Volcanoes at 3,711 meters",
        "Spectacular crater lake at the summit",
        "Four distinct vegetation zones on the ascent",
        "Panoramic views across Rwanda, DRC and Uganda",
        "Expert mountain guide with safety equipment",
      ],
      itinerary: [
        {
          day: 1,
          title: "Mount Bisoke summit hike",
          detail: "An early 6 AM start from the park headquarters. The hike takes 6-7 hours round trip. Begin through bamboo forest, then Hagenia woodland, and finally the alpine zone. At the summit, enjoy the stunning crater lake and photo opportunities. Descend by early afternoon. A well-earned lunch and certificate presentation at the base. Transfer back to Musanze or Kigali.",
        },
      ],
      included: [
        "Mountain guide and park ranger",
        "Hiking permit and park entrance fee",
        "Summit certificate",
        "Packed lunch and water",
        "Hiking poles (available on request)",
        "Round-trip transport from Musanze",
      ],
      imageUrl: "/images/rwanda-landscape.webp",
      featured: false,
    },
    {
      slug: "lake-kivu-island-hopping",
      title: "Lake Kivu Island Hopping",
      category: "Relaxation",
      summary:
        "Explore the islands of Lake Kivu by traditional dhow — from fruit bat colonies to coffee plantations.",
      description:
        "Lake Kivu's many islands offer unique experiences that most visitors miss. This 2-day island-hopping adventure takes you by traditional wooden dhow to explore the hidden gems of the lake. Visit Napoleon Island to see one of the largest fruit bat colonies in Africa, explore the coffee-growing island of Iwawa, swim at secluded sandy beaches, and enjoy freshly caught fish prepared by local families on the lakeshore. Overnight on the peaceful shores of the lake in a community-run eco-lodge.",
      durationDays: 2,
      groupSize: "2-8 people",
      difficulty: "Easy",
      priceUsd: 450,
      destinationSlug: "lake-kivu",
      highlights: [
        "Traditional dhow sailing on Lake Kivu",
        "Napoleon Island fruit bat colony at sunset",
        "Swimming and beach relaxation on secluded islands",
        "Coffee farm visit on Iwawa Island",
        "Fresh lake fish dinner prepared by local families",
      ],
      itinerary: [
        {
          day: 1,
          title: "Dhow sailing and island exploration",
          detail: "Depart Kibuye in the morning aboard a traditional wooden dhow. Sail to Napoleon Island for a guided walk to see the massive fruit bat colony. Continue to a secluded beach island for swimming and a picnic lunch. Late afternoon sail to your eco-lodge on the shores of the lake. Evening cooking demonstration featuring Lake Kivu tilapia.",
        },
        {
          day: 2,
          title: "Coffee island and return",
          detail: "After breakfast, sail to Iwawa Island for a guided tour of a community coffee plantation. Learn about the entire process from cherry to cup and enjoy a fresh coffee tasting. Return to Kibuye by midday with a final sail across the lake's clear waters. Transfer back to Kigali after lunch.",
        },
      ],
      included: [
        "Traditional dhow sailing with experienced captain",
        "1 night eco-lodge on the lakeshore",
        "All meals including fresh fish dinner",
        "Coffee plantation tour and tasting",
        "Island entrance fees and guide",
        "Swimming stops and beach time",
      ],
      imageUrl: "/images/lake-kivu-sunset.webp",
      featured: false,
    },
    {
      slug: "akagera-family-safari",
      title: "Akagera Family Safari Adventure",
      category: "Safari",
      summary:
        "A family-friendly safari designed for young explorers — game drives, boat rides and bush camping.",
      description:
        "Akagera is the perfect place for a family safari adventure. This 2-day trip is specially designed for families with children, featuring shorter game drives, interactive activities, and plenty of time for fun. Kids will love the boat safari where hippos surface right next to the boat, and the night drive where they can spot bushbabies with a spotlight. The family-friendly lodge has a pool and playground, and our guides are experienced at engaging young wildlife enthusiasts. Educational materials and activity booklets are provided to make the safari both fun and informative.",
      durationDays: 2,
      groupSize: "Family (2-6 people)",
      difficulty: "Easy",
      priceUsd: 1100,
      destinationSlug: "akagera-national-park",
      highlights: [
        "Family-friendly game drives with shorter durations",
        "Boat safari with guaranteed hippo sightings",
        "Night drive with spotlight for nocturnal animals",
        "Children's activity booklets and wildlife education",
        "Lodge with swimming pool and playground",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kigali to Akagera — afternoon safari",
          detail: "Depart Kigali after breakfast and drive to Akagera. Settle into your family-friendly lodge and enjoy lunch by the pool. Afternoon game drive designed for young attention spans — shorter loops with guaranteed sightings of zebra, giraffe, and antelope. Return for dinner and a night drive after sunset.",
        },
        {
          day: 2,
          title: "Morning boat safari and departure",
          detail: "After breakfast, enjoy a boat safari on Lake Ihema where children can see hippos, crocodiles, and enormous waterbirds up close. Return to the lodge for swimming before lunch. Depart for Kigali in the early afternoon, arriving by 5 PM.",
        },
      ],
      included: [
        "Private family-friendly safari vehicle",
        "1 night family accommodation at the lodge",
        "Children's activity booklets and guide",
        "Boat safari on Lake Ihema",
        "Night game drive",
        "All meals and drinks at the lodge",
        "Round-trip transport from Kigali",
      ],
      imageUrl: "/images/rwanda-countryside.webp",
      featured: false,
    },
    {
      slug: "kings-palace-nyanza",
      title: "King's Palace & Rwandan Kingdom Tour",
      category: "Culture",
      summary:
        "Step back in time at the King's Palace Museum in Nyanza and discover the ancient Rwandan monarchy.",
      description:
        "Before colonialism, Rwanda was a centralized kingdom ruled by a king (Mwami) for over 500 years. This half-day tour takes you to Nyanza, the historic capital of the Rwandan kingdom, where you will visit the King's Palace Museum — a reconstruction of the traditional royal residence with its distinctive thatched palace and the modern palace built in 1932. The site showcases royal regalia, traditional Intore dancers, and the famous long-horned Inyambo cattle that were bred for their majestic horns and ceremonial importance. The tour also includes a visit to the Rukari Museum and the nearby National Museum of Rwanda.",
      durationDays: 1,
      groupSize: "2-10 people",
      difficulty: "Easy",
      priceUsd: 90,
      destinationSlug: "kigali",
      highlights: [
        "Guided tour of the King's Palace Museum in Nyanza",
        "See the famous long-horned Inyambo royal cattle",
        "Traditional Intore dance performance at the palace",
        "Visit both the ancient thatched palace and 1930s colonial palace",
        "Learn about the 500-year history of the Rwandan monarchy",
      ],
      itinerary: [
        {
          day: 1,
          title: "Kigali to Nyanza King's Palace",
          detail: "Depart Kigali after breakfast and drive 90 minutes south to Nyanza. Begin with a guided tour of the King's Palace Museum, exploring both the traditional thatched palace and the modern Belgian-built palace. Watch the Inyambo cattle presentation and learn about their ceremonial role. Enjoy a traditional Intore dance performance. After lunch at a local restaurant, visit the Rukari Museum before returning to Kigali by mid-afternoon.",
        },
      ],
      included: [
        "Private transport from and to Kigali",
        "King's Palace Museum entrance fee",
        "Professional English-speaking guide",
        "Intore dance performance",
        "Inyambo cattle presentation",
        "Lunch at a local restaurant in Nyanza",
      ],
      imageUrl: "/images/rwanda-market.webp",
      featured: false,
    },
    {
      slug: "genocide-memorial-education",
      title: "Kigali Genocide Memorial & Reconciliation Tour",
      category: "Culture",
      summary:
        "A profoundly moving educational visit to the Kigali Genocide Memorial, honoring the victims and learning about Rwanda's journey of healing.",
      description:
        "The Kigali Genocide Memorial is a place of remembrance and learning dedicated to the 1994 genocide against the Tutsi. Over 250,000 victims are laid to rest here in mass graves. The memorial's three permanent exhibitions document the genocide, its history, and its aftermath, while also exploring themes of reconciliation and hope. This half-day tour provides historical context on Rwanda's pre-colonial social structures, the impact of Belgian colonialism, the events of 1994, and the remarkable story of Rwanda's recovery. In addition to the main memorial, the tour includes the Camp Kigali Memorial and a visit to a local reconciliation initiative where survivors and perpetrators now live side by side.",
      durationDays: 1,
      groupSize: "1-12 people",
      difficulty: "Easy",
      priceUsd: 70,
      destinationSlug: "kigali",
      highlights: [
        "Guided tour of the Kigali Genocide Memorial with detailed exhibitions",
        "Visit the mass graves and the Garden of Reflection",
        "Camp Kigali Memorial — site of the first attacks on UN soldiers",
        "Meeting with a local reconciliation community initiative",
        "Understanding Rwanda's remarkable post-genocide recovery",
      ],
      itinerary: [
        {
          day: 1,
          title: "Genocide memorial tour and reconciliation visit",
          detail: "Your guide picks you up at 9 AM. Begin at the Kigali Genocide Memorial for a 2-hour guided tour of the exhibitions, mass graves, and memorial gardens. Continue to Camp Kigali Memorial where 10 Belgian UN peacekeepers were killed at the start of the genocide. After lunch, visit a local reconciliation project in the hills outside Kigali where perpetrators and survivors live together in community-run housing and cooperatives. Return to your hotel by 4 PM with time for reflection.",
        },
      ],
      included: [
        "Professional English-speaking guide",
        "Hotel pickup and drop-off in Kigali",
        "Kigali Genocide Memorial entrance and guided tour",
        "Camp Kigali Memorial entrance",
        "Reconciliation community visit",
        "Lunch at a local restaurant",
      ],
      imageUrl: "/images/volcanoes-national-park.webp",
      featured: false,
    },
  ])

  console.log("Seed complete!")
  process.exit(0)
}

seed().catch((error) => {
  console.error("Seed failed:", error)
  process.exit(1)
})
