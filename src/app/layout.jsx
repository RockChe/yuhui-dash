import './globals.css';

export const metadata = {
  title: '專案管理儀表板',
  description: '專案管理儀表板',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("dash-theme");var m={"warm":"#F5F3EF","dimmed":"#1C2128"};if(t&&m[t])document.body.style.background=m[t];}catch(e){}` }} />
        {children}
      </body>
    </html>
  );
}
