import PersonIcon from "@mui/icons-material/Person";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

interface HeaderItem {
  role: string;
  title: string;
  linkTo: string;
  icon?: any;
  subItems?: HeaderItem[];
}

export const data: HeaderItem[] = [
  {
    role: "ALL",
    title: "Profili im",
    linkTo: "/profile/personal",
    icon: <PersonIcon />,
    subItems: [
      {
        role: "ALL",
        title: "Profili personal",
        linkTo: "/profile/personal",
        icon: <PermContactCalendarIcon />,
      },
      {
        role: "STUDENT",
        title: "Profili studentor",
        linkTo: "profile/student",
        icon: <PersonIcon />,
      },
      {
        role: "ACADEMIC",
        title: "Profili akademik",
        linkTo: "profile/academic",
        icon: <PersonIcon />,
      },
      {
        role: "STUDENT",
        title: "Transkripta",
        linkTo: "profile/transcript",
        icon: <PersonIcon />,
      },
      {
        role: "ALL",
        title: "Orari i autobusëve",
        linkTo: "profile/buses",
        icon: <PersonIcon />,
      },
    ],
  },
];
