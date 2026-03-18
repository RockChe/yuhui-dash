export const SEED_TASKS = [
  { id:"T01",project:"虎姑婆和他的朋友",task:"MOMO上架",status:"已完成",category:"商務合作",start:"2025/11/24",duration:158,end:"2026/4/30",notes:"",owner:"林佳穎",priority:"高",sort_order:1 },
  { id:"T02",project:"虎姑婆和他的朋友",task:"MOMO紙箱、DM",status:"待辦",category:"商務合作",start:"2026/4/30",duration:63,end:"2026/7/1",notes:"2026/4月開始",owner:"陳柏翰",priority:"中",sort_order:2 },
  { id:"T03",project:"虎姑婆和他的朋友",task:"MO select 濕紙巾、衛生紙",status:"已完成",category:"商務合作",start:"2025/11/10",duration:94,end:"2026/2/11",notes:"視覺設計4稿",owner:"林佳穎",priority:"高",sort_order:3 },
  { id:"T04",project:"虎姑婆和他的朋友",task:"高雄兒藝節",status:"進行中",category:"活動",start:"2026/4/3",duration:4,end:"2026/4/6",notes:"舞台活動、畫畫、市集",owner:"王思涵",priority:"高",sort_order:4 },
  { id:"T05",project:"虎姑婆和他的朋友",task:"虎姑婆舞台表演2場（3/4確認）",status:"進行中",category:"活動",start:"2026/4/6",duration:1,end:"2026/4/6",notes:"暫定4/5 or 4/6",owner:"王思涵",priority:"高",sort_order:5 },
  { id:"T06",project:"虎姑婆和他的朋友",task:"新北兒藝節",status:"提案中",category:"活動",start:"2026/7/1",duration:31,end:"2026/7/31",notes:"新北藝文中心展覽+見面會回饋",owner:"張育瑄",priority:"中",sort_order:6 },
  { id:"T07",project:"虎姑婆和他的朋友",task:"9月前要播出",status:"待辦",category:"播出/開始",start:"2026/9/1",duration:61,end:"2026/10/31",notes:"台語結案需要9月播出",owner:"李宗霖",priority:"高",sort_order:7 },
  { id:"T08",project:"虎姑婆和他的朋友",task:"TTXC 展覽",status:"待辦",category:"活動",start:"2026/9/26",duration:138,end:"2027/2/10",notes:"",owner:"張育瑄",priority:"中",sort_order:8 },
  { id:"T09",project:"眼鏡熊波波",task:"預計暑假播出",status:"待辦",category:"播出/開始",start:"2026/7/1",duration:62,end:"2026/8/31",notes:"",owner:"李宗霖",priority:"高",sort_order:9 },
  { id:"T10",project:"眼鏡熊波波",task:"2026聖誕節提案",status:"待辦",category:"行銷",start:"2026/4/1",duration:91,end:"2026/6/30",notes:"林口Outlet &amp;青埔Outlet 提案",owner:"陳柏翰",priority:"中",sort_order:10 },
  { id:"T11",project:"眼鏡熊波波",task:"2027展覽規劃",status:"待辦",category:"活動",start:null,duration:null,end:null,notes:"2027暑假展覽提案",owner:"吳欣妤",priority:"低",sort_order:11 },
  { id:"T12",project:"Mogu &amp; Perol",task:"3/12 記者會 – 項目啟動",status:"進行中",category:"行銷",start:"2026/3/12",duration:1,end:"2026/3/12",notes:"",owner:"林佳穎",priority:"高",sort_order:12 },
  { id:"T13",project:"今天誰代課",task:"MIFA 安錫動畫影展",status:"進行中",category:"發行",start:"2026/6/23",duration:4,end:"2026/6/26",notes:"",owner:"吳欣妤",priority:"高",sort_order:13 },
  { id:"T14",project:"登山總動員S2",task:"活動規劃",status:"待辦",category:"活動",start:"2026/4/6",duration:86,end:"2026/6/30",notes:"場地場勘、活動廠商討論",owner:"王思涵",priority:"中",sort_order:14 },
  { id:"T15",project:"登山總動員S2",task:"預計2026年底播出",status:"待辦",category:"活動",start:"2026/12/1",duration:151,end:"2027/4/30",notes:"2026/8月完成全部拍攝、10月底完成後製",owner:"李宗霖",priority:"中",sort_order:15 },
  { id:"T16",project:"科教館公益展廳",task:"進場",status:"待辦",category:"活動",start:"2027/1/3",duration:12,end:"2027/1/14",notes:"",owner:"陳柏翰",priority:"中",sort_order:16 },
  { id:"T17",project:"科教館公益展廳",task:"開展",status:"待辦",category:"活動",start:"2027/1/15",duration:352,end:"2028/1/1",notes:"",owner:"張育瑄",priority:"中",sort_order:17 },
  { id:"T18",project:"科教館公益展廳",task:"撤場",status:"待辦",category:"活動",start:"2028/1/2",duration:14,end:"2028/1/15",notes:"",owner:"陳柏翰",priority:"低",sort_order:18 },
  { id:"T19",project:"科教館公益展廳",task:"交還場地",status:"待辦",category:"活動",start:"2028/1/15",duration:1,end:"2028/1/15",notes:"",owner:"陳柏翰",priority:"低",sort_order:19 },
  { id:"T20",project:"2026市場展",task:"Kidscreen Summit 2026",status:"已完成",category:"市場展",start:"2026/2/14",duration:4,end:"2026/2/17",notes:"",owner:"吳欣妤",priority:"高",sort_order:20 },
  { id:"T21",project:"2026市場展",task:"MIPCOM 坎城影視節",status:"待辦",category:"市場展",start:"2026/10/10",duration:6,end:"2026/10/15",notes:"mipjunior 10/10, 11",owner:"林佳穎",priority:"中",sort_order:21 },
];

export const SEED_SUBTASKS = [
  {id:"S01",task_id:"T01",name:"合約簽訂",owner:"林佳穎",done:true,done_date:"2025/12/05",notes:"",sort_order:1},{id:"S02",task_id:"T01",name:"商品資料建檔",owner:"陳柏翰",done:true,done_date:"2025/12/20",notes:"",sort_order:2},{id:"S03",task_id:"T01",name:"上架頁面設計",owner:"林佳穎",done:true,done_date:"2026/01/15",notes:"",sort_order:3},{id:"S04",task_id:"T01",name:"正式上架",owner:"林佳穎",done:true,done_date:"2026/02/01",notes:"",sort_order:4},
  {id:"S05",task_id:"T02",name:"紙箱設計定稿",owner:"陳柏翰",done:true,done_date:"2026/03/15",notes:"",sort_order:1},{id:"S06",task_id:"T02",name:"DM 內容撰寫",owner:"林佳穎",done:false,done_date:null,notes:"",sort_order:2},{id:"S07",task_id:"T02",name:"印刷送廠",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:3},{id:"S08",task_id:"T02",name:"寄送到通路",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:4},
  {id:"S09",task_id:"T03",name:"合作洽談",owner:"林佳穎",done:true,done_date:"2025/11/15",notes:"",sort_order:1},{id:"S10",task_id:"T03",name:"視覺設計（4稿）",owner:"張育瑄",done:true,done_date:"2025/12/20",notes:"",sort_order:2},{id:"S11",task_id:"T03",name:"打樣確認",owner:"林佳穎",done:true,done_date:"2026/01/10",notes:"",sort_order:3},{id:"S12",task_id:"T03",name:"量產出貨",owner:"陳柏翰",done:true,done_date:"2026/02/01",notes:"",sort_order:4},
  {id:"S13",task_id:"T04",name:"場地確認與合約簽訂",owner:"王思涵",done:true,done_date:"2026/03/20",notes:"",sort_order:1},{id:"S14",task_id:"T04",name:"舞台企劃+佈置",owner:"張育瑄",done:true,done_date:"2026/03/28",notes:"",sort_order:2},{id:"S15",task_id:"T04",name:"市集招商+當日執行",owner:"王思涵",done:false,done_date:null,notes:"",sort_order:3},
  {id:"S16",task_id:"T05",name:"場地與檔期確認",owner:"王思涵",done:true,done_date:"2026/03/04",notes:"",sort_order:1},{id:"S17",task_id:"T05",name:"演出內容排練",owner:"王思涵",done:false,done_date:null,notes:"",sort_order:2},{id:"S18",task_id:"T05",name:"現場執行",owner:"王思涵",done:false,done_date:null,notes:"",sort_order:3},
  {id:"S19",task_id:"T06",name:"提案企劃書",owner:"張育瑄",done:true,done_date:"2026/03/10",notes:"",sort_order:1},{id:"S20",task_id:"T06",name:"場地勘查",owner:"張育瑄",done:false,done_date:null,notes:"",sort_order:2},{id:"S21",task_id:"T06",name:"提案簡報",owner:"張育瑄",done:false,done_date:null,notes:"",sort_order:3},{id:"S22",task_id:"T06",name:"展覽設計規劃",owner:"張育瑄",done:false,done_date:null,notes:"",sort_order:4},
  {id:"S23",task_id:"T07",name:"台語配音",owner:"李宗霖",done:false,done_date:null,notes:"",sort_order:1},{id:"S24",task_id:"T07",name:"後製剪輯",owner:"李宗霖",done:false,done_date:null,notes:"",sort_order:2},{id:"S25",task_id:"T07",name:"審片送播",owner:"李宗霖",done:false,done_date:null,notes:"",sort_order:3},
  {id:"S26",task_id:"T08",name:"展覽企劃",owner:"張育瑄",done:false,done_date:null,notes:"",sort_order:1},{id:"S27",task_id:"T08",name:"展品製作",owner:"張育瑄",done:false,done_date:null,notes:"",sort_order:2},{id:"S28",task_id:"T08",name:"佈展施工",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:3},{id:"S29",task_id:"T08",name:"開展營運",owner:"張育瑄",done:false,done_date:null,notes:"",sort_order:4},
  {id:"S30",task_id:"T09",name:"後製完成",owner:"李宗霖",done:false,done_date:null,notes:"",sort_order:1},{id:"S31",task_id:"T09",name:"配樂混音",owner:"李宗霖",done:false,done_date:null,notes:"",sort_order:2},{id:"S32",task_id:"T09",name:"上架排播",owner:"李宗霖",done:false,done_date:null,notes:"",sort_order:3},
  {id:"S33",task_id:"T10",name:"Outlet場勘",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:1},{id:"S34",task_id:"T10",name:"提案企劃書",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:2},{id:"S35",task_id:"T10",name:"預算報價",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:3},{id:"S36",task_id:"T10",name:"客戶簡報",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:4},
  {id:"S37",task_id:"T11",name:"場地調查",owner:"吳欣妤",done:false,done_date:null,notes:"",sort_order:1},{id:"S38",task_id:"T11",name:"初步企劃",owner:"吳欣妤",done:false,done_date:null,notes:"",sort_order:2},
  {id:"S39",task_id:"T12",name:"場地租借",owner:"林佳穎",done:true,done_date:"2026/02/20",notes:"",sort_order:1},{id:"S40",task_id:"T12",name:"媒體邀請名單",owner:"林佳穎",done:true,done_date:"2026/03/01",notes:"",sort_order:2},{id:"S41",task_id:"T12",name:"新聞稿撰寫",owner:"林佳穎",done:true,done_date:"2026/03/08",notes:"",sort_order:3},{id:"S42",task_id:"T12",name:"當日執行",owner:"林佳穎",done:false,done_date:null,notes:"",sort_order:4},
  {id:"S43",task_id:"T13",name:"報名素材準備",owner:"吳欣妤",done:true,done_date:"2026/03/15",notes:"",sort_order:1},{id:"S44",task_id:"T13",name:"字幕翻譯",owner:"吳欣妤",done:false,done_date:null,notes:"",sort_order:2},{id:"S45",task_id:"T13",name:"參展人員安排",owner:"林佳穎",done:false,done_date:null,notes:"",sort_order:3},{id:"S46",task_id:"T13",name:"展後報告",owner:"吳欣妤",done:false,done_date:null,notes:"",sort_order:4},
  {id:"S47",task_id:"T14",name:"場地場勘",owner:"王思涵",done:false,done_date:null,notes:"",sort_order:1},{id:"S48",task_id:"T14",name:"活動廠商比價",owner:"王思涵",done:false,done_date:null,notes:"",sort_order:2},{id:"S49",task_id:"T14",name:"活動企劃定案",owner:"王思涵",done:false,done_date:null,notes:"",sort_order:3},
  {id:"S50",task_id:"T15",name:"全部拍攝完成",owner:"李宗霖",done:false,done_date:null,notes:"",sort_order:1},{id:"S51",task_id:"T15",name:"後製剪輯",owner:"李宗霖",done:false,done_date:null,notes:"",sort_order:2},{id:"S52",task_id:"T15",name:"審片上架",owner:"李宗霖",done:false,done_date:null,notes:"",sort_order:3},
  {id:"S53",task_id:"T16",name:"施工圖確認",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:1},{id:"S54",task_id:"T16",name:"物料進場",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:2},{id:"S55",task_id:"T16",name:"佈展施工",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:3},
  {id:"S56",task_id:"T17",name:"開幕活動",owner:"張育瑄",done:false,done_date:null,notes:"",sort_order:1},{id:"S57",task_id:"T17",name:"展場營運",owner:"張育瑄",done:false,done_date:null,notes:"",sort_order:2},{id:"S58",task_id:"T17",name:"定期維護",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:3},
  {id:"S59",task_id:"T18",name:"展品打包",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:1},{id:"S60",task_id:"T18",name:"場地復原",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:2},
  {id:"S61",task_id:"T19",name:"場地點交",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:1},{id:"S62",task_id:"T19",name:"結案報告",owner:"陳柏翰",done:false,done_date:null,notes:"",sort_order:2},
  {id:"S63",task_id:"T20",name:"展位設計+物料",owner:"吳欣妤",done:true,done_date:"2026/02/10",notes:"",sort_order:1},{id:"S64",task_id:"T20",name:"人員行程安排",owner:"林佳穎",done:true,done_date:"2026/02/12",notes:"",sort_order:2},{id:"S65",task_id:"T20",name:"展後報告",owner:"吳欣妤",done:true,done_date:"2026/02/24",notes:"",sort_order:3},
  {id:"S66",task_id:"T21",name:"參展報名",owner:"林佳穎",done:false,done_date:null,notes:"",sort_order:1},{id:"S67",task_id:"T21",name:"行銷素材準備",owner:"林佳穎",done:false,done_date:null,notes:"",sort_order:2},{id:"S68",task_id:"T21",name:"機票住宿安排",owner:"吳欣妤",done:false,done_date:null,notes:"",sort_order:3},
];

export function fetchData() { return { tasks: SEED_TASKS, subtasks: SEED_SUBTASKS }; }

export const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZyzI38cpjiyKLCFobDqzxdDsY7cDdvD_vXnQQLo172KLGuJfXnJpKs5PiA1fJCZaVWYrGZVoyiUbD/pub?gid=2004846744&single=true&output=csv";

export async function fetchGoogleSheet() {
  const { parseGoogleSheetCSV } = await import("@/lib/utils");
  const res = await fetch(GOOGLE_SHEET_CSV_URL);
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`);
  const text = await res.text();
  return parseGoogleSheetCSV(text);
}
