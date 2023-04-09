import { TableData } from "../components/anime-stats-lists/anime-stats-lists.component";
import { MAIN_ANIME_STATUSES } from "../constants/generalConsts";

export enum ANIME_TYPE {
  MANGA = 'manga',
  ANIME = 'anime'
}

export interface AnimeHistory {
  created_at: Date,
  description: string,
  id: number,
  target: AnimeHistoryTarget
}

interface AnimeHistoryTarget {
  aired_on: string,
  chapters: number,
  id: number,
  image: Image,
  kind: ANIME_TYPE,
  name: string,
  released_on: string,
  russian: string,
  score: string,
  status: string,
  url: string;
  volumes: number;
}

export interface Tooltip {
  headerName: string;
  pointName: string;
}

export interface AnimeData {
  anime?: Anime;
  chapters?: number;
  created_at?: Date;
  episodes?: number;
  id?: number;
  manga?: any; //TODO: Check cases
  rewatches?: number;
  score?: number;
  status?: string;
  text?: string;
  text_html?: string;
  updated_at?: Date;
  user?: User;
  volumes?: number;
}

interface Anime {
  aired_on?: Date;
  episodes?: number;
  episodes_aired?: number;
  id?: number;
  image?: Image;
  kind?: string;
  name?: string;
  released_on?: string;
  russian?: string;
  score?: string;
  status?: string;
  url?: string;
}

interface Image {
  original?: string;
  preview?: string;
  x48?: string;
  x96?: string;
}

interface UserImage extends Image {
  x16?: string;
  x32?: string;
  x64?: string;
  x80?: string;
  x148?: string;
  x160?: string;
}

interface User {
  avatar?: string;
  id?: number;
  image?: UserImage;
  last_online_at?: Date;
  nickname?: string;
  url?: string;
}

export interface PieChartDTO {
  tooltip: PieChartTooltip;
  chartTitle: string;
  chartDivId: string;
  valuePath: string[];
  dataNamesPath: string[];
}

interface PieChartTooltip {
  header: string;
  point: string;
}

export interface AnimeMangaStatistics {
  totalAmount?: number;
  mediumScore?: string;
  scoreChart?: number[];
}

export interface DataSourceTransfer {
  key: MAIN_ANIME_STATUSES, 
  data: TableData[], 
  summary: {
    episodes: number
  }
}