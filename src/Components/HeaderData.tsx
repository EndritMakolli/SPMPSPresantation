import PersonIcon from "@mui/icons-material/Person";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar"; //Profili main
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined"; //Semestri
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined"; //Provimet
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined"; //Provimet e paraqitura
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined"; //Paraqit provime
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined"; //Noto
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined"; //historiku
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined"; //academic
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"; //transkripta
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined"; //autobuset
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined"; //dashboard
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined"; //posts
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined"; //reports
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"; //settings

export interface HeaderItem {
  roles: string[];
  title: string;
  linkTo: string;
  icon?: any;
  subItems?: HeaderItem[];
}

export const data: HeaderItem[] = [
  {
    roles: ["ADMIN"],
    title: "Menaxho sistemin",
    linkTo: "/manage",
    icon: <DashboardOutlinedIcon />,
  },
  {
    roles: ["ALL"],
    title: "Profili im",
    linkTo: "/profile/personal",
    icon: <PersonIcon />,
    subItems: [
      {
        roles: ["ALL"],
        title: "Profili personal",
        linkTo: "/profile/personal",
        icon: <PermContactCalendarIcon />,
      },
      {
        roles: ["STUDENT"],
        title: "Profili studentor",
        linkTo: "profile/student",
        icon: <SchoolOutlinedIcon />,
      },
      {
        roles: ["ACADEMIC"],
        title: "Profili akademik",
        linkTo: "profile/academic",
        icon: <SchoolOutlinedIcon />,
      },
      {
        roles: ["STUDENT"],
        title: "Transkripta",
        linkTo: "profile/transcript",
        icon: <ListAltOutlinedIcon />,
      },
      {
        roles: ["ALL"],
        title: "Orari i autobusëve",
        linkTo: "profile/buses",
        icon: <DirectionsBusOutlinedIcon />,
      },
    ],
  },
  {
    roles: ["ALL"],
    title: "Semestri",
    linkTo: "/semester",
    icon: <CalendarTodayOutlinedIcon />,
  },
  {
    roles: ["STUDENT", "ACADEMIC"],
    title: "Provimet",
    linkTo: "/exams",
    icon: <InsertDriveFileOutlinedIcon />,
    subItems: [
      {
        roles: ["STUDENT"],
        title: "Provimet e paraqitura",
        linkTo: "/exams/studentexams",
        icon: <ArticleOutlinedIcon />,
      },
      {
        roles: ["STUDENT"],
        title: "Paraqit provime",
        linkTo: "/exams/registerexams",
        icon: <UploadFileOutlinedIcon />,
      },
      {
        roles: ["STUDENT"],
        title: "Historiku i provimeve",
        linkTo: "/exams/history",
        icon: <HistoryEduOutlinedIcon />,
      },
      {
        roles: ["ACADEMIC"],
        title: "Noto provime",
        linkTo: "/exams/examgrading",
        icon: <DriveFileRenameOutlineOutlinedIcon />,
      },
    ],
  },
  {
    roles: ["ALL"],
    title: "Postimet",
    linkTo: "/posts",
    icon: <MarkAsUnreadOutlinedIcon />,
  },
  {
    roles: ["LECTURER", "ADMIN"],
    title: "Raporte",
    linkTo: "/reports",
    icon: <AssessmentOutlinedIcon />,
  },
  {
    roles: ["ALL"],
    title: "Settings",
    linkTo: "/settings",
    icon: <SettingsOutlinedIcon />,
  },
];
