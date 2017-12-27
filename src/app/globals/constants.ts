import { Genre } from "./genre";
import { Station } from "./station";

const stations = {
    'pop':[
      new Station('181-power','Power 181 (Top 40)',8128),
      new Station('181-oldschool','Old School HipHop/RnB',8068),
      new Station('181-uktop40','UK Top 40',8070),
      new Station('181-vibe','The Vibe of Vegas',8074)
    ],
    'rock':[
      new Station('181-buzz','The Buzz (Alt. Rock)',8126),
      new Station('181-rock','Rock 181',8008),
      new Station('181-chloe','Chloe @181.FM',8100)
    ],
    'country':[
      new Station('181-kickincountry','Kickin\' Country',8130),
      new Station('181-realcountry','Real Country',8034),
      new Station('181-highway','Highway 181',8018),
    ],
    'urban':[
      new Station('181-beat','The Beat (HipHop/R&B)',8054),
      new Station('181-oldschool','Old School HipHop/RnB',8068),
      new Station('181-rnb','True R&B',8022),
      new Station('181-thebox','The Box(Urban)',8024)
    ],
    'christmas':[
      new Station('181-xkkountry','Christmas Kountry',8084),
      new Station('181-xtraditional','Christmas Classics',8124),
      new Station('181-xcountry','Christmas Country',8110),
      new Station('181-xhighway','Christmas Highway',8024)
    ],
    'easy_listening':[
      new Station('181-breeze','The Breeze',8004),
      new Station('181-classicalguitar','Classical Guitar',8020)
    ],
  
  }
  
export const genres:Genre[] = [
    // new Genre('181_oldies','Oldies'),
    // new Genre('181_80s','80\'s Decade'),
    // new Genre('181_90s','90\'s Decade'),
    new Genre('181_pop','Pop',stations.pop),
    new Genre('181_rock','Rock Channels',stations.rock),
    new Genre('181_country','Country',stations.country),
    new Genre('181_urban','Urban',stations.urban),
    // new Genre('181_halloween','Halloween'),
    // new Genre('181_dance','Dance / Techno '),
    new Genre('181_easy','Easy Listening',stations.easy_listening),
    // new Genre('181_talk','Talk'),
    new Genre('181_christmas','Christmas',stations.christmas)
]